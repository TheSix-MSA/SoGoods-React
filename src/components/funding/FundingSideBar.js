import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import fundingService from "./fundingService";
import getLeftDate from "../../modules/dateCalc";
import {useSelector} from "react-redux";
import ImgCarousel from "./ImgCarousel";

const initFavorite = {
    fno:0,
    email:''
}

const FundingSideBar = (funding) => {

    const history = useHistory();

    // 유저 정보
    const userInfo = useSelector(state=> state.login);
    // 주고 받을 찜 데이터
    const [favorite, setFavorite] = useState(initFavorite);
    // 화면에서 관리할 찜 데이터
    const [favCount, setFavCount] = useState(funding.favoriteCount);
    const [favList, setFavList] = useState([])
    // 장바구니 배열의 상태 관리 , 초기값 -> funding.productDTOs
    const [cartList, setCartList] = useState(funding.productDTOs?.map(item=>{
        return {...item,count:0}}));

    // 첫 화면에 좋아요 뿌려주기
    useEffect(()=>{
        fundingService.getFavList(funding.fundingDTO.fno).then(res=>
            setFavList(res.response.favoriteDTOList)
        )
    },[])

    /**
     * 장바구니 배열에 상품추가, 일치하는 값이 있으면 개수만 추가
     * @param product
     */
    const addCart = (product) => {
        setCartList(cartList.map(p=>{
            if(p.pno === product.pno) return {...p,count:(p.count||0)+1}
            return p;
        }));
    }
    console.log(cartList);

    /**
     * 장바구니 배열에서 일치하는 데이터를 삭제, count=0
     * @param p
     */
    const deleteCart = (p) => {
        setCartList(cartList.map((item)=>{
            if(item.count <= 0) return {...item,count:0}
            if(item.pno === p.pno) return {...item,count:item.count-1}
            return item;
        }))
    }

    /**
     * 게시글 찜하기 기능
     * 로그인한 유저 정보로 저장
     */
    const clickFavorite = () => {
        favorite.fno = funding.fundingDTO.fno
        favorite.email = userInfo.email
        setFavorite(favorite);
        fundingService.insertFavorite(favorite).then(res=> {
            setFavCount(res.response.favoriteCnt)
            setFavList(res.response.favoriteDTOList)
        })
    }

    /**
     * 해당 유저가 찜한 기록이 있는지 확인
     * @param ele
     * @returns {boolean}
     */
    const checkUser = (ele) => {
        if(ele.actor === userInfo.email){
            return true;
        }
    }

    /**
     * 수정 화면으로 이동
     * @param fno
     */
    const toUpdate = (fno) => {
        history.push("/funding/update/"+fno);
    }

    /**
     * 제품 리스트 뿌려주기
     * @type {unknown[]}
     */
    const productList = cartList.map((p, idx)=>
            <div className="single-sidebar-blog" key={idx}>
                <div>{idx+1}번 리워드 </div>
                <ImgCarousel></ImgCarousel>
                 <div className="sidebar-blog-img">
                    <div to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                        <img
                            src={
                                process.env.PUBLIC_URL + "/assets/img/blog/sidebar-1.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="sidebar-blog-content" >
                        <h4>{p.name}</h4>
                        <h6>[ 상세 설명 ]</h6>
                        <h6>{p.des}</h6>
                        {/* cart count button */}
                        <div style={{display:"flex"}}>
                            <button onClick={()=> deleteCart(p)}> - </button>
                                <div>{p.count}개</div>
                            <button onClick={()=> addCart(p)}> + </button>
                        </div>
                    </div>
                </div>
            </div>
    );


    // 사이드바에 제품 선택창 뿌려주기
    const selectReward = (
         <div className="single-sidebar-blog" >
             <div>
                 <h3>마감까지 {getLeftDate(funding.fundingDTO.dueDate)}일 남음</h3>
                 <br/>
                 <h4>{Math.ceil(funding.fundingDTO.totalAmount/funding.fundingDTO.targetAmount*100)}% 달성</h4>
                 <br/>
                 <h4>총 펀딩액 {funding.fundingDTO.totalAmount}원 </h4>
                 <br/>
                 {/* funding favorite */}
                 <div style={{width:"100%"}}>
                     <div style={{fontSize:"25px", lineHeight:"150%", cursor:"pointer",display:"flex"}} onClick={clickFavorite}>
                         { favList.find(checkUser) ? '💜':'♡'}
                        <div style={{fontSize:"20px", margin:"0 10px"}}>{favCount}</div>
                     </div>
                 </div>
                 {/* funding button */}
                 <form className={"searchform"}>
                     <Link to={{
                         pathname: "/checkout",
                         state: {
                             cartList
                         }
                     }}>
                         <button className={"searchform__submit"} style={{height:"50px", width:"100%", position:"relative", marginTop:"10px"}}>
                             펀딩 참여하기
                         </button>
                     </Link>
                 </form>
             </div>
         </div>
    );

    // 제품 수정 삭제 버튼 -> 로그인 했을 때만 보여짐
    const update = (
        <div style={{ height:"42px", display:"flex", flexWrap:"wrap",flexDirection:"column"}}>
            <form className={"searchform"}>
                <button className={"searchform__submit"} style={{height:"50px" ,position:"relative", margin:"5px 5px"}}
                        onClick={()=>toUpdate(funding.fundingDTO.fno)}>수정
                </button>
            </form>
            <form className={"searchform"} >
                <button className={"searchform__submit"} style={{height:"50px",position:"relative", margin:"5px 5px"}}
                        onClick={()=> deleteFunding(funding.fundingDTO.fno)}>삭제
                </button>
            </form>
            <hr/>
        </div>
    );

    // 펀딩 글 삭제 기능
    const deleteFunding = (fno) => {
        const result = window.confirm("정말 삭제하시겠습니까?");
        if(result){
            fundingService.removedFunding(fno).then(res=> {
                console.log(res);
                console.log(result);
                history.push("/funding/list");
            })
        }
    }

    return (
        <div className="sidebar-style">
            <div className="sidebar-widget mt-35">
                {selectReward}
                { userInfo.email !== "" && update}
            </div>
            <div className="sidebar-widget mt-40" >
                <h4 className="pro-sidebar-title"> 리워드 선택</h4>
                <div className="sidebar-project-wrap mt-30">
                    {productList}
                </div>
            </div>
        </div>
    );
};

export default FundingSideBar;
