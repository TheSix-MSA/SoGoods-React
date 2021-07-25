import React from 'react';

const NoticePagination = ({pageMaker,movePage}) => {
    return (
        <div style={{textAlign: "center"}}>
            {pageMaker.prev === false ? null :
                <span onClick={() => movePage(pageMaker.start-1)}>Prev</span>}
            {pageMaker.pageList.map(page => page === pageMaker.page ?
                <span key={page}><b>{page}</b></span> :
                <span key={page} onClick={() => movePage(page)}>{page}</span>)}
            {pageMaker.next === false ? null :
                <span onClick={() => movePage(pageMaker.end+1)}>Next</span> }
        </div>
    );
};

export default NoticePagination;