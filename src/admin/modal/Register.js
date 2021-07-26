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
import {useToasts} from "react-toast-notifications";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

export default function Register() {
    const { addToast } = useToasts()
    const [open, setOpen] = React.useState(false);
    const [board, onChange] = useInputs(initState);
    const history = useHistory()
    const {email, name} = useSelector(state => state.login)
    console.log(history)

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
            addToast("제목을 입력해주세요.", {appearance: 'warning', autoDismiss: true});
            return;
        } else if(board.content === "" || board.content === undefined || board.content === null){
            addToast("내용을 입력해주세요.", {appearance: 'warning', autoDismiss: true});
            return;
        }
        noticeService.registerBoard({...board, email: email, writer: name}).then(res => {
            history.push(`/board/notice/list`)
        })
    }
    return (
        <div style={{width:"1000px"}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                공지 글 작성
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">공지글</DialogTitle>
                <Tab.Container>
                    <h3> 글작성 </h3>
                    <div className="login-form-container">
                        <div className="login-register-form">
                            <input
                                type={"text"}
                                name={"title"}
                                placeholder="제목"
                                value={board.title}
                                onChange={onChange}
                                ref={titleRef}
                            />

                            <textarea
                                name={"content"}
                                placeholder="내용"
                                value={board.content}
                                onChange={onChange}
                                ref={contentRef}
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
            </Dialog>
        </div>
    );
}