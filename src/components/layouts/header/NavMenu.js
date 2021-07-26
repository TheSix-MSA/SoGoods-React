import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/funding/list"}>
              Funding
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/board/free/list"}>
              Chit Chat
              {sidebarMenu ? (
                  <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                  <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">

              <li>
                <Link to={"/board/free/list"}>
                  자유게시판
                </Link>
              </li>
              <li>
                <Link to={"/board/novelist/list"}>
                  작가게시판
                </Link>
              </li>
              <li>
                <Link to={"/board/notice/list"}>
                  공지사항
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/my-account"}>
              {strings["my_account"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {strings["login_register"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {strings["my_account"]}
                </Link>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
