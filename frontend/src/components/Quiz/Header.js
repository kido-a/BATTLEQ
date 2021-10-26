import React from "react";
// import "../../styles/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/" className="title">
        Battle-Q
      </Link>
      <hr className="divider" />
    </div>
  );
}
