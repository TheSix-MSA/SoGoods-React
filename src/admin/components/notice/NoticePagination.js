import React from 'react';

const NoticePagination = ({pageMaker, movePage}) => {
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                <li>
                    {pageMaker.prev === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(pageMaker.startPage - 1)}>
                            <i className="fa fa-angle-double-left"/>
                        </button>}
                </li>
                <li>
                    {pageMaker.pageList.map(page => page === pageMaker.page ?
                        <button style={{color: "black"}}><b>{page}</b></button> :
                        <button style={{color: "black"}} key={page} onClick={() => movePage(page)}>{page}</button>)}
                </li>
                <li>
                    {pageMaker.next === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(pageMaker.endPage + 1)}>
                            <i className="fa fa-angle-double-right"/>
                        </button>}
                </li>
            </ul>
        </div>
    );
};

export default NoticePagination;