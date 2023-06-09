/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return undefined;
  }

  const res = {};

  for (const key in obj) {
    res[obj[key]] = key;
  }

  return res;
}
