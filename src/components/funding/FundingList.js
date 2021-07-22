import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect} from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Nav from "react-bootstrap/Nav";
import * as queryString from "query-string";
import {
    useHistory
} from "react-router-dom";
import fundingService from "./fundingService";
import PageList from "./PageList";
import useInputs from "../../customHooks/useInputs";

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
    type:''
}

const FundingList = ({ location, productTabClass}) => {
    const value = queryString.parse(location.search);	// 문자열의 쿼리스트링을 Object로 변환
    const [searchInput, searchOnChange ,setSearchInput] = useInputs({...param, page:value.page||1});

    // 파라미터로 넘어가는 값
    const page = value.page||1;
    const keyword = value.keyword||"";
    const type = value.type||"";

    const history = useHistory()
    const [data, setData] = useState(initState)

    // 리스트 데이터 불러오기
    useEffect(()=> {
        fundingService.getList(page, keyword, type).then(res=>{
            setData(res.response);
        })
    }, [page])

    // 페이지 이동처리
    const movePage = (page) => {
        const url = '/funding/list?page='+page+'&keyword='+searchInput.keyword+ '&type='+ searchInput.type;
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
    const search = async () => {
        const result = await fundingService.getList(1, searchInput.keyword, searchInput.type);
        setData(result.response)
        const url = '/funding/list?page='+page+'&keyword='+searchInput.keyword+ '&type='+ searchInput.type;
        history.push(url);
    }

    // 진행중인 펀딩 리스트 불러오기
    const list = data.dtoList.map((dto, idx)=>
        <div key={idx} onClick={()=> readTodo(dto.fundingDTO.fno)} style={{cursor:"pointer"}}>
            <h5>{dto.fundingDTO.fno}번 게시글</h5>
            <img alt={"이미지"} src="https://i.imgur.com/WCySTkp.jpeg" height={"200px"}/>
            <h5>{dto.fundingDTO.title}</h5>
            <h5>마감일자 : {dto.fundingDTO.dueDate}</h5>
            <h5>펀딩금액 : {dto.fundingDTO.totalAmount}</h5>
        </div>
    )


    return (
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
                        <h3>진행중인 펀딩</h3>
                    </div>
                </Nav>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{display:"flex"}}>
                            {/* shop topbar default */}
                                <select name='type' onChange={searchOnChange} style={{width:"100px",border:"1px solid #EEE"}}>
                                    <option value=''>선택</option>
                                    <option value='w'>작성자</option>
                                    <option value='t'>제목</option>
                                    <option value='c'>내용</option>
                                </select>
                            <div className="pro-sidebar-search" style={{display:"flex"}}>
                                    <input type="text" name="keyword" value={searchInput.keyword} placeholder="Search here..." onChange={searchOnChange} style={{backgroundColor:"#FFF",border:"1px solid #EEE"}}/>
                                    <button onClick={search} style={{backgroundColor:"#EEE", borderColor:"#EEE"}}>
                                        <i className="pe-7s-search" />
                                    </button>
                            </div>
                                <div style={{marginLeft:"auto"}}>
                                    <button onClick={()=>toRegister()} style={{height:"45px" ,backgroundColor:"#EEE", borderColor:"#EEE"}}>펀딩 등록하기</button>
                                </div>
                            </div>
                            <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr"}}>
                                {list}
                            </div>
                            <PageList data={data} movePage={movePage}></PageList>
                            {/* shop product pagination */}

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

