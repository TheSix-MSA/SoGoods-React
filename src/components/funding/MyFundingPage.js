import React, {Fragment, useCallback, useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";
import {useSelector} from "react-redux";
import {
    useHistory
} from "react-router-dom";
import fundingService from "./fundingService";

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

const MyFundingPage = ({productTabClass}) => {

    const history = useHistory();
    const userInfo = useSelector(state=> state.login);
    const [list, setList] = useState(initList);


    useEffect(()=> {
        fundingService.getMyFundingList(userInfo.email)
            .then(res1=>{
                let fnoList = res1.response.map(f=> f.fno)
                fundingService.getA3src('FUNDING', fnoList)
                    .then(res2=>{
                        res2.data.response.forEach((ele,i)=>{
                            res1.response[i].imgSrc = ele.thumbSrc
                        })
                        setList(res1.response);
                    })
            })
    }, [])



    // 읽기 페이지로 이동
    const readTodo = (fno) => {
        history.push("/funding/read/"+fno)
    }

    const listPage = list.map((li, idx)=>
            <div key={idx}>
                <h5>{li.fno}번 게시글</h5>
                {!li.success ?
                    <div>
                        <img alt={"이미지"} src={li.imgSrc||process.env.PUBLIC_URL+"/assets/img/default.png"} height={"230px"} width={"350px"} onClick={() => readTodo(li.fno)} style={{cursor: "pointer", objectFit:"cover"}}/>
                    </div>
                    :
                    <div style={{position:"relative", height:"230px", width:"350px"}}>
                        <img alt={"이미지"} src={li.imgSrc||process.env.PUBLIC_URL+"/assets/img/default.png"} style={{filter:"grayscale(100%)", objectFit:"cover", height:"230px", width:"350px"}}/>
                        <span style={{fontWeight:"bold", position:"absolute", transform:"translate(-70%, -50%)", top:"50%", left:"50%", pointerEvents:"none"}}>
                            <h3>종료된 펀딩입니다</h3>
                        </span>
                    </div>
                }
                <h5>펀딩 달성률 {Math.ceil(li.totalAmount/li.targetAmount*100)}%</h5>
                <h5>마감일자 : {li.dueDate}</h5>
                <h5>펀딩금액 : {li.totalAmount}</h5>
            </div>
        )

    return (
        <div>
            <Fragment>
                <MetaTags>
                    <title>SoGoods</title>
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
                        <div style={{marginTop:"30px"}}>
                            <h3>나의 펀딩</h3>
                        </div>
                    </Nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/*<div style={{float:"right"}}>*/}
                                {/*    /!* shop topbar default *!/*/}
                                {/*    <select name='type' style={{width:"100px",border:"1px solid #EEE"}} onChange={change}>*/}
                                {/*        <option value=''>전체</option>*/}
                                {/*        <option value='open'>진행중</option>*/}
                                {/*        <option value='close'>마감</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}
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

export default MyFundingPage;