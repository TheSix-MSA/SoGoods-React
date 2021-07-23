import React from "react";
import {useDispatch} from "react-redux";
import {movePage, nextPage, prevPage} from "../redux/board/boardSlice";
import {useHistory} from "react-router-dom";

const BlogPagination = ({pageMaker, request}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(pageMaker)
    console.log(request)
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                {pageMaker &&
                    request &&
                <li>
                    <button className="prev" onClick={() => {
                        history.push(`/board/FREE/list?page=1&keyword=${request.keyword}&type=${request.type}`)
                        dispatch(prevPage(pageMaker.start))
                    }}>
                        <i className="fa fa-angle-double-left"/>
                    </button>
                </li>
                }
                {request && pageMaker.pageList?.map((data, idx) =>
                    <li key={idx}>
                        <button className="active" onClick={() => {
                            history.push(`/board/FREE/list?page=1&keyword=${request.keyword}&type=${request.type}`)
                            dispatch(movePage(data))
                        }}> {data} </button>
                    </li>
                )}
                {pageMaker &&
                    request &&
                <li>
                    <button className="next" onClick={() => {
                        history.push(`/board/FREE/list?page=1&keyword=${request.keyword}&type=${request.type}`)
                        dispatch(nextPage(pageMaker.end))
                    }}>
                        <i className="fa fa-angle-double-right"/>
                    </button>
                </li>
                }
            </ul>
        </div>
    );
}


export default BlogPagination;
