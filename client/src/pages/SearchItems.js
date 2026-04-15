import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_ITEM } from "../utils/mutations";
import SearchResults from "../components/SearchResults";
import { AvePrice } from "../components/AvePrice";
import { Percentage } from "../components/Percentage";
import AuthLogin from "../components/AuthLogin";
import { DateError, getToday, PriceError } from "../components/ErrorMessages";

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
    purchasePrice: 0.01,
  });

  const selectedDate = searchInput.purchaseDate
    ? new Date(searchInput.purchaseDate + "T00:00:00")
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [validated] = useState(false);

  const [loading, setIsLoading] = useState(false);

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
    if (
      form.checkValidity() === false ||
      searchInput.purchasePrice < 0.01 ||
      !searchInput.itemName.trim() ||
      (selectedDate && selectedDate > getToday())
    ) {
      event.stopPropagation();
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.countdownapi.com/request?api_key=${apiKey}&type=search&ebay_domain=ebay.com.au&search_term=${searchInput.itemName.trim()}&sold_items=true&completed_items=true&sort_by=price_high_to_low`,
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
        purchasePrice: parseFloat(searchInput.purchasePrice),
        purchaseDate: searchInput.purchaseDate,
      });

      setSearcheditems(searchData());
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
          <div className="flex-col">
            <h1 className="text-center">Search For Items</h1>
            <Form
              validated={validated}
              onSubmit={handleFormSubmit}
              className="mx-auto"
            >
              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
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

              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
                <Form.Label>Cost of Item</Form.Label>
                <Form.Control
                  className="inputField"
                  type="number"
                  placeholder="Cost of Item"
                  name="purchasePrice"
                  onChange={handleInputChange}
                  required
                  min={0.01}
                  step={0.01}
                  value={searchInput.purchasePrice || ""}
                ></Form.Control>
              </Form.Group>

              <PriceError price={searchInput.purchasePrice} />

              {Auth.loggedIn() ? (
                <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
                  <Form.Label>Purchase Date</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="purchaseDate"
                    onChange={(e) => {
                      setSearchInput({
                        ...searchInput,
                        purchaseDate: e.target.value,
                      });
                    }}
                    value={searchInput.purchaseDate || ""}
                  ></Form.Control>
                </Form.Group>
              ) : null}

              <DateError date={searchInput.purchaseDate} />

              {infoMessage && (
                <div className="text-center errMessage">{infoMessage}</div>
              )}

              <div className="text-center">
                <Button
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-3 mx-auto my-4 fornLengthButton"
                  disabled={
                    !searchInput.itemName.trim() ||
                    searchInput.purchasePrice < 0.01 ||
                    (selectedDate && selectedDate > getToday())
                  }
                  type="submit"
                >
                  {loading ? <>Loading...</> : <>Search</>}
                </Button>
              </div>
            </Form>
            <div>
              {searchClicked === true ? (
                <SearchResults
                  searchedItems={searchedItems}
                  searchInput={searchInput}
                  dateInputFormat={selectedDate}
                  handleSaveItem={handleSaveItem}
                  itemMessage={itemMessage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SearchItemsForm;
