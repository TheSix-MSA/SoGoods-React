import React from "react";
import {useDispatch} from "react-redux";
import {movePage, nextPage, prevPage} from "../../board/boardSlice";

const BlogPagination = ({pageMaker}) => {
    const dispatch = useDispatch();
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                {pageMaker.prev &&
                <li>
                    <button className="prev" onClick={() => {
                        dispatch(prevPage(pageMaker.start))
                    }}>
                        <i className="fa fa-angle-double-left"/>
                    </button>
                </li>
                }
                {pageMaker.pageList?.map((data, idx) =>
                    <li key={idx}>
                        <button className="active" onClick={() => {
                            dispatch(movePage(data))
                        }}> {data} </button>
                    </li>
                )}
                {pageMaker.next &&
                <li>
                    <button className="next" onClick={() => {
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
