import { useState } from "react";

function ServiceInfo({ service, options }) {
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
  //const isDisabled = type === "Edit" ? true : false;

  return (
    <>
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceInfo;
