import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";
import fundingService from "./fundingService";
import useInputs from "../../customHooks/useInputs";
import getFormatDate from "../../modules/getFormatDate";
import productService from "../funding-attach/add/productService";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ProductRegister from "../funding-attach/add/ProductRegister";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {useSelector, } from "react-redux";
import {useToasts} from "react-toast-notifications";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {ToastCenter, ToastInformation, ToastSuccessRegister, ToastWarning} from "../../modules/toastModule";

const borderStyle = {
    border: '3px solid #dcdddf',
    display: 'overflow',
    padding: '24px',
}

const inputStyle = {
    margin:"10px"
}

const radioBtnStyle = {
    width: "20px",
    margin: "6px",
}
const textStyle = {
    margin:"0 10px"
}
const imgStyle = {
    display: 'block',
    width: 160,
    height: 110,
    // float: 'left',
};

const btn ={
    clear: "both",
    margin:"10px"
}
const initState = {
    title:'',
    content:'',
    writer:'',
    email:'',
    dueDate:"",
    targetAmount:0,
    mainImage:"",
    productDTOs:[]
}

const FundingRegister = () => {

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
            ToastWarning(" 제목은 필수입력항목입니다.");
            return;
        } else if (form.content===""){
            ToastWarning("내용은 필수입력항목입니다.");
            return;
        } else if (!fundingMainFile) {
            ToastWarning("메인 이미지를 등록해주세요.");
            return;
        }else if (req.productDTOs.length === 0 || !req.productDTOs) {
            ToastWarning("최소 1개 이상의 제품을 등록해주세요.");
            return;
        } else if (!form.dueDate){
            ToastWarning("만기일은 필수입력항목입니다.");
            return;
        } else if (form.targetAmount===null || form.targetAmount === 0){
            ToastWarning("목표금액은 필수입력항목입니다.");
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
        productService.initProductList()

        ToastSuccessRegister("펀딩 승인까지 최소 2~3일이 소요될 수 있습니다.");

        if(result.data.success){
            history.push("/funding/list");
        }
    }

    const clickFile = () => {
        document.getElementById("file").click()
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
                       <b>상품명:</b> {product.text.name}
                    </p>

                    <div style={{width: "100%",
                                overflow: "hidden", display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr", marginTop:"20px" }}>
                        {product.pictures.map((file ,j)=>
                            <div style={{width: "30%", margin: 0}}>
                                <label>
                                    <img key={j} data-idx={j}
                                         src={file.preview||process.env.PUBLIC_URL+"/assets/img/default.png"}
                                         style={imgStyle}
                                    />
                                    <input type="radio"
                                           name={`mainIdx_${i}`}
                                           value={j}
                                           onClick={(e)=>{setProductMainImage(e,i,j)}}
                                           style={radioBtnStyle}/>
                                </label>

                            </div>
                        )}
                    </div>
                </li><br></br><br></br>
            </>
        )
    })

    const addFundingPicture = (e) => {

        const file = e.target.files[0];
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        })
        setFundingMainFile(e.target.files[0])
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
                                                            <h3>펀딩 등록</h3>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    </Nav>
                                                     {/*register funding*/}
                                                    <div style={textStyle}><h5><b>제목</b></h5></div>
                                                    <input
                                                        style={inputStyle}
                                                        type="title"
                                                        name="title"
                                                        value={form.title}
                                                        placeholder="제목"
                                                        onChange={changeForm}
                                                    />
                                                    <div style={textStyle}><b>내용</b></div>
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
                                                    <b>메인 이미지</b><br></br>
                                                    {fundingMainFile && <img width={"120px"} height={"120px"} src={fundingMainFile.preview}/> }

                                                    <Button style={btn} variant="outlined" color="primary" onClick={clickFile}>
                                                        {fundingMainFile? '메인 이미지 변경' : '메인 이미지 추가'}
                                                    </Button><br></br><br></br><br></br><br></br>
                                                    <input
                                                        id="file"
                                                        style={{display:"none"}}
                                                        type="file"
                                                        name="mainImage"
                                                        //onChange={(e)=>{setFundingMainFile(e.target.files[0])}}
                                                        onChange={(e)=>{addFundingPicture(e)}}
                                                    />

                                                    <h4><b>등록할 상품 목록</b></h4>

                                                    {list.length != 0 && <div style={borderStyle}>
                                                        <ul>
                                                            {list}
                                                        </ul>
                                                    </div>}


                                                    <Button style={btn} variant="outlined" color="primary" onClick={productService.openDialog}>
                                                        상품 등록
                                                    </Button>
                                                    <br></br><br></br>
                                                    <div style={{display:"flex"}}>
                                                        <div style={{display:"flex" ,flexWrap:"wrap"}}>
                                                            <h5 style={textStyle}><b>펀딩 만기일</b></h5>
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
                                                        <h5 style={textStyle}><b>펀딩 목표금액</b></h5>
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
                <DialogTitle id="alert-dialog-title">{'상품 등록'}</DialogTitle>
                <DialogContent>
                    <ProductRegister></ProductRegister>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FundingRegister;