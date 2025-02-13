import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_ITEM } from "../utils/mutations";
import SearchResults from "../components/SearchResults";
import { AvePrice } from "../components/AvePrice";
import { Percentage } from "../components/Percentage";
import AuthLogin from "../components/AuthLogin";

const apiKey = process.env.REACT_APP_API_KEY;

const SearchItemsForm = () => {
  // create state for holding returned eBay api data
  const [searchedItems, setSearcheditems] = useState({
    purchasePrice: 0,
    price: "",
    itemName: "",
    quantity: "",
    itemImages: "",
    purchaseDate: "",
  });
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState({
    itemName: "",
    userPaid: 0.01,
  });
  let [dateInput, setDateInput] = useState();

  const [validated] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const today = new Date();
  const dateInputFormat = new Date(dateInput);

  const [saveItem] = useMutation(SAVE_ITEM);

  const [searchClicked, setSearchClicked] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  //Input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
    setSearchClicked(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setSearchClicked(false); // Reset searchClicked before a new search starts

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!searchInput) return false;

    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.countdownapi.com/request?api_key=${apiKey}&type=search&ebay_domain=ebay.com.au&search_term=${searchInput.itemName}&sold_items=true&completed_items=true&sort_by=price_high_to_low`
      );

      if (!response.ok) {
        setInfoMessage("Can't connect right now, try again later");
        throw new Error("Can't connect right now, try again later:", response);
      }

      const { search_results } = await response.json();
      setIsLoading(false);

      const ave = AvePrice(search_results);
      Percentage(ave, search_results, searchInput);

      const searchData = () => ({
        itemName: search_results[0]?.title,
        quantity: search_results.length,
        itemImages: search_results[0]?.image || "",
        price: parseFloat(ave),
        purchasePrice: parseFloat(searchInput.userPaid),
        purchaseDate: dateInput,
      });

      setSearcheditems(searchData);
      setSearchClicked(true); // Set searchClicked to true after search completes
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleSaveItem = async () => {
    AuthLogin(setInfoMessage);

    try {
      await saveItem({
        variables: { ...searchedItems },
      });
      window.location.replace("/saved");

      setItemMessage("item successfully added");
    } catch (e) {
      setIsLoading(false);
      setItemMessage("Item couldn't be added to account!");
      console.error("Item couldn't be added to account!", e);
    }
  };

  return (
    <>
      <Container>
        <div className="main">
          {/*<div className="w-50 mx-auto">
            <h3>Search Tips...</h3>
            <p>
              Include specific search terms like the item's brand, colour, size
              and model number instead of more vague search terms like colour
              and type of item.
              <br />
              <br />
              To search for one word or another, put the words in parentheses
              divided by commas, e.g. [Volkswagen, VW].
              <br />
              <br />
              Put double quotes around the search to search for the exact words
              in the exact order.
            </p>
          </div>*/}

          <h1 className="text-center">Search For Items</h1>
          <Form
            validated={validated}
            onSubmit={handleFormSubmit}
            className="mx-auto col-sm-12 col-md-9 col-lg-6"
          >
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                className="inputField"
                type="text"
                placeholder="Name of item"
                name="itemName"
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.itemName || ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost of Item</Form.Label>
              <Form.Control
                className="inputField"
                type="number"
                placeholder="Cost of Item"
                name="userPaid"
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.userPaid || ""}
              ></Form.Control>
            </Form.Group>

            {searchInput.userPaid !== null && searchInput.userPaid < 0.01 ? (
              <div className="text-center errMessage">
                Cost of item can't be under $0.01
              </div>
            ) : (
              ""
            )}

            {Auth.loggedIn() ? (
              <Form.Group>
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  className="inputField"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  name="purchaseDate"
                  onChange={(e) => {
                    setDateInput(e.target.value);
                  }}
                  value={dateInput || ""}
                ></Form.Control>
              </Form.Group>
            ) : null}

            {/*Use UTC value for ease of comparison*/}
            {dateInputFormat.getTime() > today.getTime() ? (
              <div className="text-center errMessage">
                Date can't be in the future
              </div>
            ) : null}

            {infoMessage && (
              <div className="text-center errMessage">{infoMessage}</div>
            )}

            <div className="text-center">
              <Button
                className="btn form-btn col-sm-12 col-md-8 col-lg-4 my-4"
                disabled={!(searchInput.itemName && searchInput.userPaid)}
                type="submit"
              >
                {loading ? <>Loading...</> : <>Search</>}
              </Button>
            </div>
          </Form>
          {searchClicked === true ? (
            <SearchResults
              searchedItems={searchedItems}
              searchInput={searchInput}
              dateInputFormat={dateInputFormat}
              handleSaveItem={handleSaveItem}
              itemMessage={itemMessage}
            />
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default SearchItemsForm;
