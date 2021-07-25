import React, {useEffect, useState} from 'react';
import myAccountService from "./myAccountService";

const initState = {
    page:1,
    size:12,
    totalCount:0,
    pageList:[1],
    prev: false,
    next : false,
    start : 1,
    end: 1
}

const BoardPager = () => {
    const [pager,setPager] = useState({...initState});
    const [flag, setFlag] = useState(false);
    console.log("페이져래용~~~~~~~",pager)
    console.log("설정된 페이저", pager);

    const newPager = () => {
        setPager(myAccountService.getPager());
    };

    const changePage = (pageNum) => {
        myAccountService.movePage(pageNum);
        setFlag(!flag);
    };

    myAccountService.changePagerFlag(newPager);

    const pageLists = pager.pageList.map((value, index) =>
        pager.page===value?
        <div className="billing-btn" key={index}>
            <button style={{padding:"5px", background:"#C60BC6", color:"white"}} onClick={()=> {
                changePage(value)
            }}>{value}</button>
        </div>:
            <div className="billing-btn" key={index}>
                <button style={{padding:"5px"}} onClick={()=> {
                    changePage(value)
                }}>{value}</button>
            </div>
    )


    return (
        <div className="billing-back-btn" style={{display:"flex", justifyContent:"center"}}>
            {pageLists}
        </div>
    );
};

export default BoardPager;