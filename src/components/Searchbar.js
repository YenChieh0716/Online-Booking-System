import React from "react";
import { Link } from "react-router-dom";

function Searchbar() {
  return (
    <div className="ui right aligned category search item">
      <div className="ui transparent icon input">
        <input
          className="prompt"
          type="text"
          placeholder="search for books"
          size="30"
          maxLength="30"
        />
        <i as={Link} to="/searchResult" className="search link icon"  />
      </div>
      <div className="results" />
    </div>
  );
}

export default Searchbar;
