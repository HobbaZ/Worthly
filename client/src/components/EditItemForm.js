import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import UpdateItem from "./UpdateItem";
import AuthLogin from "./AuthLogin";

export default function EditItemForm({ item, onClose, updateItem }) {
  const [validated] = useState(false);
  const [formInput, setFormInput] = useState({
    itemName: ``,
    purchaseDate: ``,
    purchasePrice: 0,
  });

  let [dateInput, setDateInput] = useState();
  const today = new Date();
  const dateInputFormat = new Date(dateInput);

  useEffect(() => {
    if (item) {
      setFormInput({
        itemName: item.itemName || "",
        purchaseDate: item.purchaseDate || "",
        purchasePrice: item.purchasePrice || 0,
      });
      setDateInput(item.purchaseDate || "");
    }
  }, [item]);

  const [infoMessage, setInfoMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  //reset any changes to default values
  const cancelChanges = () => {
    setFormInput({
      itemName: item.itemName,
      purchaseDate: item.purchaseDate,
      purchasePrice: item.purchasePrice,
    });
    onClose();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //Send data to update user endpoint
    AuthLogin(setInfoMessage);

    const editedProperties = () => ({
      _id: item._id,
      itemName: formInput.itemName,
      purchaseDate: formInput.purchaseDate,
      purchasePrice: parseFloat(formInput.purchasePrice),
    });

    setFormInput(editedProperties());

    //Send data to update endpoint
    UpdateItem(item._id, formInput, setInfoMessage, setFormInput, updateItem);
  };

  return (
    <Form
      validated={validated}
      onSubmit={handleFormSubmit}
      className="editform mx-auto col-12"
    >
      <Form.Group>
        <Form.Label>Update Item Name</Form.Label>
        <Form.Control
          className="inputField"
          type="text"
          placeholder={item.itemName}
          name="itemName"
          onChange={handleInputChange}
          required
          minLength={1}
          value={formInput.itemName !== "" ? formInput.itemName : ""}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Update Cost of Item</Form.Label>
        <Form.Control
          className="inputField"
          type="number"
          placeholder={item.purchasePrice}
          name="purchasePrice"
          onChange={handleInputChange}
          required
          minLength={1}
          value={formInput.purchasePrice !== "" ? formInput.purchasePrice : ""}
        ></Form.Control>
      </Form.Group>

      {formInput.purchasePrice !== null && formInput.purchasePrice < 0.01 && (
        <div className="text-center errMessage">
          Cost of item can't be under $0.01
        </div>
      )}

      <Form.Group>
        <Form.Label>Update Purchase Date</Form.Label>
        <Form.Control
          className="inputField"
          type="date"
          placeholder={dateInput}
          name="purchaseDate"
          onChange={(e) => {
            setDateInput(e.target.value);
          }}
          value={formInput.purchaseDate !== "" ? formInput.purchaseDate : ""}
        ></Form.Control>
      </Form.Group>

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
          type="submit"
          className=" btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4 fornLengthButton"
          aria-label="update and close"
        >
          Update
        </Button>
      </div>

      <div className="text-center">
        <Button
          className=" btn btn-danger col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto fornLengthButton"
          aria-label="cancel and close"
          onClick={cancelChanges}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
