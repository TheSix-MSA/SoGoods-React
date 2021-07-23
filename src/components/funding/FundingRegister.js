import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";
import fundingService from "./fundingService";
import useInputs from "../../customHooks/useInputs";
import getFormatDate from "../../modules/getFormatDate";
import {useSelector} from "react-redux";

const inputStyle = {
    margin:"10px"
}
const textStyle = {
    margin:"0 10px"
}
const underInputStyle = {
    margin:"0 10px",
}


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
    const userInfo = useSelector(state=> state.login);

    const sendFormData = async () => {
        console.log(form);
        const result = await fundingService.registerFunding({...form, writer:userInfo.name, email:userInfo.email});
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
                                                        <div style={textStyle}>제목</div>
                                                        <input
                                                            style={inputStyle}
                                                            type="title"
                                                            name="title"
                                                            value={form.title}
                                                            placeholder="제목"
                                                            onChange={changeForm}
                                                        />
                                                        <div style={textStyle}>내용</div>
                                                        <input
                                                            type="hidden"
                                                            name="writer"
                                                            value={form.name}
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
                                                            style={inputStyle}
                                                            type="text"
                                                            name="content"
                                                            value={form.content}
                                                            placeholder="내용을 입력하세요."
                                                            onChange={changeForm}
                                                        />
                                                         <h5 style={textStyle}>메인 이미지</h5>
                                                        <input
                                                            style={inputStyle}
                                                            type="file"
                                                            name="mainImage"
                                                            onChange={changeForm}
                                                        />
                                                        <h5 style={textStyle}>상품등록</h5>
                                                            <img src={""} alt={"상품 추가 아이콘"}/>
                                                                <div style={{display:"flex"}}>
                                                                    <div style={{display:"flex" ,flexWrap:"wrap"}}>
                                                                        <h5 style={textStyle}>펀딩 만기일</h5>
                                                                        <input
                                                                            style={inputStyle}
                                                                            name="dueDate"
                                                                            placeholder="date"
                                                                            value={form.dueDate}
                                                                            type="date"
                                                                            onChange={changeForm}
                                                                            min={getFormatDate(new Date())}
                                                                        />
                                                                    </div>
                                                        <div style={{display:"flex", flexWrap:"wrap"}}>
                                                        <h5 style={textStyle}>펀딩 목표금액</h5>
                                                        <input
                                                            style={inputStyle}
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
                                                        </div>
                                                        <div className="button-box">
                                                            <button type="button" onClick={()=>sendFormData()} style={inputStyle}>
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