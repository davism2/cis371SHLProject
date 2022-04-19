import React from "react";
import "../App.css";
import logo from "../shlLogo.png";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <img src={logo} className="sidebarLogo" alt="SHL Logo" />
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="sidebarRow"
                // id={window.location.}
                onClick={() => {
                  window.location.pathname = val.path;
                }}
              >
                <div>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
