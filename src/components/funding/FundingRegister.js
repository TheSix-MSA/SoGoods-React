import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../../layouts/LayoutOne";
import Nav from "react-bootstrap/Nav";
import fundingService from "./fundingService";
import useInputs from "../../customHooks/useInputs";


const initState = {
    title:'',
    content:'',
    writer:'',
    email:'',
    dueDate:null,
    targetAmount:0,
    productDTOs:[]
}

const FundingRegister = () => {

    const form = useInputs(initState)
    console.log(form)

    const sendFormData = async () => {
        const result = await fundingService.registerFunding({...form}).then(res=>{
            console.log(res.response)
        })
    }

    return (
        <div>
            <Fragment>
                <LayoutOne headerTop="visible">
                    <div className="login-register-area pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                    <div className="login-register-wrapper">
                                        <Tab.Pane eventKey="register">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    <Nav variant="pills" className="login-register-tab-list">
                                                    <Nav.Item>
                                                        <Nav.Link>
                                                            <h4>펀딩 등록</h4>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    </Nav>
                                                    <form>
                                                        <input
                                                            type="title"
                                                            name="funding-title"
                                                            value={form.title}
                                                            placeholder="제목"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="writer"
                                                            value={form.writer}
                                                            placeholder="작성자"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="email"
                                                            placeholder="이메일"
                                                        />
                                                        <textarea
                                                            name="content"
                                                            placeholder="내용을 입력하세요."
                                                        />
                                                        <button>상품등록</button>
                                                        <div style={{display:"flex"}}>
                                                        <input
                                                            name="dueDate"
                                                            placeholder="date"
                                                            type="date"
                                                        />
                                                        <input
                                                            name="targetAmount"
                                                            placeholder="목표금액"
                                                            type="text"
                                                        />
                                                        </div>
                                                        <div className="button-box">
                                                            <button type="submit" onClick={sendFormData}>
                                                                <span>펀딩 등록하기</span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutOne>
            </Fragment>
        </div>
    );
};

export default FundingRegister;