import React, {useEffect, useState} from 'react';
import myAccountService from "./myAccountService";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const initBoardList = {
    boardListRequestDTO:{
        page:1,
        size:12,
    },
    boardDtoList:[
        {
            bno:"",
            title:"",
            writer:"",
            email:"",
            regDate:""
        }
    ]
    ,pageMaker:{
        page:1,
        size:12,
        totalCount:0,
        pageList:[1],
        prev:false,
        next:false,
        start:1,
        end:1
    },
    type:"FREE"
};
const MyBoardList = () => {
    const history = useHistory();
    const user = useSelector(state => state.login);
    const [boardList, setBoardList] = useState({...initBoardList});



    console.log(boardList);
    /**
     * 리스트 가져오기
     */
    useEffect(() => {
        console.log(`email:${user.email}, type:${boardList.type}, page:${boardList.pageMaker.page}`)
        myAccountService.getOneBoardList({email:user.email, type:boardList.type, page:boardList.pageMaker.page})
            .then(value => {
                console.log("useEffect", value.data.response);
                setBoardList({...value.data.response, type: boardList.type});
                myAccountService.setPager(value.data.response.pageMaker);
        });
    }, [boardList.pageMaker.page]);


    const movePage = (newPage) =>{
        setBoardList({...boardList,pageMaker: {...boardList.pageMaker,page:newPage}})
    }

    const goBoard = (bno) =>{
        history.push(`/board/FREE/${bno}`);
    }

    myAccountService.setMovePage(movePage);




    /**
     * 랜더링 될 novel 한개.
     * @type {unknown[]}
     */
    const boards = boardList.boardDtoList.map((board, idx) =>
        <tr key={idx} onClick={()=> {
            goBoard(board.bno);
        }}>
            <td style={{textAlign: "center"}}>{boardList.type}</td>
            <td style={{padding: "3px 10px"}}>{board.title}</td>
            <td style={{textAlign: "center"}}>{board.regDate.substring(0,10)}</td>
        </tr>);


    return (
        <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead style={{borderBottom:"1px solid #ebebeb"}}>
                <tr style={{textAlign:"center"}}>
                    <th style={{width:"10%"}}>type</th>
                    <th>title</th>
                    <th style={{width:"20%"}}>regDate</th>
                </tr>
            </thead>
            <tbody>
                {boards}
            </tbody>
        </table>
    );
};

export default MyBoardList;