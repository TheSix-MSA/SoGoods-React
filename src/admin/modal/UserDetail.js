import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tab from "react-bootstrap/Tab";
import {Table} from "react-bootstrap";

export default function UserDetail({member}) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <span onClick={handleClickOpen}>
                {member.name}
            </span>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">회원 정보</DialogTitle>

                <Tab.Container>
                            <Table>
                                <thead>
                                <tr style={{textAlign:"center"}}>
                                    <th className="border-0">이메일</th>
                                    <th className="border-0">이름</th>
                                    <th className="border-0">생년월일</th>
                                    <th className="border-0">전화번호</th>
                                    <th className="border-0">주소</th>
                                    <th className="border-0">성별</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>{member.email}</td>
                                <td>{member.name}</td>
                                <td>{member.birth}</td>
                                <td>{member.phone}</td>
                                <td>{member.address} {member.detailAddress}</td>
                                <td>{member.gender}</td>
                                </tbody>

                            </Table>
                    <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    닫기
                                </Button>
                            </DialogActions>

                </Tab.Container>
            </Dialog>
        </div>
    );
}