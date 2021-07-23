import PropTypes from "prop-types";
import React, {Fragment, useEffect, useRef, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../components/layouts/header/LayoutOne";
import BlogComment from "../components/reply/BlogComment";
import BlogPost from "./BlogPost";
import {useDispatch} from "react-redux";
import boardService from "./boardService";

const initState = {
    bno: 0,
    title: '',
    writer: '',
    boardType: '',
    content: '',
    email: '',
    isPrivate: 0,
    removed: 0,
    replyCnt: 0,
    modDate: '',
    regDate: ''
}

const BlogDetailsStandard = ({location, match}) => {
    const [detailData, setDetailData]  = useState(initState)
    const bno = useRef(match.params.bno)
    const boardType = useRef(match.params.boardType?.toUpperCase())
    const {pathname} = location;
    const dispatch = useDispatch();
    useEffect(() => {
        boardService.getOneBoard(bno.current).then(res => {
            setDetailData({...res.data.response})
        })
    }, [bno, dispatch])
    return (
            <Fragment>
                <MetaTags>
                    <title>Flone | Blog Post</title>
                    <meta
                        name="description"
                        content="Blog post page of flone react minimalist eCommerce template."
                    />
                </MetaTags>
                <LayoutOne headerTop="visible">
                    {/* breadcrumb */}
                    <div className="blog-area pt-100 pb-100">
                        <div className="container">
                            <div className="row flex-row-reverse">
                                <div className="col-lg-9">
                                    <div className="blog-details-wrapper ml-20">
                                        {detailData && (
                                        <BlogPost data={detailData} boardType={boardType.current}/>
                                        )}
                                        {/* blog post comment */}
                                        <BlogComment bno={bno.current}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutOne>
            </Fragment>

    );
};

BlogDetailsStandard.propTypes = {
    location: PropTypes.object
};

export default BlogDetailsStandard;
