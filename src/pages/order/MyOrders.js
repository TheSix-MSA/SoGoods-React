import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import orderServices from "../../service/orderServices";

const initState = {
    page:1,
    size:5,
    prev:false,
    next:false,
    pageList:[]
}

const initDto =
    [
        {
            dto: {
                ono: 2,
                buyer: "buyer@hogang.mem",
                receiverName: "Ho-Gang2",
                receiverAddress: "Ho-Gu-si2, Ba-Bo-ro2",
                receiverDetailedAddress: "asdsadsadadasd2",
                receiverPhone: "010-1111-2222",
                receiverRequest: "없음",
                tid: "T2922580376100257874",
                shippedDate: null,
                cancelledDate: null,
                products: null,
                regDate: "2021-07-24",
                modDate: "2021-07-24"
            },
            totalPrices: 4,
            prodNames: "bbb, aaa"
        }
    ]

const MyOrders = () => {
    const user = useSelector(state => state.login);
    const [pager, setPager] = useState({...initState,email:user.email});
    const [prodsList, setProdList] = useState([...initDto]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        orderServices.ordersUserMade({page: pager.page, email: user.email, sortingCond: ""}).then(r => {
            setProdList(r.data.response.resDto);
            console.log(r)
        })
    }, [flag, pager.page]);

    const cancelOrder = async (prod) => {
        console.log(process.env.REACT_APP_KAKAO_PAY_CID, prod)

        await orderServices.cancelKakaoPay({
            tid: prod.dto.tid,
            amount: prod.totalPrices,
            taxAmount: 0
        })

        // orderServices.cancelOrdersUserMade(prod.dto.ono).then(r =>
        //     setFlag(!flag))
    };

    const movePages = (moveNum) => {
        setPager({...pager, page: pager.page + moveNum})
    };

    const prods = prodsList.map((prod,idx) =>
        <div key={idx} className="entries-wrapper" style={{marginBottom: "15px"}}>
            <div className="row">
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <img src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hW1/image/EHQETyXIsC9eAhp8xPPGkYNTkJc.jpg"
                             alt="" style={{maxWidth:"350px"}}/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-info ">
                        <p style={{fontSize:"12px"}}><strong>상품 정보 :</strong> {prod.prodNames}</p>
                        <p style={{fontSize:"12px"}}><strong>가격 :</strong> {prod.totalPrices} 원</p>
                        <p style={{fontSize:"12px"}}><strong>수령인 :</strong> {prod.dto.receiverName}</p>
                        <p style={{fontSize:"12px"}}><strong>배송지 :</strong> {prod.dto.receiverAddress +", "+prod.dto.receiverDetailedAddress}</p>
                        <p style={{fontSize:"12px"}}><strong>구매 날짜 :</strong> {prod.dto.regDate}</p>
                        <p style={{fontSize:"12px"}}><strong>배송 :</strong> {prod.dto.shippedDate?prod.dto.shippedDate:"배송전"}</p>
                        <p style={{fontSize:"12px"}}><strong>배송시 주의 사항 :</strong> {prod.dto.receiverRequest}</p>
                        {prod.dto.cancelledDate?<p style={{fontSize:"12px"}}><strong> 취소 일자 :</strong>{prod.dto.cancelledDate}</p>:
                            <div className="entries-edit-delete text-center">
                                <button onClick={()=>{cancelOrder(prod)}}>취소</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>)


    return (
        <>
            {prods}
            <div className="billing-back-btn">
                <div className="billing-btn">
                    {pager.page>1?<button onClick={()=> {
                        movePages(-1);
                    }}>Prev</button>:<button disabled style={{background:"lightgray"}}>Prev</button>}
                    {pager.next<pager.pageList.length?<button style={{marginLeft:"10px"}}  onClick={()=> {
                        movePages(1);
                    }}>Next</button>:<button disabled style={{background:"lightgray"}}>Next</button>}
                </div>
            </div>
        </>
    );
};

export default MyOrders;