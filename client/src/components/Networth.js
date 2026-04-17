import { TotalProfit } from "./TotalProfit";
import { Profit } from "./Profit";

// Calculate total average sell value of all items
const totalValue = (userData) => {
  return (
    userData.savedItems?.reduce(
      (total, item) => total + parseFloat(item.price || 0),
      0,
    ) || 0
  );
};

const sort = (userData) => {
  const items = userData.savedItems || [];
  if (items.length === 0) return [0, 0];

  const profits = items.map((item) => Profit(item.price, item.purchasePrice));

  const maxProfit = Math.max(...profits);
  const minProfit = Math.min(...profits);

  const biggestProfit = maxProfit > 0 ? maxProfit : 0;
  const biggestLoss = minProfit < 0 ? minProfit : 0;

  return [biggestProfit, biggestLoss];
};

export default function Networth({ userData }) {
  let totalProfit = TotalProfit(userData.savedItems);

  const [biggestProfit, biggestLoss] = sort(userData);

  return (
    <>
      <br />
      <div className="mx-auto col-sm-12 col-md-8 col-lg-4">
        <h4 className="font-weight-bold"> My Item Networth</h4>
        <p>
          Biggest Profit: ${biggestProfit.toFixed(2)}
          <br />
          Biggest Loss: ${biggestLoss.toFixed(2)}
          <br />
          Total Item Value: ${totalValue(userData).toFixed(2)} <br />
          Total Purchase Price: $
          {(parseFloat(totalValue(userData)) - parseFloat(totalProfit)).toFixed(
            2,
          )}
          <br />
          Total Profit: ${totalProfit}
        </p>
      </div>
    </>
  );
}
