import React, {useEffect, useState} from 'react';
import boardService from "./boardService";
import useInputs from "../customHooks/useInputs";
const initState = {
    type:'',
    keyword:'',
}
const BoardSearch = ({data}) => {
    const [search, onChange, setSearch] = useInputs(initState)

    console.log(search)
    return (
        <div>
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-55 mt-25">
                <form className="pro-sidebar-search-form" action="#">
                    <select name="type" style={{width:"10%"}} value={search.type} onChange={onChange} name="type">
                        <option value="t" selected="selected"> 제목 </option>
                        <option value="w"> 작성자 </option>
                        <option value="c"> 내용 </option>
                        <option value="tc"> 제목+내용 </option>
                    </select>
                    <input type="text" placeholder="Search here..." name="keyword" value={search.keyword} onChange={onChange}/>
                    <button style={{top:"70%"}} >
                        <i className="pe-7s-search" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BoardSearch;