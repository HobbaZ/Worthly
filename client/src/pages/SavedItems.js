import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ITEM, UPDATE_ITEM } from '../utils/mutations';

import { Container, Button} from 'react-bootstrap';

//import { line } from 'react-chartjs-2';

import Auth from '../utils/auth';

const SavedItems = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  if (!userData) {
    window.location.replace("/")
  }

  //delete mutation
  const [ deleteItem ] = useMutation(DELETE_ITEM);

  //Edit mutation
  const [ updateItem ] = useMutation(UPDATE_ITEM)

 //Form Fields
  //const [itemUpdateInput, setItemUpdateInput] = useState({ itemImage: "", userPaid: 0});

  //Search form handler
  /*const handleInputChange = event => {
    const { name, value } = event.target;
    setItemUpdateInput({ ...itemUpdateInput, [name]: value });
  };*/

  /*const handleFormSubmit = async (event) => {
    event.preventDefault();

    
    if (!itemUpdateInput) {
      return false;
    }

    try {
      setItemUpdateInput({
        //Reset all fields
  
        itemImage: "",
        userPaid: "",
      });
      } catch (err) {
        console.error(err);
      }
    };*/

  //_____________NETWORTH CALCULATION_____________________

  //Calculate networth by adding all profits from the individual items listed
  const netWorth = () => {
    let total = 0;
    const netWorthArray = [];
  
    for (let index = 0; index < userData.savedItems?.length; index++) {
      let calcProfit = userData.savedItems[index].profit;
      total = total + parseFloat(calcProfit);
      netWorthArray.push(total.toFixed(2));
    }
    
    return total.toFixed(2);
    };

    //_____________TOTAL VALUE CALCULATION_____________________

  //Calculate total average value of all items
    const totalValue = () => {
      let total = 0;
  
      for (let index = 0; index < userData.savedItems?.length; index++) {
        let calcPrice = userData.savedItems[index].price;
        total = total + parseFloat(calcPrice);
      }
      
      return total.toFixed(2);
      };
  
    //_____________HIGHEST/LOWEST VALUE ITEMS CALCULATION_____________________

    //Find highest and lowest profits in array
    const sort = () => {
      const sortArray = [];
  
      let loss = 0;
      let most = 0;
  
      for (let index = 0; index < userData.savedItems?.length; index++) {
        let calcProfit = userData.savedItems[index].profit;
        sortArray.push(calcProfit);
        sortArray.sort(function(a, b){return a - b});
  
        most = Math.max(...sortArray)
  
        if (Math.min(...sortArray) <=0 ) {
          loss = Math.min(...sortArray)
        } else {
          loss = 0;
        }
      }
      return [ most, loss ]
    };

  //_____________DELETE FUNCTION FOR DELETE BUTTON_____________________

  // Item's id value deletes from the database
  const handleDeleteItem = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //pass in user data object as argument, pass in _Id variable to deleteitem
      await deleteItem({
        variables: { _id: _id},
      })

      console.log("item successfully deleted")
      window.location.reload();

      //removeItemId(_id);
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  //_____________UPDATE FUNCTION FOR EDIT BUTTON_____________________

  // Item's id value and updates from the database
  const handleUpdateItem = async (_id, item) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //pass in user data object as argument, pass in _Id variable to updateitem
      await updateItem({
        variables: { _id: _id, item: item},
      })

      console.log("item successfully updated", _id, item)
      window.location.reload();

    } catch (err) {
      console.error("Error updating item", err);
    }
  };

  //_____________RENDERING STUFF_____________________

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
    <Container>
    <div className='main'>
      <div className='text-center'>
          <h1>Your Saved Stuff!</h1>
      <h2>
          {userData.savedItems?.length ? `Viewing ${userData.savedItems.length} saved ${userData.savedItems.length === 1 ? 'item' : 'items'}:`
            : 'You aren\'t tracking anything yet!'}
        </h2>
 
          {userData.savedItems?.map((item) => {
            return (
              <>
              <div key={item._id}></div>

                {item.itemImages ? (
                  <img src={item.itemImages} alt={`${item.itemName}`} variant='top'/>
                  ) : null}

                  <h2>{item.itemName}</h2>

                  <p>Purchase Price: ${item.purchasePrice}</p>

                  {/*Edit purchase price field here*/}
                  {/*<Form onSubmit={handleFormSubmit}>

                  <FormGroup>
                    <Label>Replace Price</Label>
                    <FormField
                      type='text'
                      placeholder= "Purchase Price"
                      name='userPaid'
                      onChange={handleInputChange}
                      value={itemUpdateInput.userPaid}>
                    </FormField>
                  </FormGroup>

                    <FormGroup>
                    <Label>Replace Item Image</Label>
                    <FormField
                      type='text'
                      placeholder= "Image path"
                      name='itemImage'
                      onChange={handleInputChange}
                      value={itemUpdateInput.itemImage}>
                    </FormField>
                  </FormGroup>
                  </Form>*/}

                  
                  <p>Average Sale Price: ${item.price}</p>

                  <p>Profit:

                  {item.profit ? `$${item.profit}`
                            : null}

                  {item.percent ? 
                          <span style={item.percent <=0 ? {'color': 'rgb(252, 122, 0)'} : {'color': 'rgb(115, 255, 0)'}}>
                            {item.percent <= 0 ? ` ↓ ${item.percent}%` : ` ↑ ${item.percent}%`}
                            </span> : null}
                  </p>

                  <Button onClick={() => handleDeleteItem(item._id)}>
                    Delete
                  </Button> 

                  <Button onClick={() => handleUpdateItem(item._id)}>
                    Edit
                  </Button> 
              </>
            );
          })}

            {/*Display net profit and loses*/}
            <Container>
                <h1 > Stuff Breakdown</h1>
                <h4>Total Value: ${totalValue()}</h4>
                <h4>Total Profit: ${netWorth()}</h4>
                <h4>Total Spent: ${(totalValue()-netWorth()).toFixed(2)}</h4>

                <h4>Highest profit: ${sort()[0]}</h4>

                <h4>Highest loss: ${sort()[1]}</h4>

            </Container>
      </div>
    </div>
    </Container>
    </>
  );
};

export default SavedItems;