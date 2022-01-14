import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalState";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const CSNavbar = () => {
  const { user, addUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(async () => {
    if (localStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(localStorage.getItem("user")));
    }
    let sUser = JSON.parse(sessionStorage.getItem("user"));
    if (sUser && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
    }
  }, []);

  function logout() {
    addUser({});
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-2 " to="/">
            <i className="bi bi-truck me-3"></i>
            CS Cars
          </Link>
          <>
            <Navbar.Toggle aria-controls="nav" />
            <Navbar.Collapse id="nav" className="justify-content-end">
              <Nav>
                <Nav bg="light">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item d-lg-none mt-3">
                      <Link
                        className="text-decoration-none mt-2"
                        to="/AboutUs"
                        style={{
                          color: "#585978",
                        }}
                      >
                        About us
                      </Link>
                    </li>
                    {user.email && (
                      <>
                        <li className="nav-item d-lg-none mt-3">
                          <p className="fst-italic text-primary">
                            {user.firstName + "-" + user.lastName}
                          </p>
                          <hr />
                        </li>
                        <li className="nav-item d-lg-none d-sm-inline-block mt-3 mt-lg-0">
                          <button
                            to="/login"
                            className="btn logout-btn"
                            onClick={() => logout()}
                          >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </Nav>
                <div className="d-none d-lg-inline-block pt-3 pe-3">
                  <Link
                    className="text-decoration-none mt-2"
                    to="/AboutUs"
                    style={{
                      color: "#585978",
                    }}
                  >
                    About us
                  </Link>
                </div>
                {user.email && (
                  <>
                    <div className="d-none d-lg-inline-block pt-3 pe-3">
                      <p className="fst-italic text-primary">
                        {user.firstName + "-" + user.lastName}
                      </p>
                    </div>

                    <div className="d-none d-lg-inline-block">
                      <button
                        to="/login"
                        className="btn logout-btn"
                        onClick={() => logout()}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        </div>
      </Navbar>
    </>
  );
};

export default CSNavbar;
