import React, {useEffect, useState, Fragment} from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import adminService from "../sevice/adminService";

const initState = {
    memberList: [
        {
            email: "",
            password: null,
            name: "",
            gender: "",
            birth: "",
            phone: "",
            address: "",
            detailAddress: "",
            removed: false,
            banned: false,
            provider: "",
            social: false,
            regDate: "",
            loginDate: "",
            roleSet: []
        },],
    pageMaker: {
        page: 1,
        size: 10,
        keyword: "",
        type: "",
        pageList: [],
        startPage: 1,
        endPage: 10,
        prev: false,
        next: false
    },
    requestListDTO: {
        page: 1,
        size: 10,
        keyword: "",
        type: ""
    }
}
const TableList = () => {

    const [members, setMembers] = useState(initState);
    // const [flag, setFlag] = useState(false);
    console.log(11111, members)

    useEffect(() => {
        adminService.getMemberList(members.pageMaker.page).then(res => {
            setMembers(res.data.response);
        });
    }, [members.pageMaker.page])
// []<-밴 삭제 여부 클릭이벤트 상태 변경값 주기

    const movePage = (num) => {
        members.pageMaker.page = num;
        setMembers({...members});
        adminService.setMovePage(movePage);
    }

    const nextPage = () => {

        members.pageMaker.page = members.pageMaker.page+1;

        setMembers({...members});
        adminService.setNextPrev(nextPage);
    }
    const prevPage = () => {

        members.pageMaker.page = members.pageMaker.page-1;

        setMembers({...members});
        adminService.setNextPrev(prevPage);
    }


    const list = members.memberList.map(member => {
        return <tr key={member.email}>
            <td>{member.email}</td>
            <td>{member.name}</td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.address} {member.detailAddress}</td>
            <td>{member.gender}</td>
            <td style={{textAlign: "center"}}>{member.banned ? "🔴" : "🟢"}</td>
            <td>{member.removed ? "삭제된계정" : "정상계정"}</td>
            <td>{member.roleSet[member.roleSet.length - 1]}</td>
            <td>{member.regDate}</td>
        </tr>
    })
    console.log(333333333, list)

    const a = "A" === "B" ? "a" :
        "b" ==="b" ?true===true?"C":"AAA"        :false
    console.log("정답",a)

    return (
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">회원 리스트</Card.Title>
                                <p className="card-category">
                                    회원정보
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th className="border-0">이메일</th>
                                        <th className="border-0">이름</th>
                                        <th className="border-0">생년월일</th>
                                        <th className="border-0">전화번호</th>
                                        <th className="border-0">주소</th>
                                        <th className="border-0">성별</th>
                                        <th className="border-0">밴 여부</th>
                                        <th className="border-0">삭제 여부</th>
                                        <th className="border-0">권한</th>
                                        <th className="border-0">가입날짜</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <div style={{textAlign: "center"}}>

                            {/*{members.pageMaker.prev===true?*/}
                            {/*    <span onClick={() => prevPage()}>Prev</span>:false}*/}

                            {members.pageMaker.prev===true?false:
                                members.pageMaker.page!==1?
                                <span onClick={() => prevPage()}>Prev</span>:false}

                            {members.pageMaker.pageList.map(page => page===members.pageMaker.page?
                                <span key={page}><b>{page}</b></span>:
                                <span key={page} onClick={() => movePage(page)}>{page}</span>)}

                            {members.pageMaker.next===false?null:
                                members.memberList.length===members.pageMaker.size?
                                    <span onClick={() => nextPage()}>Next</span>:false}


                        </div>
                    </Col>

                </Row>

    );
}

export default TableList;


