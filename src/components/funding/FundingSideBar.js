import React, {useState} from "react";
import { Link } from "react-router-dom";
import fundingService from "./fundingService";
import getLeftDate from "../../modules/dateCalc";
//
const BlogSidebar = (funding) => {
    const [cartList, setCartList] = useState(funding.productDTOs?.map(item=>{
        return {...item,count:0}}));

    const dueDate = funding.fundingDTO.dueDate;
    console.log(getLeftDate(dueDate),"일 남음"); // 남은 일 계산

    // 배열에 추가
    const addCart = (product) => {
        setCartList(cartList.map(p=>{
            if(p.pno === product.pno) return {...p,count:(p.count||0)+1}
            return p;
        }));
    }

    // 배열에서 삭제
    const deleteCart = (p) => {
        setCartList(cartList.map((item)=>{
            if(item.count <= 0) return {...item,count:0}
            if(item.pno === p.pno) return {...item,count:item.count-1}
            return item;
        }))
    }

    const productList = cartList.map((p, idx)=>
            <div className="single-sidebar-blog" key={idx}>
                <h5>{idx+1}번 리워드 </h5>
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
                        <div>
                            <button onClick={()=> deleteCart(p)}> - </button>
                            <div>{p.count}개</div>
                            <button onClick={()=> addCart(p)}> + </button>
                        </div>
                    </div>
                </div>
            </div>
    )

    const getDDay = () => {

        const today = new Date();
        const dday = new Date();
    }

    const selectReward =
         <div className="single-sidebar-blog" >
             <div>
                 <div>남은 기간 :</div>
                 <div>---% 달성</div>
                 <div>총 {funding.fundingDTO.totalAmount}원 펀딩</div>
                 <button>펀딩하기</button>
             </div>
         </div>


    return (
        <div className="sidebar-style">
            <div className="sidebar-widget mt-35">
                <h4>구매 칸 입니다</h4>
                {selectReward}
            </div>
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title"> 리워드 선택</h4>
                <div className="sidebar-project-wrap mt-30">
                </div>
                {productList}
            </div>
        </div>
    );
};

export default BlogSidebar;
