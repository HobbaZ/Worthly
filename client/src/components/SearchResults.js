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
        {quantity > 0 && <h4>{quantity} results</h4>}
        {/* Purchase Price */}

        <p>Purchase Price: ${purchasePrice.toFixed(2)}</p>

        {/* Average Sale Price */}

        <p>
          Average Sale Price: ${price} {Percentage(profit, purchasePrice)}
        </p>
        <p>Profit: ${profit} </p>

        {/* Purchase Date (if logged in) */}
        {Auth.loggedIn() && itemName && dateInputFormat && (
          <p>Purchase Date: {new Date(dateInputFormat).toLocaleDateString()}</p>
        )}
        {/* Save Button & Message */}
        {Auth.loggedIn() && itemName && (
          <>
            <div>
              <Button
                className="btn form-btn col-sm-12 col-md-8 col-lg-6 my-3"
                onClick={handleSaveItem}
              >
                Add to Collection
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
