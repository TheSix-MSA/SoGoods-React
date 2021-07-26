import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import orderServices from "../../service/orderServices";
import getFormatDate from "../../modules/getFormatDate";
import fundingService from "../../components/funding/fundingService";
import {useHistory} from "react-router-dom";

const initState = {
    page:1,
    size:10,
    prev:false,
    next:false,
    pageList:[]
}

const initDto =
    [
        {
            dto: {
                ono: 0,
                buyer: "",
                receiverName: "",
                receiverAddress: "",
                receiverDetailedAddress: "",
                receiverPhone: "",
                receiverRequest: "",
                tid: "",
                shippedDate: null,
                cancelledDate: null,
                products: null,
                regDate: "",
                modDate: ""
            },
            totalPrices: 0,
            prodNames: "",
            pno:0
        }
    ]

const MyOrders = () => {
    const user = useSelector(state => state.login);
    const [pager, setPager] = useState({...initState});
    const [prodsList, setProdList] = useState([...initDto]);
    const [flag, setFlag] = useState(false);
    const [imgs, setImgs] = useState([])
    const history = useHistory();

    useEffect(() => {
        orderServices.ordersUserMade({page: pager.page, email: user.email, sortingCond: ""}).then(r => {
            setProdList(r.data.response.resDto);
            setPager(r.data.response.pageMaker);
            const pnolist = r.data.response.resDto.map(value => {
                return value.pno
            })
            console.log("pnolist ",pnolist)
            if(pnolist.length>0){
                fundingService.getA3srcList("PRODUCT", pnolist, [1]).then(r =>
                    setImgs(r.data.response)
                );
            }
        })

    }, [flag, pager.page]);

    const cancelOrder = async (prod) => {
        const kakaoCancel = await orderServices.cancelKakaoPay({
            tid: prod.dto.tid,
            amount: prod.totalPrices,
            taxAmount: 0
        })

        orderServices.cancelOrdersUserMade(prod.dto.ono).then(r =>
            setFlag(!flag))
    };

    const movePages = (moveNum) => {
        setPager({...pager, page: pager.page + moveNum})
    };

    const goToFunding = () => {
        history.push("/funding")
    }

    const prods = prodsList.length !== 0 ? prodsList.map((prod, idx) =>
            <div key={idx} className="entries-wrapper" style={{marginBottom: "15px"}}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                        <div className="entries-edit-delete text-center">
                            {imgs[idx] && imgs[idx][0] ?
                                <img src={imgs[idx][0].imgSrc} alt="" style={{maxWidth: "100%"}}/>
                                :
                                <img src={process.env.PUBLIC_URL + "/assets/img/default.png"} alt=""
                                     style={{maxWidth: "200px"}}/>
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-left">
                        <div className="entries-info ">
                            <p style={{fontSize: "12px"}}><strong>상품 정보 :</strong> {prod.prodNames}</p>
                            <p style={{fontSize: "12px"}}><strong>가격 :</strong> {prod.totalPrices} 원</p>
                            <p style={{fontSize: "12px"}}><strong>수령인 :</strong> {prod.dto.receiverName}</p>
                            <p style={{fontSize: "12px"}}><strong>배송지
                                :</strong> {prod.dto.receiverAddress + ", " + prod.dto.receiverDetailedAddress}</p>
                            <p style={{fontSize: "12px"}}><strong>구매 날짜 :</strong> {prod.dto.regDate}</p>
                            <p style={{fontSize: "12px"}}><strong>배송
                                :</strong> {prod.dto.shippedDate ? prod.dto.shippedDate : "배송전"}</p>
                            <p style={{fontSize: "12px"}}><strong>배송시 주의 사항 :</strong> {prod.dto.receiverRequest}</p>
                            {prod.dto.cancelledDate ? <p style={{fontSize: "12px"}}><strong> 취소 일자
                                    :</strong>{getFormatDate(new Date(prod.dto.cancelledDate))}</p> :
                                <div className="entries-edit-delete text-left" style={{marginTop: "10px"}}>
                                    <button onClick={() => {
                                        cancelOrder(prod)
                                    }}>주문 취소
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>)
        :
        <div className="entries-wrapper" style={{marginBottom: "15px"}}>
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center"
                , padding: "15px"
            }}>
                <div>
                    <p><strong style={{fontSize: "20px", color: "#c2c2c2", textAlign: "center"}}>참여한 펀딩이 없습니다.</strong>
                    </p>
                    <button onClick={()=>goToFunding()}>
                        <p style={{textAlign: "center", color: "rgb(244 61 61)"}}>펀딩하러 가기>></p>
                    </button>
                </div>
            </div>
        </div>;


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