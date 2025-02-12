import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_ITEM, UPDATE_ITEM } from "../utils/mutations";
import { Container, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import Networth from "../components/Networth";
import EditItemModal from "../components/EditItemModal";
import DeleteItem from "../components/DeleteItem";
import { Percentage } from "../components/Percentage";
import { Profit } from "../components/Profit";

const SavedItems = () => {
  const [deleteItem] = useMutation(DELETE_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [infoMessage, setInfoMessage] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  if (!userData) {
    window.location.replace("/");
  }

  //Open and close edit form
  function handleEditFormToggle(itemId) {
    setShowEditForm(itemId === showEditForm ? null : itemId);
  }

  // Item's id value deletes from the database
  const handleDeleteItem = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    DeleteItem(itemId, setInfoMessage, deleteItem);
  };

  // formats stored date to users location date format
  const dateFormatter = (itemDate) => {
    let date = new Date(itemDate);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <div className="main">
          <div className="text-center">
            <h1>My Collection</h1>
            <h3>
              {userData.savedItems?.length
                ? `Viewing ${userData.savedItems?.length} saved ${
                    userData.savedItems?.length === 1 ? "item" : "items"
                  }:`
                : "There's nothing here yet."}
            </h3>

            {userData.savedItems?.length !== 0 ? (
              <div className="tableContainer">
                <table className="w-100">
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <th>Item Name</th>
                      <th>Purchase Date</th>
                      <th>Paid $</th>
                      <th>Ave. Sell $</th>
                      <th>Profit $</th>
                      <th>Profit %</th>
                      <th></th>
                    </tr>

                    {userData.savedItems?.map((item) => {
                      /* Calculate Profit */
                      let profit = Profit(
                        item.price.toFixed(2),
                        item.purchasePrice.toFixed(2)
                      );

                      return (
                        <>
                          <tr key={item._id}>
                            <td className="imageCell">
                              <img
                                src={item.itemImages}
                                alt={`${item.itemName}`}
                                variant="top"
                                className="tableImage"
                              />
                            </td>

                            <td>
                              <p className="truncate tableItemName">
                                {item.itemName}
                              </p>
                            </td>

                            <td>
                              <p className="text-left">
                                {dateFormatter(item.purchaseDate)}
                              </p>
                            </td>

                            <td>
                              <p className="text-left">
                                ${item.purchasePrice.toFixed(2)}
                              </p>
                            </td>

                            <td>
                              <p className="text-left">
                                ${item.price.toFixed(2)}
                              </p>
                            </td>

                            <td>
                              {item.price && (
                                <p className="text-left">${profit}</p>
                              )}
                            </td>

                            <td>
                              <p>
                                {item.price &&
                                  Percentage(
                                    profit,
                                    item.purchasePrice.toFixed(2)
                                  )}
                              </p>
                            </td>

                            <td>
                              <Button
                                className="btn btn-danger ml-3 item-btn"
                                onClick={() => handleDeleteItem(item._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>

                            <td>
                              <Button
                                className="btn form-btn ml-3 item-btn"
                                onClick={() => handleEditFormToggle(item._id)}
                              >
                                <i className="fas fa-pen-to-square"></i>
                              </Button>
                            </td>

                            {showEditForm === item._id && (
                              <>
                                <EditItemModal
                                  item={userData.savedItems?.find(
                                    (i) => i._id === showEditForm
                                  )}
                                  updateItem={updateItem}
                                  show={showEditForm !== null}
                                  onClose={() => setShowEditForm(null)}
                                />
                              </>
                            )}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}

            {/*Display net profit and loses if length is over 1 */}
            {userData.savedItems?.length < 1 ? null : (
              <Networth userData={userData} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SavedItems;
