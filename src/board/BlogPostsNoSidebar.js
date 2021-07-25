import React, {Fragment} from "react";
import {useHistory} from "react-router-dom";
import getFormatDate from "../modules/getFormatDate";
import BoardNotice from "./BoardNotice";

const BlogPostsNoSidebar = ({boardData, boardType}) => {
    const history = useHistory();
    const moveDetail = (bno) => {
        history.push(`/board/${boardType}/${bno}`)
    }
    console.log(boardData)
    return (
        <Fragment>
            {boardData && boardData?.map((data, idx) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={idx}>
                    <div className="blog-wrap-2 mb-30">
                        <div className="blog-content-2">
                            <div className="blog-meta-2">
                                <ul key={idx}>
                                    {data.private === false &&
                                    <li>
                                        {getFormatDate(new Date(data.modDate))}
                                        <span style={{display: "inline-block", paddingLeft: "10px"}}>
                                            {data.replyCnt} <i className="fa fa-comments-o"/>
                                        </span>
                                    </li>
                                    }
                                </ul>
                            </div>
                            <h4>
                                <div onClick={()=>{moveDetail(data.bno)}}>
                                    {data.title}
                                </div>
                            </h4>
                            <p>
                                {data.content}
                            </p>
                            <div className="blog-share-comment">
                                <div className="blog-btn-2">
                                    <div onClick={()=>{moveDetail(data.bno)}}>
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
