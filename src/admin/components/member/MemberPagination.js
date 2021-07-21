import React from "react";


const MemberPagination = ({members, prevPage, movePage, nextPage}) =>{
    return(
        <div style={{textAlign: "center"}}>
            {members.pageMaker.page !== 1 ?
                <span onClick={() => prevPage()}>Prev</span> : false}
            {members.pageMaker.pageList.map(page => page === members.pageMaker.page ?
                <span key={page}><b>{page}</b></span> :
                <span key={page} onClick={() => movePage(page)}>{page}</span>)}
            {members.pageMaker.next === false ? null :
                members.memberList.length === members.pageMaker.size ?
                    <span onClick={() => nextPage()}>Next</span> : false}
        </div>
    )

}

export default MemberPagination;