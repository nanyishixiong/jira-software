import { useCallback, useState } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();

  const [retry, setRetry] = useState(() => () => {
    console.log("init");
  });

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        status: "error",
        data: null,
      }),
    []
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
      setState((prestate) => ({
        ...prestate,
        status: "loading",
      }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          // catch会消化异常，这里需要主动抛出异常，外面才能接收到
          setError(error);
          if (config.throwError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwError, mountedRef, setData, setError]
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
