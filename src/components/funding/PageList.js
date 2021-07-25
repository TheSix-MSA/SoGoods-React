import React from 'react';

const PageList = ({data, movePage}) => {

    return (
        <div>
            <div className="pro-pagination-style text-center mt-20">
                <ul>
                    {data.pageMaker &&
                    <li>
                        <button className="prev" onClick={() => movePage(data.pageMaker.start-1)}>
                            <i className="fa fa-angle-double-left"/>
                        </button>
                    </li>
                    }
                    {data.pageMaker.pageList?.map((p) =>
                        <li key={p}>
                            <button className="active" onClick={()=> movePage(p)}> {p} </button>
                        </li>
                    )}
                    {data.pageMaker &&
                    <li>
                        <button className="next" onClick={() => movePage(data.pageMaker.end + 1)}>
                            <i className="fa fa-angle-double-right"/>
                        </button>
                    </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default PageList;