import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class Searchbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      query: ""
    }
  }

  handleChange(event) {
    this.props.onQuery(event.target.value);
    // console.log("(search bar)" + event.target.value);
  }

  render() {
    return (
      <div className="search-bar">
        <form >
          <label>
            <div className="ui transparent icon input">
              <input
                name="query"
                className="prompt"
                type="text"
                placeholder="search for books"
                size="30"
                maxLength="100"
                onChange={this.handleChange.bind(this)}
              />
              {/* <i className="search link icon"/> */}
            </div>
          </label>
        </form>
      </div>
    )
  }
}

// https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent

export default Searchbar;
