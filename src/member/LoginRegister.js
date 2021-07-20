import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../layouts/LayoutOne";
import useInputs from "../customHooks/useInputs";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../redux/member/loginSlice";
import axios from "axios";
import {useHistory} from "react-router-dom";

const initStateLogin = {
    email: "",
    password: ""
};

const initStateSignUp = {
    email:"",
    code:"",
    password:"",
    passwordCheck:"",
    name:"",
    birth:"",
    gender:"남자",
    phone:"",
    address:"",
    detailAddress:""
}

const LoginRegister = ({ location }) => {
    const history = useHistory();
    const baseUrl = process.env.REACT_APP_API_DEV_URL;
    const {pathname} = location;
    const info = useSelector(state=>state.login);
    console.log("이아래는 useSelector");
    console.log(info);
    const [loginForm, onChange] = useInputs(initStateLogin);
    const [signupForm, signupChange] = useInputs(initStateSignUp);

    /**
     * 클릭시 axios로 로그인검증, 이후 LocalStorage에 저장.( email, roles, accessToken, RefreshToken )
     * @param e
     */
    const loginBtn = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/member/login`, loginForm).then(value =>
        {
            dispatch(signin(value.data.response));
            history.push("/");
        });
    };

    const signupBtn = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/member/`, signupForm).then(value => console.log(value));
        history.push("/login-register")
    };

    const dispatch = useDispatch();

    console.log(signupForm);
    return (
        <Fragment>
            <LayoutOne headerTop="visible">
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
                                                                value={loginForm.email}
                                                                onChange={onChange}
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={loginForm.password}
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
                                                                    <button onClick={loginBtn}>
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
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    type="email"
                                                                    style={{width: "70%"}}
                                                                    value={signupForm.email}
                                                                    onChange={signupChange}
                                                                />
                                                                <button style={{marginLeft: "20px"}}>
                                                                    <span>인증</span>
                                                                </button>
                                                            </div>
                                                            <div className="button-box">
                                                                <input
                                                                    name="code"
                                                                    placeholder="Verifying Code"
                                                                    type="code"
                                                                    style={{width: "70%"}}
                                                                    value={signupForm.code}
                                                                    onChange={signupChange}
                                                                />
                                                                <button style={{marginLeft: "20px"}}>
                                                                    <span>확인</span>
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={signupForm.password}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                type="passwordCheck"
                                                                name="passwordCheck"
                                                                placeholder="PasswordCheck"
                                                                value={signupForm.passwordCheck}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                name="name"
                                                                placeholder="Name"
                                                                type="name"
                                                                value={signupForm.name}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                name="birth"
                                                                placeholder="Birth"
                                                                type="birth"
                                                                value={signupForm.birth}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                name="phone"
                                                                placeholder="Phone"
                                                                type="phone"
                                                                value={signupForm.phone}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                name="address"
                                                                placeholder="Address"
                                                                type="address"
                                                                value={signupForm.address}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                name="detailAddress"
                                                                placeholder="Detail Address"
                                                                type="DetailAddress"
                                                                value={signupForm.detailAddress}
                                                                onChange={signupChange}
                                                            />
                                                            <div className="button-box">
                                                                <button onClick={signupBtn}>
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
