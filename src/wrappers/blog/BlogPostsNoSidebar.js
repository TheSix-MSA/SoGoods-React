import React, {Fragment} from "react";
import {Link, useHistory} from "react-router-dom";
import getFormatDate from "../../modules/getFormatDate";

const BlogPostsNoSidebar = ({boardData, currentPage}) => {
    const history = useHistory();

    return (
        <Fragment>
            {boardData?.map((data, idx) => (
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="blog-wrap-2 mb-30">
                        <div className="blog-content-2">
                            <div className="blog-meta-2">
                                <ul key={idx}>
                                    <li>
                                        {getFormatDate(new Date(data.modDate))}
                                        <span style={{display: "inline-block", paddingLeft: "10px"}}>
                                            {data.replyCnt} <i className="fa fa-comments-o"/>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <h4>
                                <div onClick={()=>{history.push(`/board/FREE/${data.bno}/${currentPage}`)}}>
                                    {data.title}
                                </div>
                            </h4>
                            <p>
                                {data.content}
                            </p>
                            <div className="blog-share-comment">
                                <div className="blog-btn-2">
                                    <div onClick={()=>{history.push(`/board/FREE/${data.bno}/${currentPage}`)}}>
                                        더보기
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default BlogPostsNoSidebar;
