import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ServiceModal({
  handleDeleteRow,
  treatmentNumber,
  className,
  id,
  key,
}) {
  const [show, setShow] = useState(false);

  // buttons click handlers
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={handleShow}
        className={className}
        id={id}
        key={key}
      >
        <i className="bi bi-trash"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <div className="card-body justify-content-center">
          This action cannot be undone
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteRow(treatmentNumber);
              handleClose();
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ServiceModal;
