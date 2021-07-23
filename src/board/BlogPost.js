import React, {Fragment, useRef, useState} from "react";
import getFormatDate from "../modules/getFormatDate";
import {useHistory, useLocation} from "react-router-dom";
import boardService from "./boardService";

const BlogPost = ({data, boardType}) => {
    const history = useHistory()
    const location = useLocation()
    const goList = () => {
        history.push(`/board/${boardType}/list/1`)
    }
    const modify = () => {
        history.push(`/board/modify/${boardType}/${data.bno}`)
    }
    const remove = () => {
        if(window.confirm("삭제하시겠습니끼?")) {
            boardService.removeBoard(data.bno, boardType).then(res => {
            history.push(`/board/${boardType}/list/1`)
            })
        }
    }

    return (
        data && (
            <Fragment>
                <div className="blog-details-top">
                    <div className="blog-details-content">
                        <ul style={{textAlign: "right"}}>
                            <li onClick={()=>{goList()}}>
                                목록가기
                            </li>
                            <li onClick={()=>{modify()}}>
                                수정하기
                            </li>
                            <li onClick={()=>{remove()}}>
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
