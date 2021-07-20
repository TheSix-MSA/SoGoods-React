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
    const [flag, setFlag] = useState(false);
    console.log(11111, members)

    useEffect(() => {
        // // axios.get("/data/members.json")
        // axios.get("http://13.209.213.239:8000/member/list")
        //     .then(res => {
        //         console.log(res.data)
        //         setMembers(res.data.response.memberList)
        //         console.log(2222, res.data.response.memberList)
        //     })
        adminService.getMemberList(members.pageMaker.page).then(res => {
            setMembers(res.data.response);
        });
    }, [members.pageMaker.page])
// []<-밴 삭제 여부 클릭이벤트 상태 변경값 주기

    const movePage = (num) => {
        /**
         * 재렌더링을 위해 만든 함수. 댓글 페이지가 바뀌거나 바뀌지 않더라도
         * 새로운 댓글이 입력되거나 하면 실행하여 재랜더링.
         */
        members.pageMaker.page = num;
        setMembers({...members});
        setFlag(!flag);
    }
    adminService.setMovePage(movePage);

    const list = members.map(member => {
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

    // const pageMaker = res
//
//     return (
//         <>
//         {list}
//         </>
//     );
// };


    // export default TableList;
//
//
// const th = ({member}) => {
    return (
        // <Admin>
        // <Fragment>
        <>
            <Container fluid>
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
                                        <th className="border-0">생일</th>
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
                            <button>prev</button>
                            <button>next</button>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>

        // </Fragment>
        // </Admin>
    );
}

export default TableList;


