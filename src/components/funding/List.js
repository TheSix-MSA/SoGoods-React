import React, {useEffect, useState} from 'react';
import fundingService from "./fundingService";
import {useHistory} from "react-router-dom";

const initState= {
    listRequestDTO:{},
    dtoList:[],
    pageMaker:{
        next: false,
        page: 1,
        pageList: [],
        prev: false,
        size: 0,
        totalCount:0
    }
}
const List = () => {

    const [data, setData] = useState(initState)
    const [flag, setFlag] = useState(false)

    useEffect(()=> {
        const result = fundingService.getList(data.pageMaker.page).then(res=>{
            console.log(res.response)
            setData(res.response)
        })
    }, [data.pageMaker.page])

    const list = data.dtoList.map((dto, idx)=> <li key={idx}>{dto.fundingDTO.fno}--{dto.fundingDTO.title}</li>)


    return (
        <div>
            <h1>{list}</h1>
        </div>
    );
};

const PageList = ({pageList, prev,next, start,first,end}) => {

    const history = useHistory()

    const movePage = (num) => {
        console.log('movePage..', num)
        const targetURL = "/todo/list?page=" + num

        history.push(targetURL)
    }

    return (
        <>
            {prev ? <button onClick={() => movePage(start - 1)}>PREV</button> : <></>}

            {pageList.map(p => <button key={p} onClick={() => movePage(p)}>{p}</button>)}

            {next ? <button onClick={() => movePage(end + 1)}>NEXT</button> : <></>}
        </>
    )

}

export default List;