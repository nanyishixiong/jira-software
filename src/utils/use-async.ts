import { Dispatch, useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

const useSafeDispatch = <D>(dispatch: (action: D) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (action: D) => (mountedRef.current ? dispatch(action) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch<Partial<State<D>>>(dispatch);

  const [retry, setRetry] = useState(() => () => {
    console.log("init");
  });

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        console.log("retry");
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      });
      safeDispatch({
        status: "loading",
      });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch会消化异常，这里需要主动抛出异常，外面才能接收到
          setError(error);
          if (config.throwError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    // retry 重新跑一遍run, 刷新state
    retry,
    ...state,
  };
};
