import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "utils";
/**
 * 返回url页面中，指定的键的参数值，
 * 实现根据传入的数组返回对应类型的对象 ['name','age'] => {name:'aaa',age:18}
 * 用useMemo解决无限循环的问题
 * @param keys
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((prev, key) => {
        return {
          ...prev,
          [key]: searchParams.get(key) || "",
        };
      }, {} as { [key in K]: string });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]),
    (param: Partial<{ [key in K]: unknown }>) => {
      // 将可迭代对象转换成对象
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...param,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

/**
 * as const 的作用
 * const a = ['1', 2, { name: 'adsa' }]
 * 定义a变量如上，ts就会推断他的类型如下
 * type a = (string | number | { name: string; })[]
 *
 * 在后面加上as const
 * const a = ['1', 2, { name: 'adsa' }] as const
 * 类型就变成
 * type a = readonly ["1", 2, {readonly name: "adsa";}]
 */
