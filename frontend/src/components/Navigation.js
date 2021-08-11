import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  button,
  ButtonToolbar,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function Navigation() {
  return (
    <div className="Home_btn header_width nav">
      <ButtonToolbar>
        <button className="nav_btn">
          <Link to="/">Home</Link>
        </button>

        <button className="nav_btn">
          <Link to="/login">로그인</Link>
        </button>
        <button className="nav_btn">
          <Link to="/loginForm">회원가입</Link>
        </button>
      </ButtonToolbar>
    </div>
  );
}
/* Link 속성은 페이지를 전환시켜주는 역할을 하며 to 속성값으로 이동할 주소를 나타낼 수 있음.
<Link path="/url">이름</Link>

 */

export default Navigation;
