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
const FundingRequestTable = () => {

    const [funding, setFunding] = useState(initState);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        fundingService.getFundingList(funding.pageMaker.page)
            .then(res => {
                setFunding(res.data.response);
                console.log("dtoList 부터", res.data.response.dtoList)
                console.log("fundingDTO 부터", res.data.response.dtoList.fundingDTO)
            });
    }, [funding.pageMaker.page,flag])


    const setAuthorized = (fund) => {
        fundingService.setAuthorized(fund.fundingDTO.fno)
            .then()
            .catch();
        console.log("funding.fno",fund.fundingDTO.fno)
    }

    const movePage = (num) => {

        funding.pageMaker.page = num;
        setFunding({...funding});
        setFlag(!flag);
    }

    fundingService.setMovePage(movePage);

    const list = funding.dtoList.map(fund => {
        return(fund.fundingDTO.authorized===false? <tr key={fund.fundingDTO.fno}>
            <td>{fund.fundingDTO.title}</td>
            <td>{fund.fundingDTO.writer}</td>
            <td>{fund.fundingDTO.email}</td>
            <td>{fund.fundingDTO.content}</td>
            <td>{fund.fundingDTO.targetAmount}</td>
            <td>{fund.fundingDTO.totalAmount}</td>
            <td>{fund.fundingDTO.targetAmount/fund.fundingDTO.totalAmount}%달성</td>
            <td>{fund.fundingDTO.dueDate}</td>
            <td>{fund.fundingDTO.regDate}</td>
            <td onClick={() => setAuthorized(fund)}
                style={{textAlign: "center"}}>{fund.fundingDTO.authorized ? "🟢" : "🔴"}</td>
        </tr>:null
        )
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
                                <th className="border-0">펀딩 진행률</th>
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
                            {funding.pageMaker.pageList.map(page => page === funding.pageMaker.page ?
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

export default FundingRequestTable;


