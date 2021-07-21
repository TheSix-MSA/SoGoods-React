import React from 'react';

const PageList = ({data, movePage}) => {

    const tempEnd = Math.ceil(data.pageMaker.page / 10.0)* 10;
    const totalPage = Math.ceil(data.pageMaker.totalCount / data.pageMaker.size);
    const start = 1;
    const end = totalPage > tempEnd ? tempEnd : totalPage;

    return (
        <div>
            {data.pageMaker.prev ? <button onClick={() => movePage(data.pageMaker.prev > 1 ? (tempEnd - 9)-1 : start-1)}>PREV</button> : <></>}
            {data.pageMaker.pageList.map(p => <button key={p} onClick={() => movePage(p)}>{p}</button>)}
            {data.pageMaker.next ? <button onClick={() => movePage(end + 1)}>NEXT</button> : <></>}
        </div>
    );
};

export default PageList;