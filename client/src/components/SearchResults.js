import { useState } from "react";
import { Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { Percentage } from "./Percentage.js";
import { Profit } from "./Profit.js";

export default function SearchResults({
  searchedItems,
  searchInput,
  dateInputFormat,
  handleSaveItem,
  itemMessage,
}) {
  const { itemName, itemImages, quantity, purchasePrice, price } =
    searchedItems;

  const profit = Profit(price, purchasePrice);

  const [loading, setIsLoading] = useState(false);

  return searchedItems && itemName ? (
    <div className="row p-4">
      {/* Item Image */}
      <div className="col-md text-center">
        {itemImages && (
          <img
            src={itemImages}
            alt={itemName || "Item"}
            className="flex-md-shrink-0 resultPhoto"
          />
        )}
      </div>

      <div className="col-md">
        {/* Item Name */}
        {itemName && (
          <h4>
            {itemName}
            <hr />
          </h4>
        )}
        {/* Quantity */}
        {quantity > 0 && <h4>{quantity} items for sale</h4>}
        {/* Purchase Price */}

        <p>Purchase Price: ${(purchasePrice || 0).toFixed(2)}</p>

        {/* Average Sale Price */}

        <p>
          Average Sale Price: ${(price || 0).toFixed(2)}{" "}
          {Percentage(profit, purchasePrice)}
        </p>
        <p>Profit: ${(profit || 0).toFixed(2)} </p>

        {/* Purchase Date (if logged in) */}
        {Auth.loggedIn() && itemName && dateInputFormat && (
          <p>Purchase Date: {dateInputFormat.toLocaleDateString()}</p>
        )}
        {/* Save Button & Message */}
        {Auth.loggedIn() && itemName && (
          <>
            <div>
              <Button
                className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4 fornLengthButton"
                onClick={async () => {
                  setIsLoading(true);
                  await handleSaveItem();
                  setIsLoading(false);
                }}
                disabled={loading}
              >
                {loading ? <>Adding...</> : <>Add to collection</>}
              </Button>
              {itemMessage && <p className="errMessage">{itemMessage}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <p className="text-center">No results for {searchInput.itemName}</p>
  );
}
