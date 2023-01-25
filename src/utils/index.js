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
