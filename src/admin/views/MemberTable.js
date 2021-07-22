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
const MemberTable = () => {

    const [members, setMembers] = useState(initState);
    const [role, setRole] = useState("");
    const [banned, setBanned] = useState(false);


    useEffect(() => {
        memberService.getMemberList(members.pageMaker.page).then(res => {
            setMembers(res.data.response);
        });
    }, [members.pageMaker.page, role, banned])

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

    const changeRole = (member) => {
        if (member.roleSet[2] || member.roleSet[1] || member.roleSet[0] !== "ADMIN") {
            memberService.changeRole(member.email)
                .then();
        }
    }
    memberService.setRoleService(setRole)


    const changeBanned = (member) => {
        memberService.changeBanned(member.email)
            .then();

    }
    memberService.setBannedService(setBanned)

    const list = members.memberList.map(member => {
        return <tr key={member.email}>
            <td>{member.email}</td>
            <td>{member.name}</td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.address} {member.detailAddress}</td>
            <td>{member.gender}</td>
            <td onClick={() => changeBanned(member)} style={{textAlign: "center"}}>{member.banned ? "🟢" : "🔴"}</td>
            <td>{member.removed ? "삭제" : "정상"}</td>
            <td onClick={() => changeRole(member)}>{member.roleSet[member.roleSet.length-1]} </td>
            <td>{member.regDate}</td>
        </tr>
    })

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
                        <Table className="table-hover table-striped" style={{textAlign: "center"}}>
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
                            {/*<MemberList members={members} changeBanned={changeBanned} changeRole={changeRole} />*/}
                            {list}
                            </tbody>
                        </Table>
                        <MemberPagination members={members} prevPage={prevPage} movePage={movePage}
                                          nextPage={nextPage}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default MemberTable;


