import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../components/layouts/header/LayoutOne";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";



const AuthorApplication = () => {

    const history = useHistory();
    const {addToast} = useToasts();
    const info = useSelector(state=>state.login);

    const clickFile = () => {
        document.getElementById("input-file").click();
    };

    return (
        <Fragment>
            <div>
            </div>
            <LayoutOne headerTop="visible">
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container defaultActiveKey="login">
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                    <h3>Author Application</h3>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="nickName"
                                                                placeholder="작가명 (필명)"
                                                                autoFocus
                                                            />
                                                            <input
                                                                type="text"
                                                                name="introduce"
                                                                placeholder="introduce"
                                                                minLength={8}
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                minLength={8}
                                                            />
                                                            <div className="button-box" htmlFor="input-file">
                                                                <button onClick={clickFile}>file</button>
                                                                <input type="file" style={{display:"none"}} id={"input-file"}/>
                                                            </div>
                                                            <div className="button-box">
                                                                <div>
                                                                    <button>
                                                                        <span>Submit</span>
                                                                    </button>
                                                                </div>
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

AuthorApplication.propTypes = {
    location: PropTypes.object
};

export default AuthorApplication;
