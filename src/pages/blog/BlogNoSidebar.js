import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPostsNoSidebar from "../../wrappers/blog/BlogPostsNoSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getBoardData} from "../../board/boardAsyncService";
import {useHistory} from "react-router-dom";



const BlogNoSidebar = () => {
    const {boardDtoList, pageMaker} = useSelector(state => state.board);
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getBoardData(pageMaker.page));
    }, [history, boardDtoList.bno, pageMaker.page])
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
                <Breadcrumb/>
                <div className="blog-area pt-100 pb-100 blog-no-sidebar">
                    <div className="container">
                        <div style={{display: "block", textAlign: "right", margin: "2rem"}}
                             onClick={boardRegister}> 글쓰기
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mr-20">
                                    <div className="row">
                                        {/* blog posts */}
                                        <BlogPostsNoSidebar boardData={boardDtoList} />
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
