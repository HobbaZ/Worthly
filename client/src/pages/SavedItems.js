import React, {useState, useEffect} from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ITEM, UPDATE_ITEM } from '../utils/mutations';

import { Container, Button} from 'react-bootstrap';

//import CollectionChart from '../components/CollectionChart'

//import { line } from 'react-chartjs-2';

import Auth from '../utils/auth';

const SavedItems = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  const [chartData, setChartData] = useState({})

  if (!userData) {
    window.location.replace("/")
  }

  //delete mutation
  const [ deleteItem ] = useMutation(DELETE_ITEM);

  //Edit mutation
  const [ updateItem ] = useMutation(UPDATE_ITEM)

  const [showEditForm, setShowEditForm] = useState(false);
  
  function handleEditFormToggle (itemId, item) {
    setShowEditForm(!showEditForm);
  }


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
  const handleDeleteItem = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //pass in item data object as argument, pass in _Id variable to deleteitem
      await deleteItem({
        variables: { _id: itemId},
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
  const handleUpdateItem = async (itemId, item) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    

    try {
      //pass in user data object as argument, pass in _Id variable to updateitem
      /*await updateItem({
        variables: { _id: _id, item: item},
      })*/

      console.log("item successfully updated", itemId, item)
      //window.location.reload();

    } catch (err) {
      console.error("Error updating item", err);
    }
  };

  // formats stored date to users location date format
  const dateFormatter = (itemDate) => {
    let date = new Date(itemDate)
    return date.toLocaleDateString();
  }

  /* Charts
  useEffect(() => {
    setChartData({
      labels: "prices",

      datasets: [
        {
          label: 'item name',
            data: [0,10,5,15,50,25]
          //data: userData.savedItems.map((item) => item.price),
          
          backgroundColor: [
            'white',
            'green',
            'blue'
          ],
        }
    ]
});
  }, []);*/

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
          <h1>My Collection</h1>
      <h2>
          {userData.savedItems?.length ? `Viewing ${userData.savedItems.length} saved ${userData.savedItems.length === 1 ? 'item' : 'items'}:`
            : 'Nothing here yet'}
        </h2>

        {userData.savedItems?.length !==0 ? (
          <div className= "tableContainer">

          <table className='w-100'>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Purchase Date</th>
              <th>Purchase $</th>
              <th>Ave. Sell $</th>
              <th>Profit $</th>
              <th>Profit %</th>
              <th></th>
            </tr>

          {userData.savedItems?.map((item) => {
            return (
              <>
              <tr key={item._id}>
                <td className='imageCell'><img src={item.itemImages} alt={`${item.itemName}`} variant='top' className='tableImage'/></td>

                <td><p className='truncate tableItemName'>{item.itemName}</p></td>

                <td><p className='text-left '>{dateFormatter(item.purchaseDate)}</p></td>

                <td>${item.purchasePrice.toFixed(2)}</td>

                <td>${item.price.toFixed(2)}</td>

                <td>${item.profit.toFixed(2)}</td>

                <td>{item.percent && 
                          <span style={item.percent <=0 ? {'color': 'rgb(252, 122, 0)'} : {'color': 'rgb(115, 255, 0)'}}>
                            {item.percent <= 0 ? ` ↓ ${item.percent}%` : ` ↑ ${item.percent}%`}
                            </span>}
                </td>

                <td><Button className='btn btn-danger ml-3' onClick={() => handleDeleteItem(item._id)}>X</Button></td>

                {/*<td><Button className='btn btn-primary ml-3' onClick={() => editForm(item._id, setEditForm)}>Edit</Button></td>*/}

                <td><Button className='btn btn-primary ml-3' onClick={() => handleEditFormToggle(item._id, item)}>Edit 2</Button></td>
              </tr>
              
              </>
              )
                })}
                </tbody>
              </table>

              {showEditForm && (
              <Container>
                {console.log(showEditForm)}
                <p>Edit item</p>
              </Container>
              )}

              </div>

        ) : (null)}
        
            {/*Display net profit and loses if length is over 1 */}
            {userData.savedItems.length < 1 ? (
            
          null ): <Container>

            {/*<CollectionChart chartData= {chartData} />*/}

          <h4 > My Item Networth</h4>
          <p> 
              Total Spent: ${(totalValue()-netWorth()).toFixed(2)}<br />
              Highest profit: ${sort()[0]}<br />
              Highest loss: ${sort()[1]}<br />
              Total Value: ${totalValue()} <br />
              <span className='font-weight-bold'>Total Networth: ${netWorth()}</span>
          </p>
      </Container>}
      </div>
    </div>
    </Container>
    </>
  );
};

export default SavedItems;