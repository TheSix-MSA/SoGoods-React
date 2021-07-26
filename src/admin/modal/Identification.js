import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tab from "react-bootstrap/Tab";
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";

export default function Identification({member}) {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    console.log(history)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                등록 정보
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">작가 정보</DialogTitle>

                <Tab.Container>
                            <Table>
                                <thead>
                                <tr>
                                    <th className="border-0">이메일</th>
                                    <th className="border-0">이름</th>
                                    <th className="border-0">필명</th>
                                    <th className="border-0">작가 소개</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>{member.email}</td>
                                <td>{member.name}</td>
                                <td>{member.nickName}</td>
                                <td>{member.introduce}</td>
                                </tbody>

                            </Table>
                    <div style={{display:"flex", justifyContent:"center", background:"rgb(235,235,235)", padding:"15px"}}>
                    <img src={member.identificationUrl} style={{width:"300px"}}/>
                    </div>


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