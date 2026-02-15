export const add = (a, b) => {
  return { sum: a + b, a: a, b: b };
};
const sum = add(1, 3);
console.log(sum);
