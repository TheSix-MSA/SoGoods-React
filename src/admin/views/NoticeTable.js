import React, {useEffect, useState} from "react";
import noticeService from "../sevice/noticeService";
import {Card, Col, Row, Table} from "react-bootstrap";
import MemberPagination from "../components/member/MemberPagination";
import getFormatDate from "../../modules/getFormatDate";

const initState = {
    boardListRequestDTO: {},
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
        size: 0,
        totalCount: 0,
        pageList: [],
        prev: false,
        next: false,
        start: 0,
        end: 0
    }
}
const NoticeTable = () => {
    const [notices, setNotices] = useState(initState);

    useEffect(() => {
        noticeService.getNoticeList(notices.pageMaker.page).then(result => {
            setNotices(result.response);
        })
    }, [])

    const list = notices.boardDtoList.map(notice => {
        return <tr key={notice.bno}>
            <td>{notice.title}</td>
            <td>{notice.writer}</td>
            <td>{notice.content}</td>
            <td>{notice.removed ? "⭕" : "❌"}</td>
            <td>{getFormatDate(new Date(notice.regDate))}</td>
            <td>{getFormatDate(new Date(notice.modDate))}</td>
            <td>{notice.private ? "⭕" : "❌"}</td>
        </tr>

    })

    return (
        <Row>
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                        <Card.Title as="h4">공지 리스트</Card.Title>

                        {/*<div className="pro-sidebar-search mb-55 mt-25">*/}
                        {/*    <form className="pro-sidebar-search-form" action="#">*/}
                        {/*        <select name="type" style={{width:"10%"}} onChange={searchOnChange}>*/}
                        {/*            <option value=''>선택</option>*/}
                        {/*            <option value='n'>이름</option>*/}
                        {/*            <option value='e'>이메일</option>*/}
                        {/*            <option value='a'>주소</option>*/}
                        {/*        </select>*/}
                        {/*        <input value={searchInput.keyword} onChange={searchOnChange} type="text"*/}
                        {/*               name="keyword" placeholder="검색"/>*/}
                        {/*        <button style={{top:"70%"}} onClick={search}>*/}
                        {/*            <i className="pe-7s-search" />*/}
                        {/*        </button>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                        <p className="card-category">
                            공지 정보
                        </p>

                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped" style={{textAlign: "center"}}>
                            <thead>
                            <tr>
                                <th className="border-0">제목</th>
                                <th className="border-0">이름</th>
                                <th className="border-0">내용</th>
                                <th className="border-0">삭제 여부</th>
                                <th className="border-0">생성 날짜</th>
                                <th className="border-0">수정 날짜</th>
                                <th className="border-0">숨김</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </Table>
                        {/*<MemberPagination members={members} movePage={movePage}/>*/}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );


}
export default NoticeTable;