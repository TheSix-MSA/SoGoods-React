import React, {Fragment, useEffect, useState} from 'react';
import LayoutOne from "../layouts/header/LayoutOne";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import getFormatDate from "../../modules/getFormatDate";
import useInputs from "../../customHooks/useInputs";
import fundingService from "./fundingService";
import {useParams} from "react-router-dom";
import codeService from "../../member/codeService";
import FormCheckDialog from "../../member/FormCheckDialog";


const initState = {
    fundingDTO:{},
    productDTOs:[],
    favoriteCount:0
}

const warningName = {type:""};

const FundingUpdate = () => {

    let {fno} = useParams()
    const [form, changeForm, setForm] = useInputs({...initState});
    const [funding, setFunding] = useState(initState)
    const [warningType, setWarningType] = useState(warningName);

    useEffect(()=>{
        fundingService.getOneFunding(fno).then(res=> {
            console.log(res.response)
            setFunding(res.response)
        })
    },[])

    const sendFormData = async () => {
        console.log(form);
        const result = await fundingService.updateFunding(fno, {...form});
        console.log(result)
        setForm({...initState})
    }

        if(form.title === ''){
            setWarningType({...warningType,type:"empty"})
            codeService.popUpWarningModal();
            return;
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
                                                    <input
                                                        required
                                                        type="title"
                                                        name="title"
                                                        value={form.title}
                                                        placeholder={funding.fundingDTO.title}
                                                        onChange={changeForm}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="writer"
                                                        value={form.writer}
                                                        placeholder={funding.fundingDTO.writer}
                                                        onChange={changeForm}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="email"
                                                        value={form.email}
                                                        placeholder={funding.fundingDTO.email}
                                                        onChange={changeForm}
                                                    />
                                                    <textarea
                                                        required
                                                        type="text"
                                                        name="content"
                                                        value={form.content}
                                                        placeholder={funding.fundingDTO.content}
                                                        onChange={changeForm}
                                                    />
                                                    메인 이미지
                                                    <input
                                                        type="file"
                                                        name="mainImage"
                                                        onChange={changeForm}
                                                        required
                                                    />
                                                    <button>상품등록</button>
                                                    <div style={{display:"flex"}}>
                                                        <input
                                                            readOnly
                                                            name="dueDate"
                                                            placeholder={funding.fundingDTO.dueDate}
                                                            value={form.dueDate}
                                                            type="text"
                                                            onChange={changeForm}
                                                            onBlur={(e) => (e.currentTarget.type = "text")}
                                                            min={getFormatDate(new Date())}
                                                        />
                                                        <input
                                                            readOnly
                                                            name="targetAmount"
                                                            value={form.targetAmount}
                                                            placeholder={funding.fundingDTO.targetAmount}
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

export default FundingUpdate;