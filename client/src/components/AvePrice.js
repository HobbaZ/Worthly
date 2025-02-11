export const AvePrice = (results) => {
  let total = 0;
  let average = 0;

  for (let index = 0; index < results.length; index++) {
    let priceMinusPostage = results[index]?.price.value; //Don't need shipping cost as only getting initial sold amount
    total = total + parseFloat(priceMinusPostage);
  }
  average = (total / results.length).toFixed(2);
  return average;
};
