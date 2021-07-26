import React from "react";

const MemberPagination = ({members, movePage}) => {

    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                <li>
                    {members.pageMaker.prev === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(members.pageMaker.startPage - 1)}>
                            <i className="fa fa-angle-double-left"/>
                        </button>}
                </li>
                <li>
                    {members.pageMaker.pageList.map(page => page === members.pageMaker.page ?
                        <button style={{color: "black"}}><b>{page}</b></button> :
                        <button style={{color: "black"}} key={page} onClick={() => movePage(page)}>{page}</button>)}
                </li>
                <li>
                    {members.pageMaker.next === false ? null :
                        <button style={{color: "black"}} onClick={() => movePage(members.pageMaker.endPage + 1)}>
                            <i className="fa fa-angle-double-right"/>
                        </button>}
                </li>
            </ul>
        </div>
    );
};

export default MemberPagination;