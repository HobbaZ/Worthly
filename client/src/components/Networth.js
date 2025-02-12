import { TotalProfit } from "./TotalProfit";
import { Profit } from "./Profit";

// Calculate total average sell value of all items
const totalValue = (userData) => {
  return userData.savedItems
    ?.reduce((total, item) => total + parseFloat(item.price || 0), 0)
    .toFixed(2);
};

//Find highest and lowest profits in array
const sort = (userData) => {
  if (!userData.savedItems?.length) return [0, 0]; // Handle empty case

  const profits = userData.savedItems.map((item) =>
    Profit(item.price, item.purchasePrice)
  );

  const most = Math.max(...profits);
  const loss = Math.min(...profits);

  return [most, loss];
};

export default function Networth({ userData }) {
  let totalProfit = TotalProfit(userData.savedItems);

  userData.savedItems?.map((item) => {
    let total = 0;

    /* Calculate Profit */
    let profit = Profit(item.price.toFixed(2), item.purchasePrice.toFixed(2));

    total += profit;
    return total;
  });

  return (
    <>
      <br />
      <h4> My Item Networth</h4>
      <p>
        Total Paid: $
        {(parseFloat(totalValue(userData)) - parseFloat(totalProfit)).toFixed(
          2
        )}
        <br />
        Highest profit: ${sort(userData)[0]}
        <br />
        Highest loss: ${sort(userData)[1]}
        <br />
        Total Value: ${totalValue(userData)} <br />
        <span className="font-weight-bold">Total Profit: ${totalProfit}</span>
      </p>
    </>
  );
}
