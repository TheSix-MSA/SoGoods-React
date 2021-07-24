import React, {useEffect, useState, Fragment} from "react";

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
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    const history = useHistory();
    const location = useLocation();

    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;
    const type = value.type || "";
    const keyword = value.keyword || "";
    const classes = useStyles();

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

    const search = async () => {
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

                        <div className="pro-sidebar-search mb-55 mt-25">
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    선택
                                </InputLabel>
                                <Select labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        name="type" onChange={searchOnChange}>
                                    <MenuItem value="n"> 이름</MenuItem>
                                    <MenuItem value="e"> 이메일</MenuItem>
                                    <MenuItem value="a"> 주소</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                style={{width: "40%", margin: "8px"}}
                                id="standard-basic"
                                label="검색어"
                                name="keyword"
                                value={searchInput.keyword}
                                onChange={searchOnChange}
                            />
                            <Button variant="outlined"
                                    onClick={search}
                                    style={{marginTop:"15px", padding:"15px 15px"}}>
                                <i className="pe-7s-search" />
                            </Button>
                        </div>

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

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default MemberTable;


