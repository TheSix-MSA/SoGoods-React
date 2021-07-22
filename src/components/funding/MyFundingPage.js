import React, {Fragment, useCallback, useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
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
    const email = "user00@bbb.com"
    const [list, setList] = useState(initList);
    const [type, setType] = useState({});

    useEffect(()=>{
         fundingService.getMyFundingList(email).then((res)=> {
             console.log(res.response)
             setList(res.response)
         })},[])

    // 읽기 페이지로 이동
    const readTodo = (fno) => {
        history.push("/funding/read/"+fno)
    }

    const change = (e) => {
        type[e.target.name] = e.target.value;
        setType({...type});
        console.log(type)
    }

    const sortCloseData = (data) => {
        return data.success === false
    }
    const sortOpenData = (data) => {
        return data.success === true
    }

    const close = list.filter(sortCloseData);
    const open = list.filter(sortOpenData);

    const listPage = (list) => {
        return list.map((li, idx)=>
            <div key={idx} onClick={()=> readTodo(li.fno)} style={{cursor:"pointer"}}>
                <h5>{li.fno}번 게시글</h5>
                <img alt={"이미지"} src="https://i.imgur.com/WCySTkp.jpeg" height={"200px"}/>
                <h5>펀딩 달성률 {Math.ceil(li.totalAmount/li.targetAmount*100)}%</h5>
                <h5>마감일자 : {li.dueDate}</h5>
                <h5>펀딩금액 : {li.totalAmount}</h5>
            </div>
        )}

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
                            <h3>나의 펀딩</h3>
                        </div>
                    </Nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div style={{float:"right"}}>
                                    {/* shop topbar default */}
                                    <select name='type' style={{width:"100px",border:"1px solid #EEE"}} onChange={change}>
                                        <option value=''>전체</option>
                                        <option value='open'>진행중</option>
                                        <option value='close'>마감</option>
                                    </select>
                                </div>
                                <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr"}}>
                                    {type==='open'?listPage(open):listPage(close)}
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