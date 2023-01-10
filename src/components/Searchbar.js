import React from "react";

function Searchbar() {
  return (
    <div className="ui right aligned category search item">
      <div className="ui transparent icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search animals..."
          size="30"
          maxLength="30"
        />
        <i className="search link icon" />
      </div>
      <div className="results" />
    </div>
  );
}

export default Searchbar;
