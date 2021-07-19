import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import useInputs from "../../customHooks/useInputs";

const initStateLogin = {
    email: "",
    password: ""
};

const LoginRegister = ({ location }) => {
  const { pathname } = location;

    const [form, onChange] = useInputs(initStateLogin);
    console.log(form);
    return (
        <Fragment>
            {/*<MetaTags>*/}
            {/*  <title>Flone | Login</title>*/}
            {/*  <meta*/}
            {/*    name="description"*/}
            {/*    content="Compare page of flone react minimalist eCommerce template."*/}
            {/*  />*/}
            {/*</MetaTags>*/}
            {/*<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>*/}
            {/*<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>*/}
            {/*  Login Register*/}
            {/*</BreadcrumbsItem>*/}
            <LayoutOne headerTop="visible">
                {/*/!* breadcrumb *!/*/}
                {/*<Breadcrumb />*/}
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container defaultActiveKey="login">
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                <Nav.Link eventKey="login">
                                                    <h4>Login</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="register">
                                                    <h4>Register</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                placeholder="Username"
                                                                value={form.email}
                                                                onChange={onChange}
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={form.password}
                                                                onChange={onChange}
                                                            />
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    <input type="checkbox"/>
                                                                    <label className="ml-10">Remember me</label>
                                                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                                                        Forgot Password?
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    <button type="submit">
                                                                        <span>Login</span>
                                                                    </button>
                                                                    <button style={{marginLeft: "20px"}}>
                                                                        <span>Google</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <div className="button-box">
                                                                <input
                                                                    name="user-email"
                                                                    placeholder="Email"
                                                                    type="email"
                                                                    style={{width: "70%"}}
                                                                />
                                                                <button style={{marginLeft: "20px"}}>
                                                                    <span>인증</span>
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="password"
                                                                name="user-password"
                                                                placeholder="Password"
                                                            />
                                                            <input
                                                                type="passwordCheck"
                                                                name="user-passwordCheck"
                                                                placeholder="PasswordCheck"
                                                            />
                                                            <input
                                                                name="user-name"
                                                                placeholder="Name"
                                                                type="name"
                                                            />
                                                            <input
                                                                name="user-birth"
                                                                placeholder="Birth"
                                                                type="birth"
                                                            />
                                                            <input
                                                                name="user-phone"
                                                                placeholder="Phone"
                                                                type="phone"
                                                            />
                                                            <input
                                                                name="user-address"
                                                                placeholder="Address"
                                                                type="address"
                                                            />
                                                            <input
                                                                name="user-detailAddress"
                                                                placeholder="Detail Address"
                                                                type="DetailAddress"
                                                            />

                                                            <div className="button-box">
                                                                <button type="submit">
                                                                    <span>Register</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
