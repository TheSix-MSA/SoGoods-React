import React, {Fragment, useState} from "react";
import getFormatDate from "../modules/getFormatDate";
import {useHistory} from "react-router-dom";
import boardService from "./boardService";

const BlogPost = ({data}) => {
    const history = useHistory()
    const modify = (bno) => {
        history.push(`/board/modify/FREE/${bno}`)
    }
    const remove = (bno) => {
        if(window.confirm("삭제하시겠습니끼?")) {
            boardService.removeBoard(bno).then(res => {
            history.push(`/board/FREE/list/1`)
            })
        }
    }

    return (
        data && (
            <Fragment>
                <div className="blog-details-top">
                    <div className="blog-details-content">
                        <ul style={{textAlign: "right"}}>
                            <li onClick={()=>{modify(data.bno)}}>
                                수정하기
                            </li>
                            <li onClick={()=>{remove(data.bno)}}>
                                삭제하기
                            </li>
                        </ul>
                        <div className="blog-meta-2">
                            <ul>
                                <li>{getFormatDate(new Date(data.modDate))}</li>
                            </ul>
                            <ul>
                                <li> {data.writer}
                                </li>
                                <li>
                                    {data.replyCnt} <i className="fa fa-comments-o"/>
                                </li>
                            </ul>
                        </div>
                        <h3>{data.title}</h3>
                        <p>
                            {data.content}
                        </p>
                    </div>
                </div>
            </Fragment>
        )
    );
};

export default BlogPost;
