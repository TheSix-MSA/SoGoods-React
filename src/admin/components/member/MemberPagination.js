import React from "react";


const MemberPagination = ({members, movePage}) =>{
    return(
        <div style={{textAlign: "center"}}>
            {members.pageMaker.prev === false ? null :
                <span onClick={() => movePage(members.pageMaker.startPage-1)}>Prev</span>}
            {members.pageMaker.pageList.map(page => page === members.pageMaker.page ?
                <span key={page}><b>{page}</b></span> :
                <span key={page} onClick={() => movePage(page)}>{page}</span>)}
            {members.pageMaker.next === false ? null :
                    <span onClick={() => movePage(members.pageMaker.endPage+1)}>Next</span> }
        </div>
    )

}

export default MemberPagination;