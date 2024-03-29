import React, {useCallback, useRef} from 'react';
import useInputs from "../customHooks/useInputs";
import {useDispatch, useSelector} from "react-redux";
import LayoutOne from "../components/layouts/header/LayoutOne";
import Tab from "react-bootstrap/Tab";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";
import {useToasts} from "react-toast-notifications";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {ToastTopRight} from "../modules/toastModule";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

const BoardRegister = ({match}) => {
    const classes = useStyles();
    const { addToast } = useToasts()
    const boardType = useRef(match.params.boardType?.toUpperCase())
    const [board, onChange, setBoard] = useInputs(initState);
    const history = useHistory()
    const {email, name} = useSelector(state => state.login)

    const titleRef = useRef();
    const contentRef = useRef();

    let boardName = "";
    switch (boardType.current) {
        case "FREE":
            boardName = "자유게시판";
            break;
        case "NOVELIST":
            boardName = "작가게시판";
            break;
        case "NOTICE":
            boardName = "공지사항"
            break;
        default:
            boardName= "치명적인 오류 게시판";
            break;
    }
    const register = (e) => {
        e.preventDefault();
        if (!board.title) {
            ToastTopRight("💨제목을 입력해주세요.");
            return;
        } else if (!board.content) {
            ToastTopRight("💨내용을 입력해주세요.");
            return;
        }

        boardService.registerBoard({...board, email: email, writer: name, boardType: boardType.current}).then(res => {
            if (boardType.current.includes("NOTICE")) {
                history.push(`/admin/dashboard`)
            } else {
                history.push(`/board/${boardType.current}/${res.data.response.bno}`)
            }
        })
    }

    return (
        <>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <div className="blog-area pt-100 pb-100 blog-no-sidebar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mr-20">
                                    <div className="row">
                                        <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                            <div className="login-register-wrapper">
                                                <Tab.Container>
                                                    <div className="login-form-container">
                                                    <h3> {boardName} 글작성 </h3>
                                                        <div className="login-register-form">
                                                            <TextField
                                                                id="standard-basic"
                                                                label="제목"
                                                                name={"title"}
                                                                value={board.title}
                                                                onChange={onChange}
                                                                ref={titleRef}
                                                                inputProps={{maxLength:50}}
                                                                style={{width: "100%", marginBottom: "20px"}}
                                                            />
                                                            <TextField
                                                                id="outlined-multiline-static"
                                                                label="내용"
                                                                multiline
                                                                rows={15}
                                                                variant="outlined"
                                                                name={"content"}
                                                                value={board.content}
                                                                onChange={onChange}
                                                                ref={contentRef}
                                                                style={{width: "100%"}}
                                                            />
                                                            <div className="col-md-2" style={{marginTop: "10px", paddingLeft:"0"}}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={register}>
                                                                    작성
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
}));

export default BoardRegister;