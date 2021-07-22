import React, {useEffect, useState, Fragment} from "react";

import {
    Card,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import fundingService from "../sevice/fundingService";
import {useHistory, useLocation} from "react-router-dom";
import FundingPagination from "../components/Funding/FundingPagination";
import queryString from "querystring";
import memberService from "../sevice/memberService";

const initState = {
    dtoList: [
        {
            fundingDTO:
                {
                    fno: 1,
                    title: "",
                    writer: "",
                    email: "",
                    content: "",
                    regDate: "",
                    dueDate: "",
                    success: false,
                    removed: false,
                    totalAmount: 0,
                    targetAmount: 1,
                    authorized: false
                },
            mainProductPno: 1,
            favoriteCnt: 1
        },
    ],
    pageMaker: {
        page: 1,
        size: 10,
        totalCount: 0,
        keyword: "",
        type: "",
        pageList: [],
        prev: false,
        next: false
    },
    listRequestDTO: {
        page: 1,
        size: 10,
        keyword: "",
        type: ""
    }
}
const FundingTable = () => {
    const location = useLocation();
    const history = useHistory();
    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;

    const [funding, setFunding] = useState(initState);
    const [flag, setFlag] = useState(false);
    const renderPage = () => {
        setFlag(!flag)
    }
    memberService.setRender(renderPage)

    useEffect(() => {
        fundingService.getFundingList(page)
            .then(res => {
                setFunding(res.data.response);
        console.log(res.data.response)
            });
    }, [page])


    const movePage = (num) => {
        history.push('/admin/funding?page=' + num)
        funding.pageMaker.page = num;
        fundingService.getFundingList(num)
            .then(res => {
                setFunding(res.data.response);
            });
    }

    const toFunding = (fno) => {
        history.push("/funding/read/" + fno)
    }

    const setAuthorized = (fund) => {
        console.log("fund",fund)
        fundingService.setAuthorized(fund.fno).then(res => {
            setFunding({...funding, dtoList: funding.dtoList.map(fund => {
                    if (fund.fundingDTO.fno === res.data.response.fno)
                        return res.data.response;
                    console.log(2141254235235,res.data.response)
                    return fund;
                })
            })
        })
    }

    const list = funding.dtoList.map(fund => {
        return <tr key={fund.fundingDTO.fno}>
            <td onClick={() => toFunding(fund.fundingDTO.fno)}>{fund.fundingDTO.title}</td>
            <td>{fund.fundingDTO.writer}</td>
            <td>{fund.fundingDTO.email}</td>
            <td>{fund.fundingDTO.content}</td>
            <td>{fund.fundingDTO.targetAmount}</td>
            <td>{fund.fundingDTO.totalAmount}</td>
            <td>{(fund.fundingDTO.totalAmount / fund.fundingDTO.targetAmount * 100).toFixed(2)}%달성</td>
            <td>{fund.fundingDTO.success ? "🟢" : "🔴"}</td>
            <td>{fund.fundingDTO.removed ? "🟢" : "🔴"}</td>
            <td>{fund.fundingDTO.dueDate}</td>
            <td>{fund.fundingDTO.regDate}</td>
            <td onClick={() => setAuthorized(fund.fundingDTO)}>{fund.fundingDTO.authorized ? "🟢" : "🔴"}</td>
        </tr>
    })

    return (
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">펀딩 리스트</Card.Title>
                        <p className="card-category">
                            펀딩정보
                        </p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-20">
                        <Table className="table-hover table-striped" style={{textAlign: "center"}}>
                            <thead>
                            <tr>
                                <th className="border-0">제목</th>
                                <th className="border-0">작성자</th>
                                <th className="border-0">이메일</th>
                                <th className="border-0">내용</th>
                                <th className="border-0">목표금액</th>
                                <th className="border-0">현재금액</th>
                                <th className="border-0">펀딩 진행률</th>
                                <th className="border-0">펀딩 성공 여부</th>
                                <th className="border-0">삭제 여부</th>
                                <th className="border-0">펀딩기한</th>
                                <th className="border-0">신청날짜</th>
                                <th className="border-0">펀딩 신청 여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </Table>
                        <FundingPagination funding={funding} movePage={movePage}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default FundingTable;


