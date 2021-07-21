import React, {useState} from "react";
import { Link } from "react-router-dom";
import fundingService from "./fundingService";

const initState = {
    products:[]
}
const BlogSidebar = (funding) => {

    const [cartList, setCartList] = useState(initState);
    const [cnt, setCnt] = useState(0)

    // funding.productDTOs.map(product=> {
    //     product.cnt = cnt;
    //     setCnt(product.cnt);
    // })

    const dueDate = funding.fundingDTO.dueDate;
    console.log(dueDate);
    // const strArr = dueDate.split("-", 2);
    // strArr.map((i)=> console.log(i));


    // 배열에 추가
    const addCart = (product) => {
        cartList.products.push(product);
        setCartList({...cartList});
        console.log(cartList);
    }

    // 배열에서 삭제
    const deleteCart = (p) => {
        const target = cartList.products.indexOf(p, 1);
        cartList.products.splice(target, 1);
        console.log(cartList)
        setCartList({...cartList});
    }


    const productList = funding.productDTOs.map((p, idx)=>
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
                            <div>{p.cnt}</div>
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
