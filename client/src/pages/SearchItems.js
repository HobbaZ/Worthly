import React, { useState, useEffect } from 'react';

import { Container, Button, Form} from 'react-bootstrap';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';

import { SAVE_ITEM } from '../utils/mutations';

//import HeroImage from '../components/HeroImage';

const apiKey = process.env.REACT_APP_API_KEY;

/*function SpinnerContent() {

  const [newSVG, setNewSVG] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewSVG((genSVG) => genSVG + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroImage />
  )
}*/

const SearchItemsForm = () => {
    // create state for holding returned eBay api data
    const [searchedItems, setSearcheditems] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState({ itemName: '', userPaid: 0.01});

    const [validated] = useState(false);

    const [loading, setIsLoading] = useState(false);
  
    // Set up our mutation with an option to handle errors, put in parent form function
    const [saveItem, { data } ] = useMutation(SAVE_ITEM);
  
    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

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

    try {
      //show loading after button clicked
      setIsLoading(true)
      const response = await fetch(`https://api.countdownapi.com/request?api_key=${apiKey}&type=search&ebay_domain=ebay.com.au&search_term=${searchInput.itemName}&sold_items=true&completed_items=true&sort_by=price_high_to_low`)

      if (!response.ok) {
        console.log(response);
        setInfoMessage("Can't connect right now, try again later")
        throw new Error('something went wrong!', response);
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
    };

    const searchData = () => ({
      itemName: search_results[0]?.title,
      quantity: search_results.length,
      itemImages: search_results[0]?.image || [],
      price: parseFloat(averagePrice()),
      purchasePrice: parseFloat(searchInput.userPaid),
      percent: parseFloat(percentage()),
      profit: parseFloat(profit()),
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

      console.log('item successfully added', itemToSave)

      setInfoMessage('item successfully added')
    } catch (e) {
      setInfoMessage("Item couldn't be added to account!")
      console.error("Item couldn't be added to account!",e);
    };
  };

return (
    <>
    <Container>
    <div className='main'>
          {/*<h3>Search Tips...</h3>
          <p>Include specific search terms like the item's brand, colour, size and model number instead of more vague search terms like colour and type of item.
          <br/><br/>
          To search for one word or another, put the words in parentheses divided by commas, e.g. [Volkswagen, VW].</p>
          
          Put double quotes around the search to search for the exact words in the exact order
          
          */}

          {/*Show create account message if user not logged in*/}
          {Auth.loggedIn() ? (
            null
          ) : (
            <>
            {/*<h4>Why create an account?</h4>
            <p>You can use the site to look up single item values all day long, but what if you have many different items you'd like to keep track of? 
              Creating an account gives you the option to track all your items and gives you a rundown of how much profit you'd make, total item value and how much you've spent on your collection, 
          price tracking and graphs coming soon.</p>*/}
            </>
          )}

        <h1 className='text-center'>Search For Items</h1>   
    
          <Container>
          <Form validated={validated} onSubmit={handleFormSubmit} className='mx-auto col-sm-12 col-md-9 col-lg-6'>

              <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                className='inputField'
                type='text'
                placeholder='Name of item'
                name='itemName'
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.itemName}>
              </Form.Control>
              </Form.Group>
            
              <Form.Group>
              <Form.Label>Cost of Item</Form.Label>
              <Form.Control 
                className='inputField'
                type='number'
                placeholder='Cost of Item'
                name='userPaid'
                onChange={handleInputChange}
                required
                minLength={1}
                value={searchInput.userPaid}>
              </Form.Control>
              </Form.Group>

              {searchInput.userPaid !== null && searchInput.userPaid < 0.01 ? 
                  <div className="text-center errMessage">Cost of item can't be under $0.01</div> : ""}

              {infoMessage && (
                  <div className='text-center errMessage'>{infoMessage}</div>
                  )}

            <div className='text-center'>
            <Button
              className='btn form-btn col-sm-12 col-md-8 col-lg-4 my-4'
              disabled={!(searchInput.itemName && searchInput.userPaid)}
              type='submit'>Submit</Button>
            </div>
          </Form>

          {loading ? ( 
              <div className ="text-center">Loading...</div> ) : (
                <>

      {/*Display search results*/}
      <Container>
      {searchedItems.itemName ? (
        <>
      <div className='text-center flex'>
      
        <div className='resultsImage'>
        {searchedItems.itemImages ? (
                  <img src={searchedItems.itemImages} alt={`${searchInput.itemName}`} variant='top' />
                ) : null}
        </div>


        <div className='resultsText'>

          <h4 className="itemName">{searchedItems.itemName}</h4>

          <h4>{searchedItems.quantity && `${searchedItems.quantity} results`}</h4>

          <p>{searchedItems.purchasePrice && `Purchase Price: $${searchedItems.purchasePrice.toFixed(2)}`}</p>

          <p>{searchedItems.price && `Estimated Sale Price: $${searchedItems.price}`}</p>

          {/*Shows green or red if in profit or loss*/}
          <p>
          {searchedItems.profit && `Profit: $${searchedItems.profit.toFixed(2)}`}

          {searchedItems.percent && (
            <span style={searchedItems.percent <=0 ? {'color': 'rgb(252, 122, 0)'} : {'color': 'rgb(115, 255, 0)'}}>
              {searchedItems.percent <= 0 ? ` ↓ ${searchedItems.percent}%` : ` ↑ ${searchedItems.percent}%`}
            </span>)}
          </p>

          {Auth.loggedIn() && (
              <Button
              className='btn form-btn col-sm-12 col-md-8 col-lg-4 my-3'
              onClick={() => handleSaveItem()}>
                  Track Item
              </Button>          
          )}

          {/*End resultstext div*/}
        </div>
    
      {/*End display search results div*/}
      </div>
      </>

      ) : <p className="text-center mx-auto">We Couldn't find anything for {searchInput.itemName.length > 1 ? `${searchInput.itemName}` : "your search"}</p>}
        {/*results container*/}
       </Container>
       </>
      )}
        {/*form container*/}
       </Container>
      </div>

      {/*main container*/}
      </Container>
      </>
)};


export default SearchItemsForm;