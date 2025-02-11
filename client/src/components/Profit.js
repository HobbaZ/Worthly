export const Profit = (ave, paid) => {
  let difference = (ave - paid).toFixed(2);
  return difference;
};
