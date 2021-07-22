import React from "react";

const FundingPagination =({funding},{movePage})=>{
    return(
        <div style={{textAlign: "center"}}>
            {funding.pageMaker.prev === false ? null :
                <span onClick={() => movePage(funding.pageMaker.startPage-1)}>Prev</span>}
            {funding.pageMaker.pageList.map(page => page === funding.pageMaker.page ?
                <span key={page}><b>{page}</b></span> :
                <span key={page} onClick={() => movePage(page)}>{page}</span>)}
            {funding.pageMaker.next === false ? null :
                    <span onClick={() => movePage(funding.pageMaker.endPage+1)}>Next</span>}
        </div>
    )
}

export default FundingPagination;