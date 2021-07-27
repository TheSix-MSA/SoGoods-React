import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import fundingService from "./fundingService";
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
    const [list, setList] = useState(initList);

    useEffect(()=> {
        fundingService.getMyFavFundingList(userInfo.email)
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

    const listPage = list.map((li, idx) =>
        !list ?
            <div>
                <h4>찜한 내역이 존재하지 않습니다.</h4>
            </div>
            :
            <div key={idx} style={{display:"flex", justifyContent:"center", padding:"15px", border:"1px solid rgba(0, 0, 0, 0.125)"}}>
                <div>
                    {!li.success ?
                        <div style={{marginBottom:"10px"}}>
                            <img alt={"이미지"} src={li.imgSrc || process.env.PUBLIC_URL + "/assets/img/default.png"}
                                  onClick={() => readTodo(li.fno)}
                                 style={{cursor: "pointer",width:"150px", height:"150px" , objectFit: "cover"}}/>
                        </div>
                        :
                        <div style={{marginBottom:"10px" ,width:"150px", height:"150px", backgroundImage:`url(${li.imgSrc || process.env.PUBLIC_URL + "/assets/img/default.png"})`
                            , display:"flex", justifyContent:"center", alignItems:"center", filter: "grayscale(100%)"}}>
                            <p style={{fontWeight:"bold", color:"red"}}>완료된 펀딩입니다</p>
                        </div>
                    }
                    <h5 style={{margin:0}}>펀딩 달성률 {Math.ceil(li.totalAmount / li.targetAmount * 100)}%</h5>
                    <h5 style={{margin:0}}>마감일자 : {li.dueDate}</h5>
                    <h5 style={{margin:0}}>펀딩금액 : {li.totalAmount}</h5>
                </div>
            </div>
    );

    return (
        <div>
            <Fragment>
                    <Nav
                        variant="pills"
                        className={`product-tab-list-6 justify-content-center mb-60 ${
                            productTabClass ? productTabClass : ""
                        }`}
                    >
                        <div style={{marginTop:"30px"}}>
                            <h3>내가 찜한 펀딩</h3>
                        </div>
                    </Nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div style={{float:"right"}}>
                                </div>
                                <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr", justifyContent:"center", alignItems:"center"}}>
                                    {listPage}
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>

        </div>
    );

};

export default MyFavFundingPage;