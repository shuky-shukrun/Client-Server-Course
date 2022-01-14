import { GlobalContext } from "../contexts/GlobalState";
import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../contexts/ClientDBOperations";

const ForgotPassword = () => {
  const { addUser, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  //user login details
  const userEmail = useRef("");
  const [emailError, setEmailError] = useState("");
  const [forgotPassTitle, setForgotPassTitle] = useState("Forgot Password");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    let loggedIn = false;
    if (localStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(localStorage.getItem("user")));
      loggedIn = true;
    }
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
      loggedIn = true;
    }
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // login function
  async function handleForgotPassword(e) {
    e.preventDefault();
    setEmailError("");
    if (!validateEmail(userEmail.current.value)) {
      setEmailError("Invalid email");
    }

    setBtnDisabled(true);
    const { status, message } = await forgotPassword(userEmail.current.value);
    if (status === 200) {
      setForgotPassTitle("Check your email");
    } else if (status === 404) {
      setEmailError(message);
    } else {
      setEmailError(`Error on server: ${message}`);
    }
    setBtnDisabled(false);
  }

  return (
    <div>
      <div className="login-container">
        <div className="forms-container">
          <div className="signin-signup">
            {/*Sign in form*/}
            <form action="#" className="form-section sign-in-form">
              <div className=""></div>
              <h2 className="title">{forgotPassTitle}</h2>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="Email"
                  ref={userEmail}
                  required
                  id="signInEmail"
                />
              </div>
              <button
                className="btn btn-basic solid"
                id="signInButton"
                onClick={(e) => handleForgotPassword(e)}
              >
                {btnDisabled ? "Wait..." : "Recover"}
              </button>
              <p className="social-text">{emailError}</p>
              <Link className="nav-link" to="/Login" id="login">
                Back to Login Page
              </Link>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Forgot Your Password?</h3>
              <p>
                No worries! <br></br>
                Just fill your email and we will send a new password to your
                email.
              </p>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
