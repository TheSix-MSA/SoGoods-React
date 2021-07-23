import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {connect, useSelector} from "react-redux";
import LayoutOne from "../../components/layouts/header/LayoutOne";
import codeService from "../../member/codeService";
import CodeDialogSlide from "../../member/CodeDialog";
import useInputs from "../../customHooks/useInputs";
import orderServices from "../../service/orderServices";
import {v4 as uuidv4} from "uuid";

const initStateForServer =  {
    buyer: "이메일", //현재 구매자 정보는 리덕스를 이용해 가져와야 할듯
    receiverName: "hihi",
    receiverAddress: "어딘가",
    receiverDetailedAddress: "어느 곳",
    receiverPhone: "01011118888",
    receiverRequest: "그런거 없다"
}

const Checkout = ({ location }) => {
  const [receiver, changeReceiver, setCart] = useInputs(initStateForServer);
  const user = useSelector((state) => state.login.email);

  const cartList = location.state?.cartList;

  console.log(cartList)

  let cartTotalPrice = 0;

    /**
     *  kakao 주소찾기 api모달 호출
     */
    const popupPost = () => {
        codeService.popUpModal();
    };

    /**
     * 주소찾기 api값을 상태에 저장.
     * @param address
     */
    const addAddress = (address) => {
        setCart({...receiver, receiverAddress:address});
    };

    const checkOut = async () => {
        const uuid = uuidv4();

        const params = {
            cid: process.env.REACT_APP_KAKAO_PAY_CID,
            partner_order_id: uuid, // 서버에 있는 값중 최신 값을 가져와야 한다.
            partner_user_id: user, //결제하는 놈 이메일
            item_name: cartList[0].name+" 외 "+(cartList.length-1)+"개",
            quantity: cartList.reduce(function(prev, next) {
                if(typeof prev === "object") return prev.count + next.count
                return prev + next.count
            }),
            total_amount: cartTotalPrice,
            tax_free_amount: 0,
            approval_url: "http://localhost:3000/confirmOrder?receiverName="+receiver.receiverName+"&receiverAddress="+receiver.receiverAddress
                +"&receiverDetailedAddress="+receiver.receiverDetailedAddress+"&receiverPhone="+receiver.receiverPhone+"&receiverRequest="+receiver.receiverRequest,
            fail_url: "http://localhost:3000/not-found",
            cancel_url: "http://localhost:3000/not-found"
        }

        const name = cartList.length>1 ?cartList[0].name+" 외 "+(cartList.length-1)+"개":cartList[0].name;

        const res = await orderServices.callKakaoPay({
            cid: process.env.REACT_APP_KAKAO_PAY_CID,
            partner_order_id: uuid, // 서버에 있는 값중 최신 값을 가져와야 한다.
            partner_user_id: user, //결제하는 놈 이메일
            item_name: name,
            quantity: cartList.reduce(function(prev, next) {
                if(typeof prev === "object") return prev.count + next.count
                return prev + next.count
            }),
            total_amount: cartList.reduce(function(prev, next) {
                if(typeof prev === "object") return prev.count*prev.price + next.count*next.price
                return prev + next.count*next.price
            }),
            tax_free_amount: 0,
            approval_url: "http://localhost:3000/confirmOrder?receiverName="+receiver.receiverName+"&receiverAddress="+receiver.receiverAddress
                +"&receiverDetailedAddress="+receiver.receiverDetailedAddress+"&receiverPhone="+receiver.receiverPhone+"&receiverRequest="+receiver.receiverRequest,
            fail_url: "http://localhost:3000/not-found",
            cancel_url: "http://localhost:3000/not-found"
        });

        const prods = {}
        cartList.forEach(item => {
            prods[item.pno]=item.count
        })

        localStorage.setItem("transactionId",JSON.stringify({
            tid: res.data.tid,
            url: res.data.next_redirect_pc_url,
            orderId : uuid,
            cartList: prods
        }));

        window.location.href=res.data.next_redirect_pc_url;
    }

    return (
    <Fragment>
      <MetaTags>
        <title>SoGoods | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartList && cartList.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Name</label>
                          <input type="text" name="receiverName" onChange={changeReceiver}/>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="billing-info mb-20">
                            <label>Address</label>
                            <input type="text" name="receiverAddress" readOnly={true} />
                            <input type="submit" value="주소 찾기" onClick={() => popupPost()}/>
                            <CodeDialogSlide addAddress={addAddress}/>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Detailed Address</label>
                          <input type="text" name="receiverDetailedAddress" onChange={changeReceiver}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Phone</label>
                          <input type="text" name="receiverPhone" onChange={changeReceiver}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Email Address</label>
                          <input type="text" name="receiverEmail" onChange={changeReceiver}/>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="receiverRequest"
                          defaultValue={""}
                          onChange={changeReceiver}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartList.map((cartItem, key) => {
                              const discountedPrice =0;
                              const finalProductPrice = (
                                  cartItem.price
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice
                              ).toFixed(2);

                              discountedPrice != 0
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.count)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.count);
                              return (
                                  cartItem.count < 1?null:
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.count}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== 0
                                      ?
                                        (
                                          finalDiscountedPrice *
                                          cartItem.count
                                        ).toFixed(2) +" 원"
                                      :
                                        (
                                          finalProductPrice * cartItem.count
                                        ).toFixed(2)+ " 원"}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {cartTotalPrice.toFixed(2)+ " 원"}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={() => checkOut()}>Kakao Pay로 결제하기</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  location: PropTypes.object
};
export default connect()(Checkout);
