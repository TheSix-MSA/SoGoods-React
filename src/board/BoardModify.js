import React, {Fragment, useEffect, useRef} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../components/layouts/header/LayoutOne";
import useInputs from "../customHooks/useInputs";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";
import {useToasts} from "react-toast-notifications";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ToastTopRight} from "../modules/toastModule";

const initState = {
    title: '',
    content: '',
}

const BoardModify = ({match}) => {
    const {addToast} = useToasts()
    const [board, onChange, setBoard] = useInputs(initState)
    const bno = useRef(match.params.bno)
    const boardType = useRef(match.params.boardType?.toUpperCase())
    const history = useHistory();
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
    const modify = () => {
        if (!board.title) {
            ToastTopRight("💨제목을 입력해주세요.");
            return;
        } else if (!board.content) {
            ToastTopRight("💨내용을 입력해주세요.");
            return;
        }

        boardService.modifyBoard(bno.current, board, boardType.current).then(res => {
            setBoard({...res})
            if (boardType.current.includes("NOTICE")) {
                history.push(`/admin/dashboard`)
            } else {
                history.push(`/board/${boardType.current}/${bno.current}`)
            }
        })
    }

    useEffect(() => {
        boardService.getOneBoard(bno.current).then(res => {
            setBoard(res.data.response)
        })
    }, [])

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="blog-details-wrapper ml-20">
                            <div className="blog-details-top">
                                <div className="blog-details-content">
                                    <div className="login-form-container">
                                        <h3> {boardName} 글수정 </h3>
                                        <div className="login-register-form">
                                            <form>
                                                <TextField
                                                    id="standard-basic"
                                                    label="제목"
                                                    name={"title"}
                                                    value={board.title || ""}
                                                    onChange={onChange}
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
                                                    value={board.content || ""}
                                                    onChange={onChange}
                                                    style={{width: "100%"}}
                                                />
                                                <div className="col-md-2" style={{marginTop: "10px", paddingLeft: "0"}}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            modify()
                                                        }}> 수정
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default BoardModify;
