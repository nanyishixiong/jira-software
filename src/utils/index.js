import { useEffect, useState } from "react";

/**
 * 判断是否为空值，0 不是空值
 * @param {*} value
 * @returns
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 删除对象中的空值，0除外
 * @param {*} object
 * @returns
 */
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    if (isFalsy(object[key])) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

const debounce = (func, delay) => {
  let timer = null;
  return function (...params) {
    let context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, params);
    }, delay);
  };
};
