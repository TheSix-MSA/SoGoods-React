import React, {useEffect, useState} from "react";

import {
    Card,
    Table,
    Row,
    Col
} from "react-bootstrap";
import MemberPagination from "../components/member/MemberPagination";
import getFormatDate from "../../modules/getFormatDate";
import {useHistory, useLocation} from "react-router-dom";
import * as queryString from "querystring";
import useInputs from "../../customHooks/useInputs";
import memberService from "../sevice/memberService";

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
}
const param = {
    page: 1,
    type: '',
    keyword: ''
}
const MemberTable = () => {
    const location = useLocation();

    const value = queryString.parse(location.search.replace("?", ""));
    const history = useHistory();
    const page = value.page || 1;
    const type = value.type || "";
    const keyword = value.keyword || "";
    const [members, setMembers] = useState(initState);
    const [flag, setFlag] = useState(false);
    const [searchInput, searchOnChange] = useInputs({...param, page: value.page || 1});

    useEffect(() => {
        memberService.getMemberList(page, keyword, type).then(res => {
            setMembers(res.data.response);
        });
    }, [page])

    const renderPage = () => {
        setFlag(!flag)
    }
    memberService.setRender(renderPage)

    const movePage = (num) => {
        history.push('/admin/member?page=' + num + '&keyword=' + searchInput.keyword + '&type=' + searchInput.type)
        memberService.getMemberList(num).then(res => {
            setMembers(res.data.response);
        });
    }

    const search = async (e) => {
        e.preventDefault();
        const res = await memberService.getMemberList(1, searchInput.keyword, searchInput.type)
        setMembers(res.data.response)
        history.push('/admin/member?page=' + page + '&keyword=' + searchInput.keyword + '&type=' + searchInput.type);
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
        memberService.changeAuth(member.email).then(res => {
            setMembers({
                ...members, memberList: members.memberList.map(member => {
                    if (member.email === res.data.response.email)
                        return res.data.response;
                    return member;
                })
            })
        })
    }

    const list = members.memberList?.map(member => {
        return <tr className='hs-style' key={member.email}>
            <td>{member.email}</td>
            <td>{member.name}</td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.address} {member.detailAddress}</td>
            <td>{member.gender}</td>
            <td onClick={() => ban(member)} style={{textAlign: "center"}}>
                <span style={{cursor: "pointer"}}>{member.banned ? "🔴" : "🟢"} </span>
            </td>
            <td>{member.removed ? "삭제" : "정상"}</td>
            <td onClick={() => role(member)}>
                <span style={{cursor: "pointer"}}>{member.roleSet[member.roleSet.length - 1]} </span>
            </td>
            <td>{getFormatDate(new Date(member.regDate))}</td>
            <td><img src={member.identificationUrl}/></td>
        </tr>
    })

    return (
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">회원 리스트</Card.Title>

                        <div className="pro-sidebar-search mb-55 mt-25">
                            <form className="pro-sidebar-search-form">
                                <select name="type" style={{width: "10%"}} onChange={searchOnChange}>
                                    <option value='n'>이름</option>
                                    <option value='e'>이메일</option>
                                    <option value='a'>주소</option>
                                </select>
                                <input value={searchInput.keyword} onChange={searchOnChange} type="text"
                                       name="keyword" placeholder="검색"/>
                                <button style={{top: "70%"}} onClick={search}>
                                    <i className="pe-7s-search"/>
                                </button>
                            </form>
                        </div>

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
                                <th className="border-0">밴 여부</th>
                                <th className="border-0">삭제 여부</th>
                                <th className="border-0">권한</th>
                                <th className="border-0">가입날짜</th>
                                <th className="border-0">check url</th>
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


