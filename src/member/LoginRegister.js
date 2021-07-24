import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../components/layouts/header/LayoutOne";
import useInputs from "../customHooks/useInputs";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../redux/member/loginSlice";
import {useHistory} from "react-router-dom";
import instance from "../modules/axiosConfig";
import CodeDialogSlide from "./CodeDialog";
import codeService from "./codeService";
import FormCheckDialog from "./FormCheckDialog";
import {useToasts} from "react-toast-notifications";

const initStateLogin = {
    email: "",
    password: ""
};

const initStateSignUp = {
    email:"",
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

const warningName = {type:""};

const LoginRegister = () => {
    const location = useLocation();
    const history = useHistory();
    const {addToast} = useToasts();
    const info = useSelector(state=>state.login);
    const [loginForm, onChange] = useInputs(initStateLogin);
    const [signupForm, signupChange, setSignForm] = useInputs(initStateSignUp);
    const [verifyForm, setVerifyForm] = useState(initStateVerify);
    const [warningType, setWarningType] = useState(warningName);

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
        addToast(
            "✨😘어서오세요 Sogoods입니다! 😘😘😘✨", {appearance: 'info', autoDismiss: true},
        );
        history.push(location.state?location.state.from:"/");
    };

    /**
     * 회원가입버튼 클릭시 동작,
     * 세부기능 : 패스워드일치여부확인 , 인증여부확인, 항목입력값 존재여부 확인, 회원정보를 수집해 db에 저장.
     *
     * @param e
     * @returns {Promise<void>}
     */
    const signupBtn = async (e) => {
        e.preventDefault();

        if (signupForm.gender === "1" || signupForm.gender === "3") {
            signupForm.gender = "남자"
        }else{
            signupForm.geder = "여자";
        }

        if(signupForm.password !== signupForm.passwordCheck){
            setWarningType({...warningType,type:"same"});
            codeService.popUpWarningModal();
            return;
        }

        if(verifyForm.verify===false){
            setWarningType({...warningType,type:"인증"});
            codeService.popUpWarningModal();
            return;
        }

        for(let formObj in signupForm) {
            if (signupForm[formObj] === "") {
                setWarningType({...warningType,type:formObj});
                codeService.popUpWarningModal();
                return;
            }
        }

        const result = await instance({
            url: '/member/',
            method: 'POST',
            data: signupForm
        });
        addToast(
            "회원가입되셨습니다! 🎉", {appearance: 'info', autoDismiss: true},
        );
        history.push("/");
    };

    /**
     * 인증버튼 클릭시 인증이메일 발송.
     *
     * @param e
     * @returns {Promise<void>}
     */
    const verifyEmail = async (e) => {
        e.preventDefault();
        setVerifyForm({...verifyForm,verifyBtn: "1"})

        const result = await instance({
            url: '/member/login',
            method: 'PUT',
            data: signupForm
        });
        console.log("이메일인증코드", result);
        setVerifyForm({...verifyForm,verifyCode: result.data.response.code});
    };

    /**
     * 발송된 메일의 인증코드와 입력코드의 유효성 검사.
     *
     * @param e
     */
    const codeCheck = (e)=>{
        e.preventDefault();
        if(verifyForm.verifyCode === signupForm.code){
            verifyForm['verify'] = true;
            verifyForm['verifyBtn'] = "2";
            setVerifyForm({...verifyForm});
        }
    }

    /**
     *  kakao 주소찾기 api모달 호출
     */
    const popupPost = () => {
        codeService.popUpModal();
    };

    /**
     * 주소찾기 api값을 상태에 저장.
     *
     * @param address
     */
    const addAddress = (address) => {
        setSignForm({...signupForm,address:address});
    };

    /**
     * 비밀번호와 비밀번호확인의 일치여부 검사.
     *
     */
    const checkPassword = () => {
        if(signupForm.password !== signupForm.passwordCheck){
            setWarningType({...warningType,type:"same"});
            codeService.popUpWarningModal();
        }
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
                                                                type="email"
                                                                name="email"
                                                                placeholder="Username"
                                                                value={loginForm.email}
                                                                onChange={onChange}
                                                                autoFocus
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={loginForm.password}
                                                                onChange={onChange}
                                                                minLength={8}
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
                                                                minLength={8}
                                                            />
                                                            <input
                                                                type="password"
                                                                name="passwordCheck"
                                                                placeholder="PasswordCheck"
                                                                value={signupForm.passwordCheck}
                                                                onChange={signupChange}
                                                                onBlur={checkPassword}
                                                                minLength={8}
                                                            />
                                                            <input
                                                                name="name"
                                                                placeholder="Name"
                                                                type="name"
                                                                value={signupForm.name}
                                                                onChange={signupChange}
                                                            />
                                                            <div style={{display: "flex"}}>
                                                                <input
                                                                    name="birth"
                                                                    placeholder="Birth"
                                                                    type="birth"
                                                                    value={signupForm.birth}
                                                                    onChange={signupChange}
                                                                    style={{width: "45%"}}
                                                                    maxLength={6}
                                                                    minLength={6}
                                                                />
                                                                <span
                                                                    style={{width: "10%", textAlign: "center"}}>-</span>
                                                                <input
                                                                    name="gender"
                                                                    type="password"
                                                                    onChange={signupChange}
                                                                    style={{
                                                                        width: "10%",
                                                                        padding: "8px",
                                                                        fontSize: "50px"
                                                                    }}
                                                                    maxLength={1}
                                                                />
                                                                <input
                                                                    name="dummy"
                                                                    type="text"
                                                                    value="●●●●●●"
                                                                    style={{width: "35%", background: "gray"}}
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                            <input
                                                                name="phone"
                                                                placeholder="Phone"
                                                                type="phone"
                                                                value={signupForm.phone}
                                                                onChange={signupChange}
                                                                minLength={11}
                                                            />
                                                            <input
                                                                name="address"
                                                                placeholder="Address"
                                                                type="address"
                                                                value={signupForm.address}
                                                                onChange={signupChange}
                                                                onClick={popupPost}
                                                            />
                                                            <CodeDialogSlide addAddress={addAddress}/>
                                                            <input
                                                                name="detailAddress"
                                                                placeholder="Detail Address"
                                                                type="DetailAddress"
                                                                value={signupForm.detailAddress}
                                                                onChange={signupChange}
                                                            />
                                                            <div className="button-box">
                                                                <FormCheckDialog
                                                                    warningType={warningType}/>
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
