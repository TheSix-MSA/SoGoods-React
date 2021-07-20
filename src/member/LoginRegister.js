import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../layouts/LayoutOne";
import useInputs from "../customHooks/useInputs";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../redux/member/loginSlice";
import {useHistory} from "react-router-dom";
import instance from "../modules/axiosConfig";
import Postcode from "./Postcode";

const initStateLogin = {
    email: "",
    password: ""
};

const initStateSignUp = {
    email:"",
    password:"",
    passwordCheck:"",
    name:"",
    birth:"",
    gender:"남자",
    phone:"",
    address:"",
    detailAddress:"",
    code:"",

}

const initStateVerify = {
    verifyBtn:"0", //0:클릭하지않음 , 1: 재전송, 2: 승인완료(disable)
    verifyCode:"",
    verify:false
}

const LoginRegister = ({ location }) => {
    const history = useHistory();
    const baseUrl = process.env.REACT_APP_API_DEV_URL;
    const {pathname} = location;
    const info = useSelector(state=>state.login);
    const [loginForm, onChange] = useInputs(initStateLogin);
    const [signupForm, signupChange] = useInputs(initStateSignUp);
    const [verifyForm, setVerifyForm] = useState(initStateVerify);
    const [postFlag, setPostFlag] = useState(false);

    /**
     * 클릭시 axios로 로그인검증, 이후 LocalStorage에 저장.( email, roles, accessToken, RefreshToken )
     * @param e
     */
    const loginBtn = async (e) => {
        e.preventDefault();

        const result = await instance({
            url: '/member/login',
            method: 'POST',
            data: loginForm
        });

        dispatch(signin(result.data.response));
        history.push("/");

    };

    const signupBtn = async (e) => {

        const result = await instance({
            url: '/member/',
            method: 'POST',
            data: signupForm
        });
        result();
        history.push("/login-register");

    };

    const verifyEmail = async (e) => {
        e.preventDefault();

        const result = await instance({
            url: '/member/login',
            method: 'PUT',
            data: signupForm
        });

        console.log(result);

        verifyForm['verifyCode'] = result.data.response.code;
        console.log(signupForm);
        verifyForm['verifyBtn'] = '1';
        setVerifyForm({...verifyForm});
    };

    const codeCheck = (e)=>{
        e.preventDefault();
        if(verifyForm.verifyCode === signupForm.code){
            verifyForm['verify'] = true;
            verifyForm['verifyBtn'] = "2";
            console.log(verifyForm);
            setVerifyForm({...verifyForm});
        }
    }

    const popupPost = () => {
        setPostFlag(!postFlag);
    };

    const addAddress = (address) => {
        signupForm.address = address;
        console.log(signupForm);
        signupChange({...signupForm});
    };



    const dispatch = useDispatch();

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
                                                                {verifyForm.verify === false ?
                                                                    <input
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        type="email"
                                                                        style={{width: "70%"}}
                                                                        value={signupForm.email}
                                                                        onChange={signupChange}
                                                                    /> :
                                                                    <input
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        type="email"
                                                                        style={{width: "70%", background: "lightblue"}}
                                                                        value={signupForm.email}
                                                                        disabled={true}
                                                                    />
                                                                }
                                                                {verifyForm.verifyBtn === "0" ?
                                                                    <button style={{marginLeft: "10px"}}
                                                                            onClick={verifyEmail}>
                                                                        <span>인증</span>
                                                                    </button> :
                                                                    verifyForm.verifyBtn === "1" ?
                                                                        <button style={{marginLeft: "10px"}}
                                                                                onClick={verifyEmail}>
                                                                            <span>재전송</span>
                                                                        </button> :
                                                                        <button style={{marginLeft: "10px"}}
                                                                                disabled={true}>
                                                                            <span>인증완료</span>
                                                                        </button>
                                                                }
                                                            </div>
                                                            <div className="button-box">
                                                                {verifyForm.verify === false ?
                                                                    <input
                                                                        name="code"
                                                                        placeholder="Verifying Code"
                                                                        type="code"
                                                                        style={{width: "70%"}}
                                                                        value={signupForm.code}
                                                                        onChange={signupChange}
                                                                    /> :
                                                                    <input
                                                                        name="code"
                                                                        placeholder="Verifying Code"
                                                                        type="code"
                                                                        style={{width: "70%", background: "lightblue"}}
                                                                        value={signupForm.code}
                                                                        disabled={true}
                                                                    />
                                                                }
                                                                {verifyForm.verify === false ?
                                                                    <button style={{marginLeft: "10px"}}
                                                                            onClick={codeCheck}>
                                                                        <span>확인</span>
                                                                    </button> :
                                                                    <button style={{marginLeft: "10px"}}
                                                                            disabled={true}>
                                                                        <span>인증완료</span>
                                                                    </button>
                                                                }
                                                            </div>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={signupForm.password}
                                                                onChange={signupChange}
                                                            />
                                                            <input
                                                                type="password"
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
                                                                onClick={popupPost}
                                                            />
                                                            {postFlag?<Postcode addAddress={addAddress}></Postcode>:null}
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
