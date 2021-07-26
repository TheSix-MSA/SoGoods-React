import React, {Fragment, useRef, useState} from "react";
import getFormatDate from "../modules/getFormatDate";
import {useHistory, useLocation} from "react-router-dom";
import boardService from "./boardService";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";

const BlogPost = ({data, boardType}) => {
    const {roles} = useSelector(state => state.login)
    const history = useHistory()
    const location = useLocation()
    const {email, name} = useSelector(state => state.login)
    console.log(data)
    console.log(email, name)
    const goList = () => {
        history.push(`/board/${boardType}/list/1`)
    }
    const modify = () => {
        history.push(`/board/modify/${boardType}/${data.bno}`)
    }
    const remove = () => {
        if (window.confirm("삭제하시겠습니끼?")) {
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
                            <Button variant="outlined" style={{margin: "5px"}} onClick={() => {
                                goList()
                            }}>
                                목록가기
                            </Button>
                            {data.email === email ? (
                                <>
                                    <Button variant="outlined" style={{margin: "5px"}} onClick={() => {
                                        modify()
                                    }}>
                                        수정하기
                                    </Button>
                                    { data.email === email || roles.includes("ADMIN") ? (
                                    <Button variant="outlined" style={{margin: "5px"}} onClick={() => {
                                        remove()
                                    }}>
                                        삭제하기
                                    </Button>
                                    ) : null }
                                </>
                            ) : null
                            }
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
                        <div style={{overflowWrap: "break-word", textOverflow: "ellipsis"}}>
                            <h3>{data.title}</h3>
                        </div>
                        <p style={{overflowWrap: "break-word", textOverflow: "ellipsis"}}>
                            {data.content}
                        </p>
                    </div>
                </div>
            </Fragment>
        )
    );
};

export default BlogPost;
