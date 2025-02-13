import { Button, Container, Form } from "react-bootstrap";
import { EmailRegex } from "../components/EmailRegex.js";
import { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser.js";
import AuthLogin from "./AuthLogin.js";

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
    <Container>
      <Form onSubmit={submitForm} className="editform mx-auto col-12">
        <Form.Group className="mb-3" disabled={submittingForm}>
          <Form.Label>Update Username</Form.Label>
          <Form.Control
            className="inputField"
            type="text"
            name="username"
            value={formInput.username || user.username}
            placeholder={user.username}
            onChange={handleChange}
            minLength={2}
          />
        </Form.Group>

        {formInput.username !== "" && formInput.username.length < 2 ? (
          <div className="text-center errMessage">
            {"Username must be minimum 2 characters"}
          </div>
        ) : (
          ""
        )}

        <Form.Group className="mb-3" disabled={submittingForm}>
          <Form.Label>Update Email address</Form.Label>
          <Form.Control
            className="inputField"
            type="email"
            name="email"
            value={formInput.email || user.email}
            placeholder={user.email}
            onChange={handleChange}
            minLength={2}
          />
        </Form.Group>

        {!EmailRegex.test(formInput.email) && formInput.email !== "" ? (
          <div className="text-center errMessage">
            {"Invalid email entered"}
          </div>
        ) : (
          ""
        )}

        {infoMessage && (
          <div className="text-center errMessage">{infoMessage}</div>
        )}

        <div className="text-center">
          <Button
            type="submit"
            className=" btn form-btn col-sm-12 col-md-8 col-lg-4 my-2"
          >
            Update
          </Button>
        </div>

        <div className="text-center">
          <Button
            className=" btn btn-danger col-sm-12 col-md-8 col-lg-4 my-2"
            aria-label="cancel and close"
            onClick={cancelChanges}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}
