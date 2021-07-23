import React, {useCallback, useRef} from 'react';
import useInputs from "../customHooks/useInputs";
import {useDispatch, useSelector} from "react-redux";
import LayoutOne from "../components/layouts/header/LayoutOne";
import Tab from "react-bootstrap/Tab";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

const BoardRegister = ({match}) => {
    const boardType = useRef(match.params.boardType?.toUpperCase())
    const [board, onChange, setBoard] = useInputs(initState);
    const history = useHistory()
    const {email, name} = useSelector(state => state.login)
    console.log(history)
    const register = () => {
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
                                                    <h3> 글작성 </h3>
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            <input
                                                                type={"text"}
                                                                name={"title"}
                                                                placeholder="Title"
                                                                value={board.title}
                                                                onChange={onChange}
                                                            />

                                                            <textarea
                                                                name={"content"}
                                                                placeholder="Content"
                                                                value={board.content}
                                                                onChange={onChange}
                                                            />
                                                            <div className="col-md-2">
                                                                <input type="button" value="작성" onClick={() => {
                                                                    register()
                                                                }}/>
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

export default BoardRegister;