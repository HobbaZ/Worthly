import { Button, Form } from "react-bootstrap";
import { EmailError, UsernameError } from "./ErrorMessages.js";
import { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser.js";
import AuthLogin from "./AuthLogin.js";
import { isUpdateUserInvalid } from "./EmailRegex.js";

export default function EditProfileForm({ user, onClose, updateUser }) {
  const [submittingForm, setSubmittingForm] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [formInput, setFormInput] = useState({
    username: user.username || "",
    email: user.email || "",
  });

  useEffect(() => {
    if (user?.username && user?.email) {
      setFormInput({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (isUpdateUserInvalid) {
      setInfoMessage("Please fix the errors above");
      return;
    }

    setSubmittingForm(true);

    AuthLogin(setInfoMessage);

    UpdateUser(formInput, setInfoMessage, onClose, updateUser);
  };

  const cancelChanges = () => {
    setFormInput({
      username: user.username,
      email: user.email,
    });
    onClose();
  };

  return (
    <Form onSubmit={submitForm} className="editform mx-auto col-12">
      <Form.Group className="mb-3" disabled={submittingForm}>
        <Form.Label>Update Username</Form.Label>
        <Form.Control
          className="inputField"
          type="text"
          name="username"
          value={formInput.username || ""}
          placeholder={user.username}
          onChange={handleChange}
          minLength={2}
        />
      </Form.Group>

      <UsernameError username={formInput.username} />

      <Form.Group className="mb-3" disabled={submittingForm}>
        <Form.Label>Update Email address</Form.Label>
        <Form.Control
          className="inputField"
          type="email"
          name="email"
          value={formInput.email || ""}
          placeholder={user.email}
          onChange={handleChange}
          minLength={2}
        />
      </Form.Group>

      <EmailError email={formInput.email} />

      {infoMessage && (
        <div className="text-center errMessage">{infoMessage}</div>
      )}

      <div className="text-center">
        <Button
          type="submit"
          className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 my-4 mx-auto fornLengthButton"
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
