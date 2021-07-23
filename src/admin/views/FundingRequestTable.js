import React, {useEffect, useState, Fragment} from "react";

import {
    Card,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import fundingService from "../sevice/fundingService";
import {useHistory, useLocation} from "react-router-dom";
import FundingPagination from "../components/funding/FundingPagination";
import * as queryString from "querystring";

const initState = {
    dtoList: [
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
const FundingRequestTable = () => {
    const history = useHistory();
    const location = useLocation();
    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;

    const [funding, setFunding] = useState(initState);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        fundingService.requestFundingList(page).then(res => {
            setFunding(res.data.response);
        });
    }, [page, flag])


    const movePage = (num) => {
        history.push('/admin/request?page=' + num)
        funding.pageMaker.page = num;
        setFunding({...funding});
        setFlag(!flag)
    }
    fundingService.setMovePage(movePage)

    const toFunding = (fno) => {
        history.push("/funding/read/" + fno)
    }
    const setAuthorized = (fund) => {
        fundingService.setAuthorized(fund.fno, funding.pageMaker.page)
            .then();
    }

    const list = funding.dtoList.map(fund => {
        return <tr key={fund.fno}>
            <td onClick={() => toFunding(fund.fno)}>{fund.title}</td>
            <td>{fund.writer}</td>
            <td>{fund.email}</td>
            <td>{fund.content}</td>
            <td>{fund.targetAmount}</td>
            <td>{fund.totalAmount}</td>
            <td>{fund.dueDate}</td>
            <td>{fund.regDate}</td>
            <td onClick={() => setAuthorized(fund)}>{fund.authorized ? null : "✔"}</td>
        </tr>
    })

    return (
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">펀딩 신청 리스트</Card.Title>
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

export default FundingRequestTable;


