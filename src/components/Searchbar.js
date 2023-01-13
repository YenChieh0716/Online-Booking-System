import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
  };

  return (
    <div className="ui right aligned category search item">
      <form onSubmit={handleSubmit}>
        <label>
          <div className="ui transparent icon input">
            <input
              name="query"
              className="prompt"
              type="text"
              placeholder="search for books"
              size="30"
              maxLength="30"

            />
            <i as={Link} to="/searchResult" className="search link icon" />
          </div>
        </label>
      </form>
      <div className="results" />
      <h2>{searchParams.get('query')}</h2>
    </div>
    );
}

export default Searchbar;
