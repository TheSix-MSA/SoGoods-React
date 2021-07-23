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

    const [open, setOpen] = useState(false);

    productService.setOpenFn(setOpen)

    console.log(productService.getProductList())

    const sendFormData = async () => {
        productService.getProductList()
        const result = await fundingService.registerFunding({...form});
        const fno = result.response.fno

        const result_product= await

        setForm({...initState})
    }

    const list = productService.getProductList().map((product, i)=>{
        console.log(product)
        product.pictures.map((picture )=> Object.assign(picture, {
            preview: URL.createObjectURL(picture)
        }))
        return (
            <>
                <li key={i}>
                    <p onClick={()=>{productService.openDialogForEdit(i)}}>{product.text.name} : {product.text.desc}</p>
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
                                                        <ul>
                                                            {list}
                                                        </ul>
                                                        <Button style={btn} variant="outlined" color="primary" onClick={productService.openDialog}>
                                                            상품 등록
                                                        </Button>
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