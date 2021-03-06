import React, { useState, useEffect } from 'react';

import { Form, FormField, Label, FormGroup, FormButton } from '../styles/FormStyle';

import { Button, Container, Image, TextBlock, ResultsContainer, ImageBlock} from '../styles/GenericStyles';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';

import { SAVE_ITEM } from '../utils/mutations';

import HeroImage from '../components/HeroImage';

const apiKey = process.env.REACT_APP_API_KEY;

function SpinnerContent() {

  const [newSVG, setNewSVG] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewSVG((genSVG) => genSVG + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroImage></HeroImage>
  )
}

const SearchItemsForm = () => {
    // create state for holding returned eBay api data
    const [searchedItems, setSearcheditems] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState({ itemName: '', userPaid: 0.01});

    const [validated] = useState(false);

    const [loading, setIsLoading] = useState(false);
  
    // Set up our mutation with an option to handle errors, put in parent form function
    const [saveItem, { error, data } ] = useMutation(SAVE_ITEM);
  
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    /*useEffect(() => {
      setTimeout(() => 
        setIsLoading(true), 3000);
    }, []); // <- add empty brackets here*/

    //Search form handler
    const handleInputChange = event => {
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

    //searchInput.userPaid can't be zero
    if (searchInput.userPaid < 0.01) {
      return ("User paid can't be zero")
    }

    try {
      //show loading after button clicked
      setIsLoading(true)
      const response = await fetch(`https://api.countdownapi.com/request?api_key=${apiKey}&type=search&ebay_domain=ebay.com.au&search_term=${searchInput.itemName}&sold_items=true&completed_items=true&sort_by=price_high_to_low`)

      if (!response.ok) {
        console.log(response);
        throw new Error('something went wrong!');
      }

    //Has to match the name of one of the arrays in the response or it won't work
    const { search_results } = await response.json();

    //set loading state back to false after response received
    setIsLoading(false)

    //find total price by adding all prices from the found records
    const averagePrice = () => {
    let total = 0;
    let average = 0;

    for (let index = 0; index < search_results.length; index++) {
      let priceMinusPostage = search_results[index]?.price.value; //Don't need shipping cost as only getting initial sold amount
      total = total+parseFloat(priceMinusPostage);

    }
    average = (total/search_results.length).toFixed(2);    
    return average;
    };

    //Percentage function
    const percentage = () => {
      let ave = averagePrice()

      let percent = 0;

      let difference = (ave - searchInput.userPaid)
      percent = ((difference/searchInput.userPaid)*100).toFixed(1);
      return percent
    };

    const profit = () => {
      let ave = averagePrice()
      let difference = (ave - searchInput.userPaid).toFixed(2)
      return difference;
    }

    const searchData = () => ({
      itemName: search_results[0]?.title,
      quantity: search_results.length,
      itemImages: search_results[0]?.image || [],
      price: parseFloat(averagePrice()),
      purchasePrice: parseFloat(searchInput.userPaid),
      percent: parseFloat(percentage()),
      profit: parseFloat(profit()),
    })

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

    const itemToSave = {...searchedItems};

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveItem({
        variables: {item: itemToSave },
        
      });
      window.location.replace("/saved");
      // if item successfully saves to user's account, save item to state

      //setsavedItemIds([...savedItemIds, itemToSave]);
      console.log('item successfully saved', itemToSave)

    } catch (err) {
      console.error(err);
    };
  };

  if (searchedItems.profit <= 0) {
    <p styled={{"color": 'red'}}></p>
  } else {
    <p styled={{"color": 'green'}}></p>
  }

return (
    <>
    <Container>
      <TextBlock>
          <h3>Search Tips...</h3>
          <p>Include specific search terms like the item's brand, colour, size and model number instead of more vague search terms like colour and type of item.
          <br/><br/>
          To search for one word or another, put the words in parentheses divided by commas, e.g. [Volkswagen, VW].</p>

          {/*Show create account message if user not logged in*/}
          {Auth.loggedIn() ? (
            null
          ) : (
            <>
            <h4>Why create an account?</h4>
            <p>You can use the site to look up single item values all day long, but what if you have many different items you'd like to keep track of? Creating an account gives you the option to track all your items and gives you a rundown of how much profit you'd make, total item value and how much you've spent on your collection, price tracking and graphs coming soon.</p>
            </>
          )};
          
      </TextBlock>     

      {data ? (
              <div>
                Searching for item...
              </div>
            ) : (

          <Form validated={validated} onSubmit={handleFormSubmit}>

              <FormGroup>
              <Label>Item Name</Label>
              <FormField
                type='text'
                placeholder='Name of item'
                name='itemName'
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.itemName}>
                
              </FormField>
              </FormGroup>
            
              <FormGroup>
              <Label>Cost of Item</Label>
              <FormField 
                type='number'
                placeholder='Cost of Item'
                name='userPaid'
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.userPaid}>
              </FormField>
              </FormGroup>

              <FormGroup>

            <div style={{"textAlign": "center"}}>
            <FormButton
              disabled={!(searchInput.itemName || searchInput.userPaid)}
              type='submit'
              variant='success'>
              Submit
            </FormButton>
            </div>
            </FormGroup>
            
          </Form>
          )}

          {error && (
            <div>{error.message}</div>
          )}

          {loading? (
            <div>
              <SpinnerContent></SpinnerContent>
            </div>
            ) : (
      //Display search results
      <div>
      {searchedItems.itemName
      ? (
        <>
        <ResultsContainer>
        <ImageBlock>  
        {searchedItems.itemImages ? (
                  <Image src={searchedItems.itemImages} alt={`${searchInput.itemName}`} variant='top'></Image>
                ) : null}
        </ImageBlock>
        <TextBlock>
      <h2>{searchedItems.itemName}</h2>

      <h4>
          {searchedItems.quantity
            ? 
            `${searchedItems.quantity} results`
            : null}
        </h4>

        <p>
          {searchedItems.purchasePrice
          ?
          `Purchase Price: ${searchedItems.purchasePrice}`
          : null}
        </p>

        <p>
        {searchedItems.price
            ? `Estimated Sale Price: $${searchedItems.price}`
            : null}
        </p>

        <p >
        {searchedItems.profit
            ? `Profit: ${searchedItems.profit <= 0 ? ' -' : ' +'} $${searchedItems.profit}  `
            : null}

        {searchedItems.percent
                  ? `(${searchedItems.percent <= 0 ?  ' ???' : ' ???'} ${searchedItems.percent}%)`
                  : null}</p>

        {Auth.loggedIn() && (
            <Button
            onClick={() => handleSaveItem()}>
                Track Item
            </Button>          
        )}
      </TextBlock>
      </ResultsContainer>
      </>
      ) : <h2>We couldn't find any results</h2>}
       </div>

          )}; 

      </Container>
      

      
        
    </>
  );
};

export default SearchItemsForm;