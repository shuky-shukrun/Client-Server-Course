import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="position-relative"
      style={{ background: "#ECEFF1", paddingTop: "30px" }}
    >
      <div className="container" style={{ padding: "0 30px" }}>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
            <div style={{ marginBottom: "20px" }}>
              <Link className="navbar-brand fw-bold fs-3" to="/">
                <i className="bi bi-truck me-3"></i>
                CS Cars
              </Link>
            </div>
            <p className="pe-4 mb-5">
              This is our project on Client-Server course.
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <div>
              <h6 className="fw-bold text-uppercase">Links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Home
                </Link>
              </p>
              <p>
                <Link
                  className="text-decoration-none"
                  to="/AboutUs"
                  style={{
                    color: "#585978",
                  }}
                >
                  About us
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
              }}
            />
            <p>
              <i className="bi bi-house-fill mr-3"></i> Ort Braude Collage,
              Karmiel
            </p>
          </div>
        </div>
        <div
          className="pt-3 pb-1"
          style={{
            borderTop: "1px solid rgba(88, 89, 120, 0.4)",
          }}
        >
          <p
            className="text-center"
            style={{
              fontSize: "14px",
              color: "rgba(88, 89, 120, 0.6)",
            }}
          >
            © 2022 Copyright:
            <Link className="ps-1" to="" style={{ color: "inherit" }}>
              BudgetUp
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
