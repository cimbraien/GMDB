import React from "react";
import logo from "./GMDB-Logo.png";
import "../../styles/Logo.css";

const LogoProjectTitle = () => {
  return (
    <div>
      <img className="gmdblogo" src={logo} alt="" width="100" />
    </div>
  );
};

export default LogoProjectTitle;
