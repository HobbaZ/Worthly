import { Container, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { Percentage } from "./Percentage.js";

export default function SearchResults({
  searchedItems,
  searchInput,
  dateInputFormat,
  handleSaveItem,
  itemMessage,
}) {
  if (!searchedItems || searchedItems.quantity <= 0) {
    return (
      <p className="text-center">
        We couldn't find anything for {searchInput?.itemName || "your search"}.
      </p>
    );
  }

  const { itemName, itemImages, quantity, purchasePrice, price, profit } =
    searchedItems;

  return (
    <div className="row">
      {/* Item Image */}
      <div className="col-md text-center">
        {itemImages && (
          <img
            src={itemImages}
            alt={itemName || "Item"}
            className="flex-md-shrink-0"
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
        {typeof purchasePrice === "number" && (
          <p>Purchase Price: ${purchasePrice.toFixed(2)}</p>
        )}
        {/* Average Sale Price */}
        {typeof price === "number" && (
          <>
            <p>
              Average Sale Price: ${price.toFixed(2)}{" "}
              {Percentage(profit, purchasePrice)}
            </p>
            <p>Profit: ${profit.toFixed(2)} </p>
          </>
        )}

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
  );
}
