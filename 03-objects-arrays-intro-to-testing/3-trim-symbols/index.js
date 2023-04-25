/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string.length || size === 0) {
    return '';
  }

  if (!size) {
    return string;
  }

  const arr = Array.from(string);
  const result = [];

  let current = arr[0];
  let count = 0;

  arr.forEach((char) => {
    if (char === current && count < size) {
      result.push(char);
      count = count + 1;
    }

    if (char !== current) {
      current = char;
      count = 1;
      result.push(char);
    }
  });

  return result.join('');
}
