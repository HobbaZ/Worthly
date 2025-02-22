import { Modal, Button } from "react-bootstrap";
import EditProfileForm from "./EditProfileForm";
import Auth from "../utils/auth";

export default function EditProfileModal({ user, show, onClose, updateUser }) {
  return (
    <>
      {Auth.loggedIn() ? (
        <Modal show={show} onHide={onClose} centered>
          <Modal.Header>
            <Modal.Title className="font-weight-bold">
              Editing Profile
            </Modal.Title>

            <Button
              variant="danger"
              onClick={onClose}
              className="close"
              aria-label="close"
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <EditProfileForm
              user={user}
              onClose={onClose}
              updateUser={updateUser}
            />
          </Modal.Body>
        </Modal>
      ) : (
        window.location.replace("./login")
      )}
    </>
  );
}
