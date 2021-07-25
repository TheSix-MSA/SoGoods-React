import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const MemberPagination = ({members, movePage}) => {
    // const classes = useStyles();

    return (
        <div className="pro-pagination-style text-center mt-20">
            <ul>
                <li>
                    {members.pageMaker.prev === false ? null :
                        <button style={{color:"black"}} onClick={() => movePage(members.pageMaker.startPage - 1)}>
                            <i className="fa fa-angle-double-left"/>
                        </button>}
                </li>
                <li>
                {members.pageMaker.pageList.map(page => page === members.pageMaker.page ?
                    <button style={{color:"black"}}><b>{page}</b></button> :
                    <button style={{color:"black"}} key={page} onClick={() => movePage(page)}>{page}</button>)}
                </li>
                <li>
                    {members.pageMaker.next === false ? null :
                        <button style={{color:"black"}} onClick={() => movePage(members.pageMaker.endPage + 1)}>
                            <i className="fa fa-angle-double-right"/>
                        </button>}
                </li>
            </ul>
        </div>
    );
};

// const useStyles = makeStyles((theme) => ({
//     root:{
//         color:"black"
//     }
// }));

export default MemberPagination;