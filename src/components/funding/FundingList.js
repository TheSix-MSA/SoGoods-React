import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect} from "react";
import {connect, useSelector} from "react-redux";
import LayoutOne from "../layouts/header/LayoutOne";
import Nav from "react-bootstrap/Nav";
import * as queryString from "query-string";
import {useHistory} from "react-router-dom";
import fundingService from "./fundingService";
import PageList from "./PageList";
import useInputs from "../../customHooks/useInputs";
import LinearWithValueLabel from "./LinearProgressWithLabel";

const initState= {
    listRequestDTO:{},
    dtoList:[],
    pageMaker:{
        page: 1,
        size: 0,
        pageList: [],
        prev: false,
        next: false,
        totalCount:0,
        start:0,
        end:0
    }
}

const param = {
    page:1,
    keyword:'',
    type:'',
    state:''
}

const FundingList = ({ location, productTabClass}) => {
    const value = queryString.parse(location.search);	// 문자열의 쿼리스트링을 Object로 변환
    console.log(value)
    const [searchInput, searchOnChange ,setSearchInput] = useInputs({...param, page:value.page||1, type:value.type||"t", state:value.state||"open"});

    // 파라미터로 넘어가는 값
    const page = value.page||1;
    const keyword = value.keyword||"";
    const type = value.type||"t";
    const state = value.state||"open";


    const history = useHistory();
    const [data, setData] = useState(initState);
    const userInfo = useSelector(state=> state.login);

    // 리스트 데이터 불러오기
    useEffect(()=> {
        fundingService.getList(page, keyword, type, state)
            .then(res1=>{
                let fnoList = res1.response.dtoList.map(dto=>dto.fundingDTO.fno)
                fundingService.getA3src('FUNDING', fnoList)
                    .then(res2=>{
                        res2.data.response.forEach((ele,i)=>{
                            res1.response.dtoList[i].fundingDTO.imgSrc = ele.thumbSrc
                        })
                        setData(res1.response);
                    })
        })
    }, [page, state])


    // 페이지 이동처리
    const movePage = (page) => {
        const url = '/funding/list?page='+page+'&keyword='+searchInput.keyword+ '&type='+ searchInput.type + '&state='+searchInput.state;
        history.push(url);
    }

    // 읽기 페이지로 이동
    const readTodo = (fno) => {
        history.push("/funding/read/"+fno)
    }

    // 쓰기 페이지로 이동
    const toRegister = () => {
        history.push("/funding/register")
    }

    // 검색 처리
    const search = async (e) => {
        e.preventDefault();
        console.log(searchInput);
        const result = await fundingService.getList(1, searchInput.keyword, searchInput.type, searchInput.state);
        setData(result.response)
        const url = '/funding/list?page='+page+'&keyword='+searchInput.keyword+ '&type='+ searchInput.type + '&state=' +searchInput.state;
        history.push(url);
    }

    // 펀딩 상태에 따라 리스트 불러오기 (open or close)
    const setState = async (state) => {
        setSearchInput({...searchInput, state:state});
        const result = await fundingService.getList(1, searchInput.keyword, searchInput.type, searchInput.state)
        setData(result.response);
        const url = '/funding/list?page='+page+'&keyword='+searchInput.keyword+ '&type='+ searchInput.type + '&state=' +state;
        history.push(url);
    }


    // 진행중인 펀딩 리스트 불러오기
    const list = data.dtoList.map((dto, idx)=>
        <div key={idx} onClick={()=> readTodo(dto.fundingDTO.fno)} style={{cursor:"pointer", margin:"30px 10px", height:"300px", width:"380px"}}>
            <h5>{dto.fundingDTO.fno}번 게시글</h5>
            <img alt={"이미지"} src={dto.fundingDTO.imgSrc||process.env.PUBLIC_URL+"/assets/img/default.png"} height={"230px"} width={"350px"} style={{objectFit:"cover"}}/>
            <h5 style={{marginTop:"5px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflowX: "hidden", overflowY:"hidden", maxWidth:"350px"}}>{dto.fundingDTO.title}</h5>
            <LinearWithValueLabel dto={dto}></LinearWithValueLabel>
            <h5>마감일 : {dto.fundingDTO.dueDate}  |  펀딩금액 : {dto.fundingDTO.totalAmount}원</h5>
        </div>
    )

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <Nav
                    variant="pills"
                    className={`product-tab-list-6 justify-content-center mb-60 ${
                        productTabClass ? productTabClass : ""
                    }`}
                >
                </Nav>
                <div className="login-register-wrapper">
                    <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                            <Nav.Link eventKey="login">
                               <h4 onClick={()=>setState("open")}>진행중인 펀딩</h4>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register">
                                <h4 onClick={()=>setState("close")}>마감된 펀딩</h4>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{display:"flex"}}>
                                {/* select option */}
                                <select name='type' onChange={searchOnChange} style={{width:"100px",border:"1px solid #EEE", borderRadius:"15px 0 0 15px"}}>
                                    <option value='t'>선택</option>
                                    <option value='w'>작성자</option>
                                    <option value='t'>제목</option>
                                    <option value='c'>내용</option>
                                </select>
                                <div className="pro-sidebar-search" style={{display:"flex"}}>
                                    {/* search input*/}
                                    <input type="text" name="keyword" value={searchInput.keyword} placeholder="Search here..."
                                           onChange={searchOnChange}
                                           style={{backgroundColor:"#FFF",border:"1px solid #EEE"}}/>
                                    {/* search button */}
                                    <form className={"searchform"} >
                                        <button className={"searchform__submit"} style={{height:"45px", position:"relative", width:"50px", borderRadius:" 0 15px 15px 0"}}
                                                onClick={search}>
                                            <i className="pe-7s-search" />
                                        </button>
                                    </form>
                                </div>
                                    {/* funding register button */}
                                {userInfo.roles.includes("AUTHOR") &&
                                    <div style={{marginLeft:"auto"}}>
                                        <form className={"searchform"} >
                                            <button className={"searchform__submit"} style={{height:"45px", position:"relative", width:"130px", marginRight:"10px"}}
                                                    onClick={()=>toRegister()}>펀딩 등록하기
                                            </button>
                                        </form>
                                    </div>
                                }
                             </div>
                            {/* funding List */}
                            <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr", marginTop:"20px"}}>
                                {list}
                            </div>
                            {/* pagination */}
                            <div style={{margin:"25px"}}>
                                <PageList data={data} movePage={movePage}></PageList>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

FundingList.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
};


export default connect()(FundingList);

