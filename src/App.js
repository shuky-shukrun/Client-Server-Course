import "./App.css";
import Footer from "./components/Footer";
import CSNavbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { GlobalProvider } from "./contexts/GlobalState";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import CS404Page from "./pages/CS404Page";
import AboutUsPage from "./pages/about-us/about-us";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <CSNavbar />
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/AboutUs" element={<AboutUsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<CS404Page />} />
          </Routes>
          <Footer />
          {/* <ScrollUp /> */}
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
