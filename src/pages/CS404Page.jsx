import { Link, useNavigate } from "react-router-dom";

const CS404Page = () => {
  const navigate = useNavigate();

  return (
    <div id="notfound">
      <div className="notfound">
        <div>
          <div className="notfound-404">
            <h1>!</h1>
          </div>
          <h2>
            Error
            <br />
            404
          </h2>
        </div>
        <p>
          The page you are looking for might have been removed, had its name
          changed, temporarily unavailable, or never exist. This is not a game,
          <Link to="/">{` GO HOME!`}</Link>
        </p>
      </div>
    </div>
  );
};

export default CS404Page;
