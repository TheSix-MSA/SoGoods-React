import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../components/layouts/header/LayoutOne";
import BlogPagination from "./BlogPagination";
import BlogPostsNoSidebar from "./BlogPostsNoSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getBoardData} from "../redux/board/boardAsyncService";
import {useHistory} from "react-router-dom";
import BoardSearch from "./BoardSearch";

const BlogNoSidebar = ({match}) => {
    const {boardDtoList, pageMaker} = useSelector(state => state.board);
    const dispatch = useDispatch()
    const history = useHistory()
    const currentPage = match.params.currentPage
    useEffect(() => {
        dispatch(getBoardData(currentPage))
    }, [currentPage, dispatch])
    const boardRegister = () => {
        history.push(`/boardRegister`)
    }
    return (
        <Fragment>
            <MetaTags>
                <meta
                    name="description"
                    content="Blog of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <div className="blog-area pt-100 pb-100 blog-no-sidebar">
                    <div className="container">
                        <div style={{display: "block", textAlign: "right", margin: "2rem"}}
                             onClick={boardRegister}> 글쓰기
                        </div>
                        <BoardSearch data = {boardDtoList} />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mr-20">
                                    <div className="row">
                                        {/* blog posts */}
                                        <BlogPostsNoSidebar boardData={boardDtoList} page={currentPage}/>
                                    </div>
                                    {/* blog pagination */}
                                    {pageMaker && <BlogPagination pageMaker={pageMaker}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};


BlogNoSidebar.propTypes = {
    location: PropTypes.object
};

export default BlogNoSidebar;
