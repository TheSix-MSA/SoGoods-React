import React, {useEffect, useState} from 'react';
import myAccountService from "./myAccountService";
import {useSelector} from "react-redux";
const initState = {
    page:1,
    size:10,
    email:""
}
const initNovelList = []
const MyNovel = () => {
    const user = useSelector(state => state.login);
    const [pager, setPager] = useState({...initState,email:user.email});
    const [novelList,setNovelList] = useState({...initNovelList})

    useEffect(() => {
        myAccountService.getNovelList(pager).then(value => {
            console.log(value.data);
            // setNovelList(value.data.response.novelsDTO)
        });

    },[pager.page])


    return (
        <div className="entries-wrapper" style={{marginBottom: "15px"}}>
            <div className="row">
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <img src="https://image.aladin.co.kr/product/61/50/coversum/8970127240_2.jpg"
                             alt=""/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-info text-center">
                        <p><strong>ISBN</strong></p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <button >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyNovel;