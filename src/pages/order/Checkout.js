import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import codeService from "../../member/codeService";
import CodeDialogSlide from "../../member/CodeDialog";
import useInputs from "../../customHooks/useInputs";
import orderServices from "../../service/orderServices";
import axios from "axios";

const initStateForServer =  {
    buyer: "이메일", //현재 구매자 정보는 리덕스를 이용해 가져와야 할듯
    receiverName: "",
    receiverAddress: "",
    receiverDetailedAddress: "",
    receiverPhone: "",
    receiverRequest: ""
}

const Checkout = ({ location }) => {
  const { pathname } = location;
  const [cart, cartChange, setCart] = useInputs(initStateForServer);

  const [kpParams, setKpParams] = useState({
      // params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id", // 서버에 있는 값중 최신 값을 가져와야 한다.
        partner_user_id: "partner_user_id", //결제하는 놈 이메일
        item_name: "설마..?",
        quantity: 1,
        total_amount: 10,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000/checkout",
        fail_url: "http://localhost:3000/checkout",
        cancel_url: "http://localhost:3000/checkout"
      // }
    });


  const cartItems = [
      {
          name:"상품 1",
          price: 10,
          quantity: 1
      },
  ]

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
        console.log(address);
        setCart({...cart, receiverAddress:address});
    };

    const checkOut = async () => {
        const res = await orderServices.callKakaoPay(kpParams);
        console.log(res)
        // window.open("someLink", "_blank")
    }

    return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Name</label>
                          <input type="text" name="receiverName" onChange={cartChange}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" onChange={cartChange}/>
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
                          <input type="text" name="receiverDetailedAddress" onChange={cartChange}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Phone</label>
                          <input type="text" name="receiverName" onChange={cartChange}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Receiver's Email Address</label>
                          <input type="text" name="receiverPhone" onChange={cartChange}/>
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
                          onChange={cartChange}
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
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice =0;
                              const finalProductPrice = (
                                cartItem.price
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? " 원" +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : " 원" +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
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
