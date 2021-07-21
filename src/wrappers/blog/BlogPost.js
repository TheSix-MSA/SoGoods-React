import React, {Fragment} from "react";
import getFormatDate from "../../modules/getFormatDate";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeBoard} from "../../board/boardAsyncService";

const BlogPost = ({data}) => {
    const history = useHistory()
    const dispatch = useDispatch
    console.log(1111111, data, history)
    const modify = (bno) => {
        history.push(`/board/modify/FREE/${bno}/:currentPage`)
    }
    const remove = (bno) => {
        dispatch(removeBoard(bno))
        history.push(process.env.PUBLIC_URL + 'blog-no-sidebar')
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
