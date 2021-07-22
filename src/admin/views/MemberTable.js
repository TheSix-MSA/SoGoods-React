import React, {useEffect, useState, Fragment} from "react";

import {
    Card,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import memberService from "../sevice/memberService";
import MemberPagination from "../components/member/MemberPagination";
import getFormatDate from "../../modules/getFormatDate";
import {useHistory, useLocation} from "react-router-dom";
import * as queryString from "querystring";

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
    const history = useHistory();
    const location = useLocation();
    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;

    const [members, setMembers] = useState(initState);
    const [flag, setFlag] = useState(false);
    const renderPage = () => {
        setFlag(!flag)
    }
    memberService.setRender(renderPage)

    useEffect(() => {
        memberService.getMemberList(page).then(res => {
            setMembers(res.data.response);
        });
    }, [page])

    const movePage = (num) => {
        history.push('/admin/member?page=' + num)
        members.pageMaker.page = num;
        memberService.getMemberList(num).then(res => {
            setMembers(res.data.response);
        });
    }

    const ban = (member) => {
        memberService.changeBanned(member.email).then(res => {
            setMembers({
                ...members, memberList: members.memberList.map(member => {
                    if (member.email === res.data.response.email) return res.data.response;
                    return member;
                })
            })
        })
    }
    const role = (member) => {
        memberService.changeRole(member.email).then(res => {
            setMembers({
                ...members, memberList: members.memberList.map(member => {
                    if (member.email === res.data.response.email)
                        return res.data.response;
                    return member;
                })
            })
        })
    }

    const list = members.memberList.map(member => {
        return <tr key={member.email}>
            <td>{member.email}</td>
            <td>{member.name}</td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.address} {member.detailAddress}</td>
            <td>{member.gender}</td>
            <td onClick={() => ban(member)}
                style={{textAlign: "center"}}>{member.banned ? "🔴" : "🟢"}</td>
            <td>{member.removed ? "삭제" : "정상"}</td>
            <td onClick={() => role(member)}>{member.roleSet[0]} </td>
            <td>{getFormatDate(new Date(member.regDate))}</td>
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
                            {list}
                            </tbody>
                        </Table>
                        <MemberPagination members={members} movePage={movePage}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default MemberTable;


