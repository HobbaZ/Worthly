import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import UpdateItem from "./UpdateItem";
import AuthLogin from "./AuthLogin";
import { DateError, selectedDate, getToday } from "./ErrorMessages";

export default function EditItemForm({ item, onClose, updateItem }) {
  const [formInput, setFormInput] = useState({
    itemName: ``,
    purchaseDate: ``,
    purchasePrice: 0,
  });

  useEffect(() => {
    if (item) {
      setFormInput({
        itemName: item.itemName || "",
        purchaseDate: item.purchaseDate ? item.purchaseDate.split("T")[0] : "",
        purchasePrice: item.purchasePrice || 0,
      });
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
      purchaseDate: item.purchaseDate ? item.purchaseDate.split("T")[0] : "",
      purchasePrice: item.purchasePrice,
    });
    onClose();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      formInput.purchasePrice < 0.01 ||
      !formInput.itemName.trim() ||
      (selectedDate && selectedDate > getToday())
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    //Send data to update user endpoint
    AuthLogin(setInfoMessage);

    const updatedData = {
      _id: item._id,
      itemName: formInput.itemName,
      purchaseDate: formInput.purchaseDate,
      purchasePrice: parseFloat(formInput.purchasePrice),
    };

    //Send data to update endpoint
    UpdateItem(item._id, updatedData, setInfoMessage, setFormInput, updateItem);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="editform mx-auto col-12">
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
          min={0.01}
          step={0.01}
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
          type="date"
          name="purchaseDate"
          onChange={(e) => {
            setFormInput({
              ...formInput,
              purchaseDate: e.target.value,
            });
          }}
          value={formInput.purchaseDate || ""}
        />
      </Form.Group>

      <DateError date={formInput.purchaseDate} />

      {infoMessage && (
        <div className="text-center errMessage">{infoMessage}</div>
      )}

      <div className="text-center">
        <Button
          type="submit"
          className=" btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4 fornLengthButton"
          aria-label="update and close"
          disabled={
            !formInput.itemName ||
            formInput.purchasePrice < 0.01 ||
            (selectedDate && selectedDate > getToday())
          }
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
