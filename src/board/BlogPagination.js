import React from "react";
import {useDispatch} from "react-redux";
import {movePage, nextPage, prevPage} from "../redux/board/boardSlice";
import {useHistory} from "react-router-dom";

const BlogPagination = ({boardType, pageMaker, request}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                { pageMaker && pageMaker.prev !== false ? (
                    <li>
                        <button className="prev" onClick={() => {
                            history.push(`/board/${boardType}/list?page=${pageMaker.start - 1} &keyword=${request.keyword}&type=${request.type}`)
                            dispatch(prevPage(pageMaker.start))
                        }}>
                            <i className="fa fa-angle-double-left"/>
                        </button>
                    </li>
                ) : null
                }
                { request && pageMaker.pageList?.map((data, idx) =>
                    <li key={idx}>
                        <button className="active" onClick={() => {
                            history.push(`/board/${boardType}/list?page=${data}&keyword=${request.keyword}&type=${request.type}`)
                            dispatch(movePage(data))
                        }}> {data} </button>
                    </li>
                )}
                { pageMaker && pageMaker.next !== false ? (
                    <li>
                        <button className="next" onClick={() => {
                            history.push(`/board/${boardType}/list?page=${pageMaker.end + 1}&keyword=${request.keyword}&type=${request.type}`)
                            dispatch(nextPage(pageMaker.end))
                        }}>
                            <i className="fa fa-angle-double-right"/>
                        </button>
                    </li>
                ) : null
                }
            </ul>
        </div>
    );
}

export default BlogPagination;
