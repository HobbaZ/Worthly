import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

import { useMutation } from "@apollo/client";

import { SAVE_ITEM } from "../utils/mutations";

import SearchResults from "../components/SearchResults";
import { AvePrice } from "../components/AvePrice";
import { Percentage } from "../components/Percentage";
import { Profit } from "../components/Profit";

const apiKey = process.env.REACT_APP_API_KEY;

const SearchItemsForm = () => {
  // create state for holding returned eBay api data
  const [searchedItems, setSearcheditems] = useState({
    purchasePrice: 0,
    price: "",
    itemName: "",
    profit: "",
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

  // Set up our mutation with an option to handle errors, put in parent form function
  const [saveItem] = useMutation(SAVE_ITEM);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  //Search form handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  // create method to search for items and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!searchInput) {
      return false;
    }

    try {
      //show loading after button clicked
      setIsLoading(true);
      const response = await fetch(
        `https://api.countdownapi.com/request?api_key=${apiKey}&type=search&ebay_domain=ebay.com.au&search_term=${searchInput.itemName}&sold_items=true&completed_items=true&sort_by=price_high_to_low`
      );

      if (!response.ok) {
        setInfoMessage("Can't connect right now, try again later");
        throw new Error("Can't connect right now, try again later:", response);
      }

      //Has to match the name of one of the arrays in the response or it won't work
      const { search_results } = await response.json();

      //set loading state back to false after response received
      setIsLoading(false);

      const ave = AvePrice(search_results);

      Percentage(ave, search_results, searchInput);

      const profit = Profit(ave, searchInput.userPaid);

      const searchData = () => ({
        itemName: search_results[0]?.title,
        quantity: search_results.length,
        itemImages: search_results[0]?.image || "",
        price: parseFloat(ave),
        purchasePrice: parseFloat(searchInput.userPaid),
        profit: parseFloat(profit),
        purchaseDate: dateInput,
      });

      setSearcheditems(searchData);
      setSearchInput({
        //Persist searchterms until cleared by user
        itemName: searchInput.itemName,
        userPaid: searchInput.userPaid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveItem = async () => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

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
          {/*<h3>Search Tips...</h3>
          <p>Include specific search terms like the item's brand, colour, size and model number instead of more vague search terms like colour and type of item.
          <br/><br/>
          To search for one word or another, put the words in parentheses divided by commas, e.g. [Volkswagen, VW].</p>
          
          Put double quotes around the search to search for the exact words in the exact order
          
          */}

          {/*Show create account message if user not logged in*/}
          {Auth.loggedIn() ? null : (
            <>
              {/*<h4>Why create an account?</h4>
            <p>You can use the site to look up single item values all day long, but what if you have many different items you'd like to keep track of? 
              Creating an account gives you the option to track all your items and gives you a rundown of how much profit you'd make, total item value and how much you've spent on your collection, 
          price tracking and graphs coming soon.</p>*/}
            </>
          )}

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

          {/*Display search results*/}
          <SearchResults
            searchedItems={searchedItems}
            searchInput={searchInput}
            dateInputFormat={dateInputFormat}
            handleSaveItem={handleSaveItem}
            itemMessage={itemMessage}
          />
        </div>
      </Container>
    </>
  );
};

export default SearchItemsForm;
