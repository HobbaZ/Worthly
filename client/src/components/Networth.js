import { Container } from "react-bootstrap";

//Calculate total average value of all items
const totalValue = (userData) => {
  let total = 0;

  for (let index = 0; index < userData.savedItems?.length; index++) {
    let calcPrice = userData.savedItems[index].price;
    total = total + parseFloat(calcPrice);
  }

  return total.toFixed(2);
};

//Calculate networth by adding all profits from the individual items listed
const netWorth = (userData) => {
  let total = 0;
  const netWorthArray = [];

  for (let index = 0; index < userData.savedItems?.length; index++) {
    let calcProfit = userData.savedItems[index].profit;
    total = total + parseFloat(calcProfit);
    netWorthArray.push(total.toFixed(2));
  }

  return total.toFixed(2);
};

//Find highest and lowest profits in array
const sort = (userData) => {
  const sortArray = [];

  let loss = 0;
  let most = 0;

  for (let index = 0; index < userData.savedItems?.length; index++) {
    let calcProfit = userData.savedItems[index].profit;
    sortArray.push(calcProfit);
    sortArray.sort(function (a, b) {
      return a - b;
    });

    most = Math.max(...sortArray);

    if (Math.min(...sortArray) <= 0) {
      loss = Math.min(...sortArray);
    } else {
      loss = 0;
    }
  }
  return [most, loss];
};

export default function Networth({ userData }) {
  return (
    <Container>
      <br />
      <h4> My Item Networth</h4>
      <p>
        Total Spent: ${(totalValue(userData) - netWorth(userData)).toFixed(2)}
        <br />
        Highest profit: ${sort(userData)[0]}
        <br />
        Highest loss: ${sort(userData)[1]}
        <br />
        Total Value: ${totalValue(userData)} <br />
        <span className="font-weight-bold">
          Total Networth: ${netWorth(userData)}
        </span>
      </p>
    </Container>
  );
}
