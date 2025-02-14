import { TotalProfit } from "./TotalProfit";
import { Profit } from "./Profit";

// Calculate total average sell value of all items
const totalValue = (userData) => {
  return userData.savedItems
    ?.reduce((total, item) => total + parseFloat(item.price || 0), 0)
    .toFixed(2);
};

const sort = (userData) => {
  if (!userData.savedItems?.length) return [0, 0];

  const profits = userData.savedItems.map((item) =>
    Profit(item.price, item.purchasePrice)
  );

  let most = Math.max(...profits);
  let loss = Math.min(...profits);

  // If there's only one item, adjust values accordingly
  if (profits.length === 1) {
    if (most > 0) loss = 0;
    if (loss < 0) most = 0;
  }

  return [most, loss];
};

export default function Networth({ userData }) {
  let totalProfit = TotalProfit(userData.savedItems);

  return (
    <>
      <br />
      <div className="mx-auto col-sm-12 col-md-8 col-lg-4">
        <h4 className="font-weight-bold"> My Item Networth</h4>
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
          Total Value: ${totalValue(userData)}{" "}
        </p>
        <hr />
        <p>Total Profit: ${totalProfit}</p>
      </div>
    </>
  );
}
