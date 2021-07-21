import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../../layouts/LayoutOne";
import Nav from "react-bootstrap/Nav";
import fundingService from "./fundingService";
import useInputs from "../../customHooks/useInputs";
import getFormatDate from "../../modules/getFormatDate";


const initState = {
    title:'',
    content:'',
    writer:'',
    email:'',
    dueDate:"",
    targetAmount:0,
    productDTOs:[]
}

const FundingRegister = () => {

    const [form, changeForm, setForm] = useInputs({...initState});

    const sendFormData = async () => {
        console.log(form);
        const result = await fundingService.registerFunding({...form});
        console.log(result)
        setForm({...initState})
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
                                                        <input
                                                            type="title"
                                                            name="title"
                                                            value={form.title}
                                                            placeholder="제목"
                                                            onChange={changeForm}
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="writer"
                                                            value={form.writer}
                                                            placeholder="작성자"
                                                            onChange={changeForm}
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="email"
                                                            value={form.email}
                                                            placeholder="이메일"
                                                            onChange={changeForm}
                                                        />
                                                        <textarea
                                                            type="text"
                                                            name="content"
                                                            value={form.content}
                                                            placeholder="내용을 입력하세요."
                                                            onChange={changeForm}
                                                        />
                                                        메인 이미지
                                                        <input
                                                            type="file"
                                                            name="mainImage"
                                                            onChange={changeForm}
                                                        />
                                                        <button>상품등록</button>
                                                        <div style={{display:"flex"}}>
                                                        <input
                                                            name="dueDate"
                                                            placeholder="date"
                                                            value={form.dueDate}
                                                            type="date"
                                                            onChange={changeForm}
                                                            min={getFormatDate(new Date())}
                                                        />
                                                        <input
                                                            name="targetAmount"
                                                            value={form.targetAmount}
                                                            placeholder="목표금액"
                                                            type="text"
                                                            onChange={changeForm}
                                                            onInput={({ target }) => {
                                                                          target.value = target.value.replace(/[^0-9]/g, "");
                                                                          target.value = target.value.replace(/,/g, "");
                                                                        }}
                                                        />
                                                        </div>
                                                        <div className="button-box">
                                                            <button type="button" onClick={()=>sendFormData()}>
                                                                <span>펀딩 등록하기</span>
                                                            </button>
                                                        </div>
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