import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tab from "react-bootstrap/Tab";
import noticeService from "../../admin/sevice/noticeService"
import useInputs from "../../customHooks/useInputs";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {ToastInformation, ToastWarning} from "../../modules/toastModule";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

export default function Register() {
    const [open, setOpen] = React.useState(false);
    const [board, onChange] = useInputs(initState);
    const history = useHistory()
    const {email, name} = useSelector(state => state.login)

    const titleRef = useRef();
    const contentRef = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const register = () => {
        if(board.title === "" || board.title === undefined || board.title === null){
            ToastWarning("제목을 입력해주세요.")
            return;
        } else if(board.content === "" || board.content === undefined || board.content === null){
            ToastWarning("내용을 입력해주세요.")
            return;
        }
        noticeService.registerBoard({...board, email: email, writer: name}).then(res => {
            ToastInformation("공지가 등록되었습니다.")
            history.push(`/board/notice/list`)
        })
    }
    return (
        <div style={{width:"1000px"}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                공지 글 작성
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{minWidth:"40vw"}} maxWidth={"sm"} fullWidth={true}>
                <div style={{padding:"25px"}}>
                <DialogTitle id="form-dialog-title">공지글</DialogTitle>
                <Tab.Container>
                    <h3> 글작성 </h3>
                    <div className="login-form-container">
                        <div className="login-register-form">
                            <label htmlFor="title">제목</label>
                            <input
                                id={"title"}
                                type={"text"}
                                name={"title"}
                                placeholder="제목"
                                value={board.title}
                                onChange={onChange}
                                ref={titleRef}
                                style={{margin:"0 0 2.5vh 0"}}
                            />

                            <label htmlFor="content">내용</label>
                            <textarea
                                id={"content"}
                                name={"content"}
                                placeholder="내용"
                                value={board.content}
                                onChange={onChange}
                                ref={contentRef}
                                style={{resize:"none", height:"30vh"}}
                            />
                            <DialogActions>
                                <Button type="button" color="primary" onClick={() => {
                                    register()
                                }} >
                                    작성
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    취소
                                </Button>
                            </DialogActions>
                        </div>
                    </div>
                </Tab.Container>
                </div>
            </Dialog>
        </div>
    );
}