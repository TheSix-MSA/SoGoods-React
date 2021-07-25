import React, {useEffect, useState} from "react";
import {
    Card,
    Table,
    Row,
    Col,
} from "react-bootstrap";
import memberService from "../sevice/memberService";
import MemberPagination from "../components/member/MemberPagination";
import {useHistory, useLocation} from "react-router-dom";
import * as queryString from "querystring";
import Identification from "../modal/Identification";
import {ToastInformation, ToastWarning} from "../../modules/toastModule";

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
            roleSet: [],
            identificationUrl: "",
            introduce: "",
            nickName: ""
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
    const history = useHistory();
    const location = useLocation();
    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;

    const [members, setMembers] = useState(initState);
    const [flag, setFlag] = useState(false);

            console.log("23123124124124",members)
    useEffect(() => {
        memberService.getMemberApprovalList(page).then(res => {
           setMembers(res.data.response);
        });
    }, [page, flag])

    const movePage = (num) => {
        history.push('/admin/approval?page=' + num)
        members.pageMaker.page = num;
        setMembers({...members});
        setFlag(!flag)
    }
    memberService.setMovePage(movePage);

    const changeRole = (member) => {
        if (!member.roleSet.includes("ADMIN")) {
            memberService.changeRole(member.email, members.pageMaker.page)
                .then();
            ToastInformation("작가 승인처리 되었습니다.")
        }
    }

    const reject = (member) => {
        memberService.reject(member.email, members.pageMaker.page)
            .then();
        ToastWarning("작가 승인 반려처리 되었습니다.")
    }

    const list = members.memberList.map(member => {
        return <tr className='hs-style' key={member.email}>
            <td>{member.email}</td>
            <td>{member.name}</td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.address} {member.detailAddress}</td>
            <td>{member.gender}</td>
            <td><Identification member={member}/></td>
            <td onClick={() => changeRole(member)} style={{textAlign: "center"}}>
                <span style={{cursor: "pointer"}}>{member.approval ? "✔" : ""}</span>
            </td>
            <td onClick={()=> reject(member)} style={{textAlign: "center"}}>
                <span style={{cursor: "pointer"}}>{member.approval ? "❌" : ""}</span>
            </td>
        </tr>
    })

    return (
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
                        <Table className="table-hover table-striped"
                               style={{textAlign: "center", tableLayout: "fixed"}}>
                            <thead>
                            <tr>
                                <th className="border-0">이메일</th>
                                <th className="border-0">이름</th>
                                <th className="border-0">생년월일</th>
                                <th className="border-0">전화번호</th>
                                <th className="border-0">주소</th>
                                <th className="border-0">성별</th>
                                <th className="border-0">작가 정보</th>
                                <th className="border-0">작가 승인 처리</th>
                                <th className="border-0">작가 반려 처리</th>
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

export default MemberApprovalTable;