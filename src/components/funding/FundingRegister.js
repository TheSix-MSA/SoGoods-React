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

const imgStyle = {
    display: 'block',
    width: 100,
    height: 50,
};

const btn ={
    float: 'none',
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

    const [open, setOpen] = useState(false);

    productService.setOpenFn(setOpen)


    const productList = productService.getProductList()
    const productDTOs = productList.map(product=>{
        return product.text
    })
    const req = {...form, productDTOs: productDTOs, writer:userInfo.name, email:userInfo.email}

    const sendFormData = async () => {
         const result = await fundingService.registerFunding(req);


        await fundingService.registerAttach(productList[0], 'PRODUCT',123, 0 )

        // productList.reduce((prevP, product)=>{
        //     prevP.then(async res=>{
        //         await fundingService.registerAttach(product, 'PRODUCT',123, 0 )
        //     })
        // })


    }

    const list = productService.getProductList().map((product, i)=>{
        console.log(product)
        product.pictures.map((picture )=> Object.assign(picture, {
            preview: URL.createObjectURL(picture)
        }))
        return (
            <>
                <li key={i}>
                    <p onClick={()=>{productService.openDialogForEdit(i)}}>
                        {product.text.name} :
                        {product.text.desc}
                    </p>
                    <div>
                        {product.pictures.map((picture ,j)=>
                            <img key={j} src={picture.preview} style={imgStyle}/>)}
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
                                                                type="number"
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