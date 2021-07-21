import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPost from "../../wrappers/blog/BlogPost";
import {useDispatch} from "react-redux";
import {getOneBoard} from "../../board/boardAsyncService";

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
    const bno = match.params.bno
    const {pathname} = location;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneBoard(bno)).unwrap().then(res => {
            setDetailData({...res})
        })
    }, [bno,dispatch])
    const data = detailData.response
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
                <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                    Blog Post
                </BreadcrumbsItem>
                <LayoutOne headerTop="visible">
                    {/* breadcrumb */}
                    <Breadcrumb/>
                    <div className="blog-area pt-100 pb-100">
                        <div className="container">
                            <div className="row flex-row-reverse">
                                <div className="col-lg-9">
                                    <div className="blog-details-wrapper ml-20">
                                        {data (
                                        <BlogPost data={data}/>
                                        )}
                                        {/* blog post comment */}
                                        <BlogComment/>
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

BlogDetailsStandard.propTypes = {
    location: PropTypes.object
};

export default BlogDetailsStandard;
