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
import UserDetail from "../modal/UserDetail";
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
            identificationUrl: "",
            introduce: "",
            nickName: "",
            roleSet: [],

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
    type: 'n',
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
    console.log("23123124124124", members)

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
        const currentBan = member.banned?"밴 해제":"밴"
        ToastInformation("해당 유저가 "+ currentBan +" 되었습니다.")
    }

    const role = (member) => {
        if(!member.roleSet.includes("ADMIN")){
        memberService.changeAuth(member.email).then(res => {
            setMembers({
                ...members, memberList: members.memberList.map(member => {
                    if (member.email === res.data.response.email)
                        return res.data.response;
                    return member;
                })
            })
        const currentRole = res.data.response.roleSet.includes("AUTHOR")?"작가":"일반으"
        ToastInformation("해당 유저의 권한이 "+ currentRole +"로 변경 되었습니다.")
        })
    }
}

    const list = members.memberList?.map(member => {
        return <tr className='hs-style' key={member.email}>
            <td>{member.email}</td>
            <td><UserDetail member={member}/></td>
            <td>{member.birth}</td>
            <td>{member.phone}</td>
            <td>{member.gender}</td>
            <td onClick={() => ban(member)} style={{textAlign: "center", width:"5%"}}>
                <span style={{cursor: "pointer"}}>{member.banned ? "🔴" : "🟢"} </span>
            </td>
            <td>{member.removed ? "삭제" : "정상"}</td>
            <td onClick={() => role(member)}>
                {member.roleSet.includes("ADMIN") ?
                    <span> 관리자 </span>
                    : member.roleSet.includes("AUTHOR") ?
                        <span style={{cursor: "pointer"}}> 작가 </span>
                        : <span style={{cursor: "pointer"}}> 일반회원 </span>}
            </td>
            <td>{getFormatDate(new Date(member.regDate))}</td>
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
                                <th className="border-0" style={{width:"25%"}}>이메일</th>
                                <th className="border-0" style={{width:"15%"}}>이름(상세정보)</th>
                                <th className="border-0" style={{width:"15%"}}>생년월일</th>
                                <th className="border-0" style={{width:"20%"}}>전화번호</th>
                                <th className="border-0" style={{width:"5%"}}>성별</th>
                                <th className="border-0" style={{width:"5%"}}>밴 여부</th>
                                <th className="border-0" style={{width:"5%"}}>삭제 여부</th>
                                <th className="border-0" style={{width:"10%"}}>권한</th>
                                <th className="border-0" style={{width:"10%"}}>가입날짜</th>
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


