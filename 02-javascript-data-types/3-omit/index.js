/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const newObj = {};
  const fieldSet = new Set(fields);
  const keys = Object.keys(obj);
  const filteredKeys = keys.filter(key => !fieldSet.has(key));

  filteredKeys.forEach(el => {
    newObj[el] = obj[el];
  });

  return newObj;
};
