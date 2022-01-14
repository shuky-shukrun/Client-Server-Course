import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { validateEmail, validateEmptyFields } from "../utils";

function ServiceModal({ service, type, handleSave, className, id, key }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  // input refs
  const [treatmentNumber, setTreatmentNumber] = useState(
    service?.treatmentNumber
  );
  const [treatmentInformation, setTreatmentInformation] = useState(
    service?.treatmentInformation
  );
  const [treatmentDate, setTreatmentDate] = useState(service?.tDate);
  const [workerEmail, setWorkerEmail] = useState(service?.workerEmail);
  const [carNumber, setCarNumber] = useState(service?.carNumber);

  // titles and variants
  const modalTitle = type === "Edit" ? "Edit Service" : "Add New Service";
  const isDisabled = type === "Edit" ? true : false;

  const openCloseBtnVariant = type === "Edit" ? "warning" : "success";
  const openCloseBtnTitle =
    type === "Edit" ? <i className="bi bi-pencil"></i> : "+";
  const openCloseBtnSize = type === "Edit" ? "sm" : "lg";

  const saveBtnVariant = type === "Edit" ? "primary" : "success";
  const saveBtnTitle = type === "Edit" ? "Save Changes" : "Add";

  // buttons click handlers
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const _handleSave = async () => {
    setLoading(true);
    const serviceFields = {
      treatmentNumber,
      treatmentInformation,
      treatmentDate,
      workerEmail,
      carNumber,
    };

    if (!validateEmptyFields(Object.values(serviceFields))) {
      setServiceError("Required Fields");
      return;
    }
    if (!validateEmail(workerEmail)) {
      setServiceError("Invalid Email");
      return;
    }

    await handleSave(serviceFields);
    setLoading(false);
    handleClose();
  };

  return (
    <>
      <Button
        variant={openCloseBtnVariant}
        onClick={handleShow}
        className={className}
        size={openCloseBtnSize}
        id={id}
        key={key}
      >
        {openCloseBtnTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <div className="card-body justify-content-center">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-5 me-2 mb-3">
              <input
                className="form-control form-control"
                type="text"
                placeholder="Treatment Number"
                aria-label=".form-control-sm example"
                value={treatmentNumber}
                onChange={(e) => setTreatmentNumber(e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div className="col col-md-5 me-2 mb-3">
              <input
                className="form-control form-control"
                type="date"
                placeholder="Treatment Date"
                aria-label=".form-control example"
                value={treatmentDate?.split("T")[0]}
                onChange={(e) => setTreatmentDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col col-md-5 me-2 mb-3">
              <input
                className="form-control form-control"
                type="email"
                placeholder="Worker Email"
                aria-label=".form-control example"
                value={workerEmail}
                onChange={(e) => setWorkerEmail(e.target.value)}
              />
            </div>
            <div className="col col-md-5 me-2 mb-3">
              <input
                className="form-control form-control"
                type="text"
                placeholder="Treatment Car Number"
                aria-label=".form-control example"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col col-md-10 me-2 mb-3">
              <textarea
                className="form-control form-control-sm"
                type="text"
                placeholder="Treatment Information"
                aria-label=".form-control-sm example"
                rows={3}
                value={treatmentInformation}
                onChange={(e) => setTreatmentInformation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={saveBtnVariant}
            onClick={_handleSave}
            disabled={loading}
          >
            {loading ? "Please wait" : saveBtnTitle}
          </Button>
          <p className="d-flex justify-content-center social-text">
            {serviceError}
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ServiceModal;
