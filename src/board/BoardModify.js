import React, {Fragment} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../wrappers/blog/BlogSidebar";
import LayoutOne from "../layouts/LayoutOne";
import useInputs from "../customHooks/useInputs";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";

const initState = {
    title: '',
    content: '',
}

const BoardModify = ({match}) => {
    const [board, onChange, setBoard] = useInputs(initState)
    const bno = match.params.bno
    const history = useHistory();
    const modify = () => {
        boardService.modifyBoard(bno, board).then(res => {
            setBoard({...res})
        })
        history.push(`/board/FREE/${bno}`)
    }
     console.log(board)
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
