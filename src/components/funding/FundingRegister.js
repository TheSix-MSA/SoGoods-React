import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";
import fundingService from "./fundingService";
import useInputs from "../../customHooks/useInputs";
import getFormatDate from "../../modules/getFormatDate";
import productService from "../funding-attach/productService";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ProductRegister from "../funding-attach/ProductRegister";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {useSelector, } from "react-redux";
import {useToasts} from "react-toast-notifications";
import {useHistory} from "react-router-dom";

const inputStyle = {
    margin:"10px"
}
const textStyle = {
    margin:"0 10px"
}
const imgStyle = {
    display: 'block',
    width: 100,
    height: 50,
    float: 'left',
};

const btn ={
    float: 'none',
    margin:"10px"
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

    const {addToast} = useToasts();
    const [form, changeForm, setForm] = useInputs({...initState});
    const [fundingMainFile, setFundingMainFile] = useState(null);
    const userInfo = useSelector(state=> state.login);
    const [open, setOpen] = useState(false);

    const history = useHistory();

    productService.setOpenFn(setOpen)

    const productList = productService.getProductList()
    const productDTOs = productList.map(product=>{
        return product.text
    })

    const req = {...form, writer:userInfo.name, email:userInfo.email, productDTOs: productDTOs}

    // 입력 데이터 전송
    const sendFormData = async (e) => {
        e.preventDefault();

        // 데이터 유효성 검사
        if(form.title==""){
            addToast("제목은 필수입력항목입니다.", {appearance: 'warning', autoDismiss: true});
            return;
        } else if (form.content===""){
            addToast("내용은 필수입력항목입니다.", {appearance: 'warning', autoDismiss: true});
            return;
        } else if (!form.dueDate){
            addToast("만기일은 필수입력항목입니다.", {appearance: 'warning', autoDismiss: true});
            return;
        } else if(req.productDTOs.length === 0 || !req.productDTOs) {
            addToast("최소 1개 이상의 제품을 등록해주세요.", {appearance: 'warning', autoDismiss: true});
            return;
        } else if (form.targetAmount===null || form.targetAmount === 0){
            addToast("목표금액은 필수입력항목입니다.", {appearance: 'warning', autoDismiss: true});
            return;
        }

        // 펀딩 데이터 저장
        const result = await fundingService.registerFunding(req);
        const fno = result.data.response.fundingDTO.fno

        const productNums = result.data.response.productNums

        await fundingService.registerAttach([fundingMainFile], 'FUNDING', fno, 0);

        for (const num of productNums) {
            const idx = productNums.indexOf(num);
            const productList = productService.getProductList()
            await fundingService.registerAttach(productList[idx].pictures, 'PRODUCT', num, productList[idx].mainIdx);
        }

        setForm({...initState})

        if(result.data.success){
            history.push("/funding/list");
        }
    }



    const setProductMainImage = (e, productIdx, pictureIdx)=>{
        productService.getProductList()[productIdx].mainIdx = pictureIdx
    }

    const list = productService.getProductList().map((product, i)=>{

        product.pictures.map((file)=> Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))

        return (
            <>
                <li key={i}>
                    <p onClick={()=>{productService.openDialogForEdit(i)}}>
                        {product.text.name} :
                        {product.text.desc}
                    </p>
                    <div>
                        {product.pictures.map((file ,j)=>
                            <div>
                                <img key={j} data-idx={j}
                                     src={file.preview}
                                     style={imgStyle}/>
                                <input type="radio"
                                       name={`mainIdx_${i}`}
                                       value={j}
                                       onClick={(e)=>{setProductMainImage(e,i,j)}}
                                       style={{flaot: 'left'}}/>
                            </div>
                        )}

                    </div>
                </li>
            </>
        )
    })

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
                                                     {/*register funding*/}
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
                                                        onChange={(e)=>{setFundingMainFile(e.target.files[0])}}
                                                    />
                                                    <ul>
                                                        {list}
                                                    </ul>
                                                    <Button style={btn} variant="outlined" color="primary" onClick={productService.openDialog}>
                                                        상품 등록
                                                    </Button>
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
                                                        <form className={"searchform"}>
                                                            <button className={"searchform__submit"}
                                                                    onClick={sendFormData}
                                                                    style={{height:"40px", position:"relative", margin:"10px", float:"right"}}> 등록
                                                            </button>
                                                        </form>
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
            <Dialog
                open={open}
                onClose={productService.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'>
                <DialogTitle id="alert-dialog-title">{'상품 등록/수정'}</DialogTitle>
                <DialogContent>
                    <ProductRegister></ProductRegister>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FundingRegister;