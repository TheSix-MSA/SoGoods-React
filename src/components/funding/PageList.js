import React from 'react';
import {useHistory} from "react-router-dom";

const PageList = (data) => {

    const history = useHistory();

    const movePage = (page) => {
        console.log("movePage")
        const url = '/funding/list?page='+page;
        history.push(url);
    }

    return (
        <div>
            {data.pageMaker.prev ? <button onClick={()=> movePage(data.pageMaker.start-1)}>PREV</button> : <></>}
            {data.pageMaker.pageList.map(p=> <button key={p} onClick={()=>movePage(p)}>{p}</button>)}
            {data.pageMaker.prev ? <button onClick={()=> movePage(data.pageMaker.end+1)}>NEXT</button> : <></>}
        </div>
    );
};

export default PageList;