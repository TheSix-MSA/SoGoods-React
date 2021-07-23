import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import fundingService from "./fundingService";
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";

const initList = [{
    fno: 0,
    title: "",
    content: "",
    modDate: "",
    regDate: "",
    targetAmount: 0,
    totalAmount: 0,
    dueDate: "",
    email: "",
    success: false
}]

const MyFavFundingPage = ({productTabClass}) => {

    const history = useHistory();
    const userInfo = useSelector(state=> state.login);
    const email = "user80@bbb.com"
    const [list, setList] = useState(initList);

    useEffect(()=>{
        fundingService.getMyFavFundingList(email).then((res)=> {
            console.log(res.response)
            setList(res.response)
        })},[])

    // 읽기 페이지로 이동
    const readTodo = (fno) => {
        history.push("/funding/read/"+fno)
    }

    console.log(list.length < 1)
    const listPage = list.map((li, idx)=>
        !list ?
            <div>
                해당 게시글이 존재하지 않습니다.
            </div>
            :
            <div key={idx} onClick={() => readTodo(li.fno)} style={{cursor: "pointer"}}>
                <h5>{li.fno}번 게시글</h5>
                <img alt={"이미지"} src="https://i.imgur.com/WCySTkp.jpeg" height={"200px"}/>
                <h5>펀딩 달성률 {Math.ceil(li.totalAmount / li.targetAmount * 100)}%</h5>
                <h5>마감일자 : {li.dueDate}</h5>
                <h5>펀딩금액 : {li.totalAmount}</h5>
            </div>
    )

    return (
        <div>
            <Fragment>
                <MetaTags>
                    <title>Flone | Furniture Home</title>
                    <meta
                        name="description"
                        content="Furniture home of flone react minimalist eCommerce template."
                    />
                </MetaTags>
                <LayoutOne headerTop="visible">
                    <Nav
                        variant="pills"
                        className={`product-tab-list-6 justify-content-center mb-60 ${
                            productTabClass ? productTabClass : ""
                        }`}
                    >
                        <div>
                            <h3>찜한 펀딩</h3>
                        </div>
                    </Nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div style={{float:"right"}}>
                                </div>
                                <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr"}}>
                                    {listPage}
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutOne>
            </Fragment>

        </div>
    );

};

export default MyFavFundingPage;