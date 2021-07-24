import PropTypes from "prop-types";
import React from "react";
import {Link, useHistory} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {signout} from "../../../redux/member/loginSlice";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass
}) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const history = useHistory();

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const dispatch = useDispatch();


  const login = useSelector(state => state.login);

  const logout = () => {
    dispatch(signout());
    history.push("/");
  };


  return (
      <div
          className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
      >
        <div className="same-style account-setting d-none d-lg-block">
          <button
              className="account-setting-active"
              onClick={e => handleClick(e)}
          >
            <i className="pe-7s-user-female"/>
          </button>
          <div className="account-dropdown">
            <ul>
              {login.email === "" ?
                  (<>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/login-register"}>
                        Register
                      </Link>
                    </li>
                  </>) :
                  (<>
                    <li>
                      <Link onClick={() => logout()}>Logout</Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/my-account"}>
                      my account
                      </Link>
                    </li>
                  </>)
              }
              {login.email !== "" && (
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/admin"}>
                      admin
                    </Link>
                  </li>
              )}
            </ul>
          </div>
        </div>
        <div className="same-style mobile-off-canvas d-block d-lg-none">
          <button
              className="account-setting-active"
              onClick={e => handleClick(e)}
          >
            <i className="pe-7s-user-female"/>
          </button>
          <div className="account-dropdown">
            <ul>
              {login.email === "" ?
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
                  </li> :
                  <li>
                    <Link onClick={() => logout()}>Logout</Link>
                  </li>
              }
              {login.email === "" ?
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>
                      Register
                    </Link>
                  </li> :
                  null
              }
              {login.email === "" ?
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>
                      my account
                    </Link>
                  </li> :
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/my-account"}>
                      my account
                    </Link>
                  </li>
              }
              {login.email === "" ?
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/admin"}>
                      admin
                    </Link>
                  </li> :
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/admin"}>
                      admin
                    </Link>
                  </li>
              }
            </ul>
          </div>
          <button
              className="mobile-aside-button"
              onClick={() => triggerMobileMenu()}
          >
            <i className="pe-7s-menu"/>
          </button>
        </div>
      </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};
export default connect()(IconGroup);
