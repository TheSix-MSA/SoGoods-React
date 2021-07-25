import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import LayoutOne from "../layouts/header/LayoutOne";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import getFormatDate from "../../modules/getFormatDate";
import useInputs from "../../customHooks/useInputs";
import fundingService from "./fundingService";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import productUpdateService from "../funding-attach/update/productUpdateService";
import Button from "@material-ui/core/Button";
import {useToasts} from "react-toast-notifications";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ProductRegister from "../funding-attach/add/ProductRegister";
import Dialog from "@material-ui/core/Dialog";
import productService from "../funding-attach/add/productService";
import ProductUpdateRegister from "../funding-attach/update/ProductUpdateRegister";

const imgStyle = {
    display: 'block',
    width: 100,
    height: 50,
    float: 'left',
};

const inputStyle = {
    margin:"10px"
}
const textStyle = {
    margin:"0 10px"
}
const underInputStyle = {
    margin:"0 10px",
}

const btn ={
    float: 'none',
    margin:"10px"
}

const initFundingForm = {
    title:'',
    content:'',
    writer:'',
    email:'',
    dueDate:"",
    targetAmount:0,
    productDTOs:[]
}
const productDTOs = []

const FundingUpdate = () => {

   const info = useSelector(state=>state.login);

   let {fno} = useParams();


   const [fundingForm, changeFundingForm, setFundingForm] = useInputs({...initFundingForm});
   const [productForm, changeProductForm, setProductForm] = useInputs([...productDTOs]);

    const {addToast} = useToasts();
    const userInfo = useSelector(state=> state.login);
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const [flag, setFlag] = useState(false)


    productUpdateService.setOpenFn(setOpen)
    let productList = [];

    useEffect(()=>{

        fundingService.getOneFunding(fno).then(res=> {

            setFundingForm({...res.response.fundingDTO})
            setProductForm([...res.response.productDTOs])

            const fno = res.response.fundingDTO.fno
            const pnoList = res.response.productDTOs.map(dto => dto.pno)// [123, 124]
            console.log("Product DB에서 가져온 정보", res.response.productDTOs)

            productList = res.response.productDTOs.map(dto =>
                {
                    return{
                        text: {
                            name: dto.name,
                            des: dto.des,
                            price: dto.price,
                        },
                        mainIdx: 0,
                    }
                }
            )

            fundingService.getA3src('FUNDING', [fno])
                .then(res => {
                    //펀딩대표이미지
                    //res.data.response[0].fileName.split('_')[1]

                    fundingService.getA3srcList('PRODUCT', pnoList, [0,1])
                        .then(res=>{
                            console.log("Attach DB에서 가져온 정보", res.data.response)

                            productList = productList.map((product, idx) => {

                                let pictures = res.data.response[idx].map(picture=>{
                                    return {...picture, preview: picture.imgSrc, }
                                })

                                return {...product, pictures: pictures}
                            })
                            productUpdateService.setProductList(productList)
                            setFlag(!flag)
                        })

                })

        })
    },[fno])


    const sendFormData = async (e) => {
        e.preventDefault();
        console.log(fundingForm);
        const result = await fundingService.updateFunding(fno, {...fundingForm});
        console.log(result)
        history.push("/funding/list");
    }

    const list = productUpdateService.getProductList().map((product, i)=>{

        return (
            <>
                <li key={i}>
                    <p onClick={()=>{productUpdateService.openDialogForEdit(i)}}>
                        {product.text.name} :
                        {product.text.desc}
                    </p>
                    <div>
                        {product.pictures.map((file ,j)=>
                            <div>
                                <img key={j} data-idx={j}
                                     src={file.imgSrc}
                                     style={imgStyle}/>
                                <input type="radio"
                                       name={`mainIdx_${i}`}
                                      //checked={product.mainIdx == j?"checked":""}
                                       value={j}
                                       //onClick={(e)=>{setProductMainImage(e,i,j)}}
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
                                                            />
                                                            <input
                                                                readOnly
                                                                style={inputStyle}
                                                                type="hidden"
                                                                name="email"
                                                                value={fundingForm.email ||""}
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
                                                            <ul>
                                                                {list}
                                                            </ul>
                                                            <h5 style={textStyle}>상품수정</h5>
                                                            <Button style={btn} variant="outlined" color="primary" onClick={productUpdateService.openDialog}>
                                                                상품 추가
                                                            </Button>
                                                                <div style={{display:"flex"}}>
                                                                    <div style={{display:"flex" ,flexWrap:"wrap"}}>
                                                                        <h5 style={textStyle}>펀딩 만기일</h5>
                                                                        <input
                                                                            style={inputStyle}
                                                                            readOnly
                                                                            name="dueDate"
                                                                            value={fundingForm.dueDate ||""}
                                                                            type="text"
                                                                            onBlur={(e) => (e.currentTarget.type = "text")}
                                                                        />
                                                                    </div>
                                                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                                                        <h5 style={textStyle}>펀딩 목표금액</h5>
                                                                        <input
                                                                            style={inputStyle}
                                                                            readOnly
                                                                            name="targetAmount"
                                                                            value={fundingForm.targetAmount ||""}
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
                                                                            <form className={"searchform"}>
                                                                                <button className={"searchform__submit"}
                                                                                        onClick={sendFormData}
                                                                                        style={{height:"40px", position:"relative", margin:"10px", float:"right"}}> 수정
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
                                    onClose={productUpdateService.closeDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    maxWidth='lg'>
                                    <DialogTitle id="alert-dialog-title">{'상품 수정'}</DialogTitle>
                                    <DialogContent>
                                        <ProductUpdateRegister></ProductUpdateRegister>
                                    </DialogContent>
                                </Dialog>
                            </div>
    );
};

export default FundingUpdate;