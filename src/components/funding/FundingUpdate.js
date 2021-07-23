import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import LayoutOne from "../layouts/header/LayoutOne";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import getFormatDate from "../../modules/getFormatDate";
import useInputs from "../../customHooks/useInputs";
import fundingService from "./fundingService";
import {useHistory, useLocation, useParams} from "react-router-dom";
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

const initFundingForm = {
    title:'',
    content:'',
    writer:'',
    email:'',
    dueDate:"",
    targetAmount:0
}

const productDTOs = []

const FundingUpdate = () => {
   const info = useSelector(state=>state.login);
   const history = useHistory();
   let {fno} = useParams();
   const [fundingForm, changeFundingForm, setFundingForm] = useInputs({...initFundingForm});
   const [productForm, changeProductForm, setProductForm] = useInputs(productDTOs);

   // const contentRef = useRef();
   // const refArray = useMemo(
   //     ()=>[
   //         contentRef
   // ]
   // ,[])

    useEffect(()=>{
        fundingService.getOneFunding(fno).then(res=> {
            console.log(res.response)
            setFundingForm({...res.response.fundingDTO})
            setProductForm([...res.response.productDTOs])
        })
    },[fno])

    console.log(fundingForm);

    const sendFormData = async () => {
        console.log(fundingForm);
        const result = await fundingService.updateFunding(fno, {...fundingForm});
        console.log(result)
        history.push("/funding/list");
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
                                                                <h4>펀딩 수정</h4>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                    <div style={textStyle}>제목</div>
                                                    <input
                                                        style={inputStyle}
                                                        type="title"
                                                        name="title"
                                                        value={fundingForm.title||""}
                                                        onChange={changeFundingForm}
                                                    />
                                                    <div style={textStyle}>내용</div>
                                                    <input
                                                        readOnly
                                                        style={inputStyle}
                                                        type="hidden"
                                                        name="writer"
                                                        value={fundingForm.writer||""}
                                                        onChange={changeFundingForm}
                                                    />
                                                    <input
                                                        readOnly
                                                        style={inputStyle}
                                                        type="hidden"
                                                        name="email"
                                                        value={fundingForm.email ||""}
                                                        onChange={changeFundingForm}
                                                    />
                                                    <textarea
                                                        style={inputStyle}
                                                        type="text"
                                                        name="content"
                                                        value={fundingForm.content ||""}
                                                        onChange={changeFundingForm}
                                                    />
                                                    <h5 style={textStyle}>메인 이미지</h5>
                                                    <input
                                                        style={inputStyle}
                                                        type="file"
                                                        name="mainImage"
                                                        onChange={changeFundingForm}
                                                    />
                                                    <h5 style={textStyle}>상품등록</h5>
                                                        <img src={""} alt={"상품 추가 아이콘"}/>
                                                    <div style={{display:"flex"}}>
                                                    <div style={{display:"flex" ,flexWrap:"wrap"}}>
                                                    <h5 style={textStyle}>펀딩 만기일</h5>
                                                    <input
                                                        style={inputStyle}
                                                        readOnly
                                                        name="dueDate"
                                                        //placeholder={form.fundingDTO.dueDate}
                                                        value={fundingForm.dueDate ||""}
                                                        type="text"
                                                        onChange={changeFundingForm}
                                                        onBlur={(e) => (e.currentTarget.type = "text")}
                                                        min={getFormatDate(new Date())}
                                                    />
                                                    </div>
                                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                                    <h5 style={textStyle}>펀딩 목표금액</h5>
                                                    <input
                                                        style={inputStyle}
                                                        readOnly
                                                        name="targetAmount"
                                                        value={fundingForm.targetAmount ||""}
                                                        //placeholder={form.fundingDTO.targetAmount}
                                                        type="text"
                                                        onChange={changeFundingForm}
                                                        onInput={({ target }) => {
                                                            target.value = target.value.replace(/[^0-9]/g, "");
                                                            target.value = target.value.replace(/,/g, "");
                                                        }}
                                                    />
                                                    </div>
                                                    </div>
                                                    <div className="button-box">
                                                        <button type="button"
                                                                onClick={()=>sendFormData()}
                                                                style={inputStyle}>
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

export default FundingUpdate;