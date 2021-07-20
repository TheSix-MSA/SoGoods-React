import React from 'react';
import useInputs from "../../customHooks/useInputs";
import {useSelector} from "react-redux";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from "../../layouts/LayoutOne";
import Tab from "react-bootstrap/Tab";

const BoardRegister = () => {
    const boardForm = useSelector(state => state.board.initialState)
    const [board, setBoard, onChange] = useInputs(boardForm);
    console.log(boardForm)
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
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            <form>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    placeholder="Title"
                                                                    onChange={onChange}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="writer"
                                                                    placeholder="Writer"
                                                                    onChange={onChange}
                                                                />
                                                                <textarea
                                                                    name="content"
                                                                    placeholder="Content"
                                                                    onChange={onChange}
                                                                />
                                                                <div className="button-box">
                                                                    <button>
                                                                        Submit
                                                                    </button>
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