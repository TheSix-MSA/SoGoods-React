// import React from "react";
//
// const FundingPagination =({fundings},{movePage})=>{
//     return(
//         <div style={{textAlign: "center"}}>
//             {/*{fundings.pageMaker.page !== 1 ?*/}
//             {/*    <span onClick={() => prevPage()}>Prev</span> : false}*/}
//             {fundings.pageMaker.pageList.map(page => page === fundings.pageMaker.page ?
//                 <span key={page}><b>{page}</b></span> :
//                 <span key={page} onClick={() => movePage(page)}>{page}</span>)}
//             {/*{members.pageMaker.next === false ? null :*/}
//             {/*    members.memberList.length === members.pageMaker.size ?*/}
//             {/*        <span onClick={() => nextPage()}>Next</span> : false}*/}
//         </div>
//     )
// }
//
// export default FundingPagination;