import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "./BlogPagination";
import BlogPostsNoSidebar from "./BlogPostsNoSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getBoardData} from "../redux/board/boardAsyncService";
import {useHistory, useLocation} from "react-router-dom";
import useInputs from "../customHooks/useInputs";
import * as queryString from "querystring";
import boardService from "./boardService";

const initState = {
    type:'',
    keyword: ''
}

const BlogNoSidebar = ({match}) => {
    const {boardDtoList, pageMaker} = useSelector(state => state.board);
    const location = useLocation()
    const value = queryString.parse(location.search.replace("?",""));
    console.log(value)
    console.log(value.page)
    console.log(value.keyword)
    console.log(value.type)

    const dispatch = useDispatch()
    const history = useHistory()
    const currentPage = match.params.currentPage
    useEffect(() => {
        dispatch(getBoardData(currentPage))
    }, [currentPage, dispatch])

    const boardRegister = () => {
        history.push(`/boardRegister`)
    }
    const [search, onChange] = useInputs(initState)
    const searching = (search) => {
        boardService.modifyBoard(search.type, search.keyword).then(res => {
            boardDtoList({...res.data})
        })

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
                        <h4 className="pro-sidebar-title">Search </h4>
                        <div className="pro-sidebar-search mb-55 mt-25">
                            <form className="pro-sidebar-search-form" action="#">
                                <select name="type" style={{width:"10%"}} value={search.type} onChange={onChange} name="type">
                                    <option value="t" selected> 제목 </option>
                                    <option value="w"> 작성자 </option>
                                    <option value="c"> 내용 </option>
                                    <option value="tc"> 제목+내용 </option>
                                </select>
                                <input type="text" placeholder="Search here..." name="keyword" value={search.keyword} onChange={onChange}/>
                                <button style={{top:"70%"}} onClick={()=>{searching()}}>
                                    <i className="pe-7s-search" />
                                </button>
                            </form>
                        </div>
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
