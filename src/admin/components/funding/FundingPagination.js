import React from "react";

const FundingPagination = ({funding, movePage}) => {
    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                <li>
                    {funding.pageMaker.prev === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(funding.pageMaker.startPage - 1)}>
                            <i className="fa fa-angle-double-left"/>
                        </button>}
                </li>
                <li>
                    {funding.pageMaker.pageList.map(page => page === funding.pageMaker.page ?
                        <button style={{color: "black"}}><b>{page}</b></button> :
                        <button style={{color: "black"}} key={page} onClick={() => movePage(page)}>{page}</button>)}
                </li>
                <li>
                    {funding.pageMaker.next === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(funding.pageMaker.endPage + 1)}>
                            <i className="fa fa-angle-double-right"/>
                        </button>}
                </li>
            </ul>
        </div>
    );
};

export default FundingPagination;