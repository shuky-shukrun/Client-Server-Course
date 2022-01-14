const Header = ({ title, body }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-xxl-5 col-xl-6 col-lg-7">
        <div className="header-title text-center">
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
