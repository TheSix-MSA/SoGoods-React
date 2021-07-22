import React from "react";
import {useDispatch} from "react-redux";
import {movePage, nextPage, prevPage} from "../redux/board/boardSlice";
import {useHistory} from "react-router-dom";

const BlogPagination = ({pageMaker}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                {pageMaker.prev &&
                <li>
                    <button className="prev" onClick={() => {
                        history.push(`/board/FREE/list/${pageMaker.start - 1}`)
                        dispatch(prevPage(pageMaker.start))
                    }}>
                        <i className="fa fa-angle-double-left"/>
                    </button>
                </li>
                }
                {pageMaker.pageList?.map((data, idx) =>
                    <li key={idx}>
                        <button className="active" onClick={() => {
                            history.push(`/board/FREE/list/${data}`)
                            dispatch(movePage(data))
                        }}> {data} </button>
                    </li>
                )}
                {pageMaker.next &&
                <li>
                    <button className="next" onClick={() => {
                        history.push(`/board/FREE/list/${pageMaker.end + 1}`)
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
