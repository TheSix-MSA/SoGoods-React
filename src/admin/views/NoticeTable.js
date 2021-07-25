import React, {useEffect, useState} from "react";
import noticeService from "../sevice/noticeService";
import {Card, Col, Row, Table} from "react-bootstrap";
import getFormatDate from "../../modules/getFormatDate";
import {useHistory, useLocation} from "react-router-dom";
import Register from "../modal/Register";
import queryString from "querystring";
import useInputs from "../../customHooks/useInputs";
import NoticePagination from "../components/notice/NoticePagination";

const initState = {
    boardListRequestDTO: {
        page: 1,
        size: 9,
        keyword: null,
        type: null
    },
    boardDtoList: [{
        bno: 0,
        title: "",
        writer: "",
        email: "",
        content: "",
        removed: false,
        regDate: "",
        modDate: "",
        private: false
    }],
    pageMaker: {
        page: 1,
        size: 10,
        totalCount: 0,
        pageList: [],
        prev: false,
        next: false,
        start: 0,
        end: 0
    }
}
const param = {
    page: 1,
    type: '',
    keyword: ''
}
const NoticeTable = () => {
    const history = useHistory()
    const location = useLocation();

    const value = queryString.parse(location.search.replace("?", ""));
    const page = value.page || 1;
    const type = value.type || "";
    const keyword = value.keyword || "";

    const [notices, setNotices] = useState(initState);
    const [flag, setFlag] = useState(false);
    const [searchInput, searchOnChange] = useInputs({...param, page: value.page || 1});

    useEffect(() => {
        noticeService.getNoticeList(page, keyword, type).then(result => {
            console.log("result.response", result.response)
            setNotices(result.response);
        })
    }, [page])

    const renderPage = () => {
        setFlag(!flag)
    }
    noticeService.setRender(renderPage)

    const toNotice = (bno) => {
        history.push("/board/NOTICE/" + bno)
    }

    const movePage = (num) => {
        history.push('/admin/notice?page=' + num + '&keyword=' + searchInput.keyword + '&type=' + searchInput.type)
        noticeService.getNoticeList(num).then(res => {
            setNotices(res.response);
        });
    }

    const search = async (e) => {
        e.preventDefault();
        const res = await noticeService.getNoticeList(1, searchInput.keyword, searchInput.type)
        setNotices(res.response)
        history.push('/admin/notice?page=' + page + '&keyword=' + searchInput.keyword + '&type=' + searchInput.type);
    }

    const changePrivate = (notice) => {
        noticeService.changePrivate(notice.bno, notice).then(res => {
            setNotices({
                ...notices, boardDtoList: notices.boardDtoList.map(notice => {
                    if (notice.bno === res.response.bno) return res.response;
                    return notice;
                })
            })
        })
    }

    const changeRemoved = (notice) => {
        noticeService.changeRemoved(notice.bno).then(res => {
            setNotices({
                ...notices, boardDtoList: notices.boardDtoList.map(notice => {
                    if (notice.bno === res.response.bno) return res.response;
                    return notice;
                })
            })
        })
    }

    const list = notices.boardDtoList.map(notice => {
        return <tr className='hs-style' key={notice.bno}>
            <td onClick={() => toNotice(notice.bno)}>
                <span style={{cursor: "pointer"}}>{notice.title}</span>
            </td>
            <td>{notice.writer}</td>
            <td>{notice.content}</td>
            <td>{getFormatDate(new Date(notice.regDate))}</td>
            <td>{getFormatDate(new Date(notice.modDate))}</td>
            <td onClick={() => changeRemoved(notice)}>
                <span style={{cursor: "pointer"}}>{notice.removed ? "삭제됨" : "정상"}</span>
            </td>
            <td onClick={() => changePrivate(notice)}>
                <span style={{cursor: "pointer"}}>{notice.private ? "공지중" : "공지 X"}</span>
            </td>
        </tr>

    })

    return (
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">공지 리스트</Card.Title>

                        <div className="pro-sidebar-search mb-55 mt-25">
                            <form className="pro-sidebar-search-form" action="#">
                                <select name="type" style={{width: "10%"}} onChange={searchOnChange}>
                                    <option value='t'>제목</option>
                                    <option value='w'>작성자</option>
                                    <option value='c'>내용</option>
                                    <option value='tc'>제목+내용</option>
                                </select>
                                <input value={searchInput.keyword} onChange={searchOnChange} type="text"
                                       name="keyword" placeholder="검색"/>
                                <button style={{top: "70%"}} onClick={search}>
                                    <i className="pe-7s-search"/>
                                </button>
                            </form>
                        </div>

                        <Register/>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped"
                               style={{textAlign: "center", tableLayout: "fixed"}}>
                            <thead>
                            <tr>
                                <th className="border-0">제목</th>
                                <th className="border-0">이름</th>
                                <th className="border-0">내용</th>
                                <th className="border-0">생성 날짜</th>
                                <th className="border-0">수정 날짜</th>
                                <th className="border-0">삭제 여부</th>
                                <th className="border-0">공지</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </Table>
                        <NoticePagination pageMaker={notices.pageMaker} movePage={movePage}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
export default NoticeTable;