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
import memberService from "../sevice/memberService";
import MemberPagination from "../components/member/MemberPagination";

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
            approval: false,
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
const MemberApprovalTable = () => {

    const [members, setMembers] = useState(initState);
    const [role, setRole] = useState("");
    // const [approval, setApproval] = useState(true);


    useEffect(() => {
        memberService.getMemberApprovalList(members.pageMaker.page).then(res => {
            setMembers(res.data.response);

        });
    }, [members.pageMaker.page, role])


    const movePage = (num) => {
        members.pageMaker.page = num;
        setMembers({...members});
        memberService.setMovePage(movePage);
    }

    const nextPage = () => {

        members.pageMaker.page = members.pageMaker.page + 1;

        setMembers({...members});
        memberService.setNextPrev(nextPage);
    }
    const prevPage = () => {

        members.pageMaker.page = members.pageMaker.page - 1;

        setMembers({...members});
        memberService.setNextPrev(prevPage);
    }
    //
    const changeRole = (member) => {
        if (member.roleSet[2] !== "ADMIN") {
            memberService.changeRole(member.email)
                .then();
        }
    }
    memberService.setRoleService(setRole)


    const list = members.memberList.map(member => {

        return (member.roleSet[0]==="GENERAL"?
            <tr key={member.email}>
                <td>{member.email}</td>
                <td>{member.name}</td>
                <td>{member.birth}</td>
                <td>{member.phone}</td>
                <td>{member.address} {member.detailAddress}</td>
                <td>{member.gender}</td>
                <td onClick={() => changeRole(member)} style={{textAlign: "center"}}>{member.approval ? "✔" : ""}</td>
                <td style={{textAlign: "center"}}>{member.approval ? "❌" : ""}</td>
            </tr>:null

        )
    })

    return (
        <Container fluid>
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">작가 승인 리스트</Card.Title>
                        <p className="card-category">
                            회원정보
                        </p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped" style={{textAlign: "center"}}>
                            <thead>
                            <tr>
                                <th className="border-0">이메일</th>
                                <th className="border-0">이름</th>
                                <th className="border-0">생년월일</th>
                                <th className="border-0">전화번호</th>
                                <th className="border-0">주소</th>
                                <th className="border-0">성별</th>
                                <th className="border-0">작가 승인 처리</th>
                                <th className="border-0">작가 반려 처리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}

                            </tbody>
                        </Table>
                        <MemberPagination members={members} prevPage={prevPage} movePage={movePage}
                                          nextPage={nextPage}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>

    );
}

export default MemberApprovalTable;


