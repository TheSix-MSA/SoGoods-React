import React, {Fragment} from 'react';
import getFormatDate from "../modules/getFormatDate";
import {useHistory} from "react-router-dom";

const BoardNotice = ({notice, page}) => {
    const history = useHistory()
    const moveDetail = (bno) => {
        history.push(`/board/NOTICE/${bno}`)
    }

    return (
        <Fragment>
            {notice && notice.private !== false && notice?.map((data, idx) => (
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="blog-wrap-2 mb-30" style={{backgroundColor:"#c60bc61c"}}>
                        <div className="blog-content-2">
                            <div className="blog-meta-2">
                                <ul key={idx} >
                                    <div style={{fontSize:"25px"}}> 공지사항 </div>
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

export default BoardNotice;