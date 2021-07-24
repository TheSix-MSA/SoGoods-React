import React, {useEffect, useState} from 'react';
import myAccountService from "./myAccountService";
import {useSelector} from "react-redux";
const initState = {
    page:1,
    size:5,
    email:"",
    prev:false,
    next:false,
    pageList:[]
}
const initNovelList =
    [
        {
            isbn:"",
            title:"",
            image:"",
            publisher:"",
            email:"",
            nno:""
        }
    ]
const MyNovel = () => {
    const user = useSelector(state => state.login);
    const [pager, setPager] = useState({...initState,email:user.email});
    const [novelList, setNovelList] = useState([...initNovelList]);
    const [flag, setFlag] = useState(false);

    /**
     * 화면전환용 Flag
     */
    const changeFlag = () => {
        setFlag(!flag);
    };

    myAccountService.setListFlag(changeFlag);


    /**
     * 리스트 가져오기
     */
    useEffect(() => {
        myAccountService.getNovelList(pager).then(value => {
            setNovelList(value.data.response.novelsDTO);
            setPager({...value.data.response.pageMaker,email:user.email});
        });

    }, [flag,pager.page]);

    /**
     * 소설의 삭제정보를 삭제로 바꾼다.
     *
     * @param novel
     */
    const removeNovel = (novel) => {
        myAccountService.removeNovel(novel).then(value => {
            setFlag(!flag);
        });
    };

    /**
     * 페이지 이동.
     * @param moveNum
     */
    const movePages = (moveNum) => {
        setPager({...pager, page: pager.page + moveNum})
    };


    /**
     * 랜더링 될 novel 한개.
     * @type {unknown[]}
     */
    const novels = novelList.map((novel,idx) =>
        <div key={idx} className="entries-wrapper" style={{marginBottom: "15px"}}>
            <div className="row">
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <img src={novel.image}
                             alt=""/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-info ">
                        <p style={{fontSize:"12px"}}><strong>ISBN :</strong>{novel.isbn}</p>
                        <p style={{fontSize:"12px"}}><strong>Title :</strong>{novel.title}</p>
                        <p style={{fontSize:"12px"}}><strong>Publisher :</strong>{novel.publisher}</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <button onClick={()=>{removeNovel(novel)}}>Delete</button>
                    </div>
                </div>
            </div>
        </div>)


    return (
        <>
            {novels}
            <div className="billing-back-btn">
                <div className="billing-btn">
                    {pager.page > 1 ?
                        <button onClick={() => {movePages(-1);}}>Prev</button>
                        : <button disabled style={{background: "lightgray"}}>Prev</button>
                    }

                    {
                        pager.page !== pager.endPage && pager.endPage > 1 ?
                        <button style={{marginLeft: "10px"}} onClick={() => {movePages(1);}}>Next</button> :
                        <button  disabled style={{background: "lightgray", marginLeft: "10px"}}>Next</button>
                    }
                </div>
            </div>
        </>
    );
};

export default MyNovel;