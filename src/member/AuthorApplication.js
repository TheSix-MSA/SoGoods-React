import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../components/layouts/header/LayoutOne";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import useInputs from "../customHooks/useInputs";
import myAccountService from "./myAccountService";

const initState = {
    introduce:"",
    nickName: "",
    identificationUrl:""
}
const initNovel = {
    isbn:"",
    title:"",
    image:"",
    publisher:"",
    email:""
}

const AuthorApplication = () => {

    const history = useHistory();
    const {addToast} = useToasts();
    const [application, changeApplication, setApplication] = useInputs(initState);
    const [flag, setFlag] = useState(false);
    const info = useSelector(state=>state.login);
    const [novel, changeNovel ,setNovel] = useInputs({...initNovel,email:info.email});
    console.log(application);

    const clickFile = () => {
        document.getElementById("input-file").click();
    };

    const uploadFile = (e) =>{
        const file = e.target.files[0]
        const form = new FormData();
        form.append("files", file);
        form.append("tableName", "MEMBER");
        form.append("keyValue", info.email);

        myAccountService.registerIdentification(form).then(value => {
            console.log(value.data.response[0].imgSrc);
            setApplication({...application,imgSrc:value.data.response[0].imgSrc});
        });
    }

    const nextPage = (e) => {
        e.preventDefault();
        setFlag(!flag);
    };

    const searchISBN = () => {
        myAccountService.searchNovelList(initNovel.isbn).then((novel)=>{
            console.log(novel);
        });
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
                                            {flag === false ?
                                                <Tab.Pane eventKey="login">
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            <form>
                                                                <input
                                                                    type="text"
                                                                    name="nickName"
                                                                    placeholder="작가명 (필명)"
                                                                    value={application.nickName}
                                                                    onChange={changeApplication}
                                                                    autoFocus
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="introduce"
                                                                    placeholder="introduce"
                                                                    value={application.introduce}
                                                                    onChange={changeApplication}
                                                                />
                                                                <div style={{
                                                                    background: "#f2f2f2",
                                                                    padding: "50px",
                                                                    marginBottom: "30px"
                                                                }} onClick={clickFile}>
                                                                    {application.identificationUrl === "" ?
                                                                        <div style={{
                                                                            border: "5px dotted lightgray",
                                                                            padding: "30px",
                                                                            textAlign: "center",
                                                                            color: "lightgray",
                                                                            height: "150px",
                                                                            width: "400px"
                                                                        }}>
                                                                            <div>
                                                                                <p><strong>주민등록증</strong></p>
                                                                                <p>실명과 앞자리가 보이도록 올려주세요</p>
                                                                            </div>
                                                                        </div> :
                                                                        <div style={{
                                                                            border: "none",
                                                                            padding: "30px",
                                                                            textAlign: "center",
                                                                            color: "lightgray",
                                                                            height: "150px",
                                                                            width: "400px",
                                                                            backgroundImage: `url(${application.imgSrc})`,
                                                                            backgroundSize: "contain",
                                                                            backgroundRepeat: "no-repeat",
                                                                            backgroundPosition: "center"
                                                                        }}>
                                                                        </div>
                                                                    }
                                                                    <input type="file" name="file"
                                                                           style={{display: "none"}}
                                                                           onChange={uploadFile} id={"input-file"}/>
                                                                </div>
                                                                <div className="button-box">
                                                                    <div style={{textAlign: "right"}}>
                                                                        <button onClick={nextPage}>
                                                                            <span>Next</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </Tab.Pane> :
                                                <Tab.Pane eventKey="login">
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            <form>
                                                                <div style={{display:"flex"}} className="button-box">
                                                                    <input
                                                                        type="text"
                                                                        name="isbn"
                                                                        placeholder="ISBN (13자리)"
                                                                        value={novel.isbn}
                                                                        onChange={changeNovel}
                                                                        maxLength={13}
                                                                        minLength={13}
                                                                    />
                                                                    <button style={{height:"45px", background:"darkorange"}}>done</button>
                                                                </div>
                                                                <div style={{marginBottom:"15px", padding:"15px", border:"1px solid #ebebeb"}}>
                                                                    <div style={{display:"flex"}}>
                                                                        <div >
                                                                            <div style={{background:"lightgray", height:"125px", width:"85px"}}>

                                                                            </div>
                                                                        </div>
                                                                        <div style={{padding:"15px"}}>
                                                                            <p><strong>ISBN :</strong><span style={{marginLeft:"10px"}}></span></p>
                                                                            <p><strong>TITLE :</strong><span style={{marginLeft:"10px"}}></span></p>
                                                                            <p><strong>PUBLISHER :</strong><span style={{marginLeft:"10px"}}></span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="button-box">
                                                                    <div style={{textAlign: "right"}}>
                                                                        <button onClick={nextPage}>
                                                                            <span>Prev</span>
                                                                        </button>
                                                                        <button style={{background: "skyblue", marginLeft:"15px"}} onClick={searchISBN}>
                                                                            <span>Submit</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            }
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
