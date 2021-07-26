import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {connect, useSelector} from "react-redux";
import queryString from "querystring";
import orderServices from "../../service/orderServices";
import {useHistory} from "react-router-dom";
import LayoutOne from "../../components/layouts/header/LayoutOne";

const Confirmation = ({location}) => {
  const { search } = location
  const history = useHistory();
  const queryObj = queryString.parse(search.replace("?",""));
  const user = useSelector((state) => state.login.email);

  const purchaseInfo = {
    tid: JSON.parse(localStorage.getItem("transactionId")).tid,
    partner_order_id: JSON.parse(localStorage.getItem("transactionId")).orderId,
    pg_token: queryObj.pg_token,
    products:JSON.parse(localStorage.getItem("transactionId")).cartList,
    totalPrice: JSON.parse(localStorage.getItem("transactionId")).totalPrice,
    fno: JSON.parse(localStorage.getItem("transactionId")).fno
  }

  const finalCheckOut = async () => {
    const params = new URLSearchParams()
    params.append('cid', process.env.REACT_APP_KAKAO_PAY_CID)
    params.append('tid', purchaseInfo.tid)
    params.append('partner_order_id', purchaseInfo.partner_order_id)
    params.append('partner_user_id', user)
    params.append('pg_token', purchaseInfo.pg_token)

    console.log("after pushed the btn ",purchaseInfo)

    await orderServices.kakaoPayApprovePayment(params);
    await orderServices.orderConfirmedSave({...queryObj, orderId: purchaseInfo.partner_order_id, buyer: user,
      tid: purchaseInfo.tid, products: purchaseInfo.products, totalPrice: purchaseInfo.totalPrice, fno: purchaseInfo.fno});

    localStorage.removeItem("transactionId");
    history.push("/completed")
  }

  const orderCancel = () => {
    localStorage.removeItem("transactionId");
    history.push("/funding")
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__text">
                      <div style={{marginBottom: "30px"}}>
                        마지막 단계입니다! 결제를 승인해 주세요<br />{" "}
                      </div>
                      <div className="your-order-area" style={{}}>
                        <div className="place-order" style={{display:"flex", justifyContent:"center", borderRadius:"none"}}>
                          <button className="btn-hover" style={{maxWidth:"30%"}} onClick={() => finalCheckOut()}>결제 최종 승인!</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Confirmation.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array
};

export default connect()(Confirmation);
