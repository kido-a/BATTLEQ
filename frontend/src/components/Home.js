import React from "react";
import PropTypes from "prop-types"; // eslint-disable-line no-unused-vars

import { current } from "immer"; // eslint-disable-line no-unused-vars

class Home extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
          <div className="Home_menu header_width">메뉴</div>
          <div className="Home_title header_width">
            <span>Battle-Q</span>{" "}
          </div>
          <div className="header_width"></div>
        </header>
      </div>
    );
  }
}

export default Home;
