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

const initState =
  [
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
  ]

const FundingRequestTable = () => {

    const [funding, setFunding] = useState(initState);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        fundingService.requestFundingList(funding)
            .then(res => {
                setFunding(res.data.response);
                console.log(res.data.response)
            });
    }, [flag])


    const setAuthorized = (fund) => {
        fundingService.setAuthorized(fund.fno)
            .then()
        console.log("funding.fno", fund.fno)
        setFlag(!flag)
    }


    const list = funding.map(fund => {
        return <tr key={fund.fno}>
                <td>{fund.title}</td>
                <td>{fund.writer}</td>
                <td>{fund.email}</td>
                <td>{fund.content}</td>
                <td>{fund.targetAmount}</td>
                <td>{fund.totalAmount}</td>
                <td>{fund.targetAmount / fund.totalAmount}%달성</td>
                <td>{fund.dueDate}</td>
                <td>{fund.regDate}</td>
                <td onClick={() => setAuthorized(fund)}
                    style={{textAlign: "center"}}>{fund.authorized ? "" : "✔"}</td>
                <td style={{textAlign: "center"}}>{fund.authorized ? "" : "❌"}</td>
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
                                <th className="border-0">펀딩기한</th>
                                <th className="border-0">신청날짜</th>
                                <th className="border-0">펀딩 신청 승인</th>
                                <th className="border-0">펀딩 신청 반려</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </Table>
                        <div style={{textAlign: "center"}}>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default FundingRequestTable;


