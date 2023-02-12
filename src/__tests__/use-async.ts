import { act, renderHook } from "@testing-library/react";
import { useAsync } from "utils/use-async";

const defaultState: ReturnType<typeof useAsync> = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const LoadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(LoadingState);

  const resolveValue = { mockValue: "resolved" };
  await act(async () => {
    resolve(resolveValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolveValue,
  });
});
