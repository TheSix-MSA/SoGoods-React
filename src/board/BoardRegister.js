import React, {useCallback} from 'react';
import useInputs from "../customHooks/useInputs";
import {useDispatch} from "react-redux";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from "../layouts/LayoutOne";
import Tab from "react-bootstrap/Tab";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

const BoardRegister = () => {
    const [board, onChange, setBoard] = useInputs(initState);
    const history = useHistory()
    const registe = () => {
        boardService.registerBoard(board).then(res => {
            setBoard({...res})
        })
        history.push('/board/FREE/list/1')
    }
    return (
        <>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
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
                                                            <form>
                                                                <input
                                                                    type={"text"}
                                                                    name={"title"}
                                                                    placeholder="Title"
                                                                    value={board.title}
                                                                    onChange={onChange}
                                                                />
                                                                <input
                                                                    type={"text"}
                                                                    name={"writer"}
                                                                    placeholder="Writer"
                                                                    value={board.writer}
                                                                    onChange={onChange}
                                                                />
                                                                <input
                                                                    type={"text"}
                                                                    name={"email"}
                                                                    placeholder="Email"
                                                                    value={board.email}
                                                                    onChange={onChange}
                                                                />
                                                                <textarea
                                                                    name={"content"}
                                                                    placeholder="Content"
                                                                    value={board.content}
                                                                    onChange={onChange}
                                                                />
                                                                <div className="col-md-2">
                                                                    <input type="submit" onClick={() => {
                                                                        registe()
                                                                    }}/>
                                                                </div>
                                                            </form>
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