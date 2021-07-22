import React from 'react';

const PageList = ({data, movePage}) => {

    return (
        <div>
            {data.pageMaker.prev && <button onClick={() => movePage(data.pageMaker.start-1)}>PREV</button>}
            {data.pageMaker.pageList.map(p => <button key={p} onClick={() => movePage(p)}>{p}</button>)}
            {data.pageMaker.next && <button onClick={() => movePage(data.pageMaker.end + 1)}>NEXT</button>}
        </div>
    );
};

export default PageList;