import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Header from "../components/Header";
import { insertServiceToDB } from "../contexts/ClientDBOperations";
import ServiceInfo from "../components/ServiceInfo";
import { validateEmail, validateEmptyFields } from "../utils";
import ErrorModal from "../components/ErrorModal";

const HomePage = () => {
  const {
    data,
    user,
    addUser,
    tableLoading,
    loadServicesBacklog,
    setTableLoading,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [addServiceError, setAddServiceError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rowsData, setRowsData] = useState(data);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const treatmentNumberRef = useRef();
  const treatmentInformationRef = useRef();
  const treatmentDateRef = useRef();
  const workerEmailRef = useRef();
  const carNumberRef = useRef();

  const navigate = useNavigate();
  useEffect(async () => {
    if (localStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(localStorage.getItem("user")));
    }
    let sUser = JSON.parse(sessionStorage.getItem("user"));
    if (sUser && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
    }
    if (!user.email) {
      navigate("/login");
    }
  }, []);

  useEffect(async () => {
    setRowsData(data);
  }, [data]);

  useEffect(() => {
    let filteredData = data.filter((row) => {
      return (
        row.treatmentNumber
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1 ||
        row.treatmentInformation
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1 ||
        row.tDate
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1 ||
        row.workerEmail
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1 ||
        row.carNumber
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1
      );
    });
    setRowsData(filteredData);
  }, [searchInput]);

  async function addService() {
    setAddServiceError("");
    let service = {
      treatmentNumber: treatmentNumberRef.current.value,
      treatmentInformation: treatmentInformationRef.current.value,
      treatmentDate: treatmentDateRef.current.value,
      workerEmail: workerEmailRef.current.value,
      carNumber: carNumberRef.current.value,
    };
    if (!validateEmptyFields(Object.values(service))) {
      setAddServiceError("Required Fields");
      return;
    }
    if (!validateEmail(workerEmailRef.current.value)) {
      setAddServiceError("Invalid Email");
      return;
    }

    setLoading(true);

    const { status, message } = await insertServiceToDB(service, user.email);
    if (status === 200) {
      setTableLoading(true);
      console.log("Loading news");
      treatmentNumberRef.current.value = "";
      treatmentInformationRef.current.value = "";
      treatmentDateRef.current.value = "";
      workerEmailRef.current.value = "";
      carNumberRef.current.value = "";
      const backlog = await loadServicesBacklog();
    } else {
      setErrorMessage(message);
      setShowErrorModal(true);
    }
    setTableLoading(false);
    setLoading(false);
  }

  const columns = [
    {
      name: "No.",
      selector: (row) => row.treatmentNumber,
      sortable: true,
      maxWidth: "80px",
    },
    {
      name: "Treatment Information",
      selector: (row) => row.treatmentInformation,
      sortable: true,
      hide: "sm",
      maxWidth: "200px",
    },
    {
      name: "Date",
      selector: (row) => new Date(row.tDate).toISOString().split("T")[0],
      sortable: true,
      hide: "md",
      maxWidth: "110px",
    },
    {
      name: "Worker email",
      selector: (row) => row.workerEmail,
      sortable: true,
      hide: "lg",
      maxWidth: "200px",
    },
    {
      name: "Car Number",
      selector: (row) => row.carNumber,
      sortable: true,
      hide: "md",
      maxWidth: "150px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      width: "150px",
    },
  ];

  const ExpandedComponent = ({ data }) => {
    return <ServiceInfo service={data} />;
  };

  return (
    <>
      <section className="mt-2">
        <div className="container">
          <div className="row mt-2 justify-content-center">
            <div className="col col-md-11 col-lg-10 col-xl-9">
              <Header
                title="Welcome to CS Cars Services"
                body="Manage your garage, easily."
              />
              <div className="row justify-content-center mb-1">
                <div className="col-xxl-5 col-xl-6 col-lg-7">
                  <div className="mb-3 form-group has-feedback">
                    <section className="search-section">
                      <input
                        placeholder="Search Service..."
                        type="text"
                        className="form-control"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        id="searchInput"
                      ></input>
                      <div className="icon d-flex justify-content-center align-items-center">
                        <i className="bi bi-search"></i>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <DataTable
                title="Services Backlog"
                columns={columns}
                data={rowsData}
                progressPending={tableLoading}
                pagination
                highlightOnHover={true}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked={true}
              />
              <div className="row m-3 d-flex justify-content-center">
                <div className="col col-md-10 col-xl-8">
                  <div className="card">
                    <div className="row d-flex justify-content-center mt-3">
                      <div className="col-6 display-5 mb-2 text-center">
                        Add New Service
                      </div>
                    </div>
                    <div className="card-body justify-content-center">
                      <div className="row d-flex justify-content-center">
                        <div className="col col-md-5 me-2 mb-3">
                          <input
                            className="form-control form-control"
                            type="text"
                            placeholder="Treatment Number"
                            aria-label=".form-control-sm example"
                            ref={treatmentNumberRef}
                          />
                        </div>
                        <div className="col col-md-5 me-2 mb-3">
                          <input
                            className="form-control form-control"
                            type="date"
                            placeholder="Date"
                            aria-label=".form-control example"
                            ref={treatmentDateRef}
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
                            ref={workerEmailRef}
                          />
                        </div>
                        <div className="col col-md-5 me-2 mb-3">
                          <input
                            className="form-control form-control"
                            type="text"
                            placeholder="Treatment Car Number"
                            aria-label=".form-control example"
                            ref={carNumberRef}
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
                            ref={treatmentInformationRef}
                          />
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center">
                        <div className="col col-md-6 me-2 mb-3 d-flex justify-content-center">
                          <button
                            onClick={addService}
                            className="btn btn-success btn"
                            disabled={loading}
                          >
                            {loading ? "Please wait" : "Add"}
                          </button>
                        </div>
                      </div>
                      <p className="d-flex justify-content-center social-text">
                        {addServiceError}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ErrorModal
            show={showErrorModal}
            setShow={setShowErrorModal}
            message={errorMessage}
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
