import React, {Fragment} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import LayoutOne from "../../layouts/LayoutOne";
import useInputs from "../../customHooks/useInputs";
import {modifyBoard} from "../../board/boardAsyncService";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const initState = {
    title: '',
    writer: '',
    email: '',
    content: ''
}

const BoardModify = ({match}) => {
    const [board, onChange] = useInputs(initState);
    const dispatch = useDispatch()
    const history = useHistory();
    const bno = match.params.bno
    const modify = () => {
        dispatch(modifyBoard(bno, board))
        history.push(`/board/FREE/${bno}`)
    }
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Blog Post</title>
                <meta
                    name="description"
                    content="Blog post page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-9">
                                <div className="blog-details-wrapper ml-20">
                                    <div className="blog-details-top">
                                        <div className="blog-details-content">
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
                                                                modify()
                                                            }}/>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* blog sidebar */}
                                <BlogSidebar/>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default BoardModify;
