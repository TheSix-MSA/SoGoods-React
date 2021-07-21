import React, {useEffect, useState, Fragment} from "react";

// react-bootstrap components
import {
    Card,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import fundingService from "../sevice/fundingService";
// import FundingPagination from "../components/Funding/FundingPagination";

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

    const [fundings, setFunding] = useState(initState);
    const [flag, setFlag] = useState(false);
    // const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fundingService.getFundingList(fundings.pageMaker.page)
            .then(res => {
                setFunding(res.data.response);
                console.log("dtoList 부터", res.data.response.dtoList)
                console.log("fundingDTO 부터", res.data.response.dtoList.fundingDTO)
            });
    }, [fundings.pageMaker.page,flag])


    const setAuthorized = (funding) => {
        fundingService.setAuthorized(funding.fundingDTO.fno, fundings.pageMaker.page)
            .then();
        console.log("funding.fno",funding.fundingDTO.fno)
        // console.log(123123132111,funding)
    }

    const movePage = (num) => {

        fundings.pageMaker.page = num;
        setFunding({...fundings});
        setFlag(!flag);
    }

    fundingService.setMovePage(movePage);

    const list = fundings.dtoList.map(funding => {
        return <tr key={funding.fundingDTO.fno}>
            <td>{funding.fundingDTO.title}</td>
            <td>{funding.fundingDTO.writer}</td>
            <td>{funding.fundingDTO.email}</td>
            <td>{funding.fundingDTO.content}</td>
            <td>{funding.fundingDTO.targetAmount}</td>
            <td>{funding.fundingDTO.totalAmount}</td>
            <td>{funding.fundingDTO.success}</td>
            <td>{funding.fundingDTO.removed}</td>
            <td>{funding.fundingDTO.dueDate}</td>
            <td>{funding.fundingDTO.regDate}</td>
            <td onClick={() => setAuthorized(funding)}
                style={{textAlign: "center"}}>{funding.fundingDTO.authorized ? "🟢" : "🔴"}</td>
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
                        <Table className="table-hover table-striped" style={{textAlign:"center"}}>
                            <thead>
                            <tr>
                                <th className="border-0">제목</th>
                                <th className="border-0">작성자</th>
                                <th className="border-0">이메일</th>
                                <th className="border-0">내용</th>
                                <th className="border-0">목표금액</th>
                                <th className="border-0">현재금액</th>
                                <th className="border-0">펀딩 성공 여부</th>
                                <th className="border-0">삭제 여부</th>
                                <th className="border-0">펀딩기한</th>
                                <th className="border-0">신청날짜</th>
                                <th className="border-0">승인 여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </Table>
                        <div style={{textAlign: "center"}}>
                            {/*{fundings.pageMaker.page !== 1 ?*/}
                            {/*    <span onClick={() => prevPage()}>Prev</span> : false}*/}
                            {fundings.pageMaker.pageList.map(page => page === fundings.pageMaker.page ?
                                <span key={page}><b>{page}</b></span> :
                                <span key={page} onClick={() => movePage(page)}>{page}</span>)}
                            {/*{members.pageMaker.next === false ? null :*/}
                            {/*    members.memberList.length === members.pageMaker.size ?*/}
                            {/*        <span onClick={() => nextPage()}>Next</span> : false}*/}
                        </div>
                        {/*<FundingPagination fundings={fundings} movePage={movePage}/>*/}
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default FundingTable;


