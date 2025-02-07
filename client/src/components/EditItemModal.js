import { Modal, Button } from "react-bootstrap";
import EditItemForm from "./EditItemForm";

export default function EditItemModal({ show, onClose, item, updateItem }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Editing Item</Modal.Title>

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
        <p>Current Name: {item.itemName}</p>
        <EditItemForm item={item} onClose={onClose} updateItem={updateItem} />
      </Modal.Body>
    </Modal>
  );
}
