import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import {connect, useSelector} from "react-redux";
import queryString from "querystring";
import orderServices from "../../service/orderServices";
import LayoutOne from "../../components/layouts/header/LayoutOne";

const Confirmation = ({location}) => {
  const { search } = location
  const queryObj = queryString.parse(search.replace("?",""));

  const user = useSelector((state) => state.login.email);

  const tid = localStorage.getItem("transactionId")!==null?
      JSON.parse(localStorage.getItem("transactionId")).tid:null;

  const finalCheckOut = () => {
    console.log({...queryObj, buyer:user, tid:tid})
    //const res = orderServices.orderConfirmedSave({...queryObj, buyer:user, tid:tid});
    const kakaoPayApprove = orderServices.kakaoPayApprovePayment({
      cid: process.env.REACT_APP_KAKAO_PAY_TID,
      tid: queryObj.tid,
      partner_order_id: queryObj.partner_order_id,

    })
    localStorage.removeItem("transactionId");
  }

  const randIGen = () => {
    console.log("sads")
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
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{" "}
                      <div className="place-order mt-25">
                        <button className="btn-hover" onClick={() => finalCheckOut()}>결제 승인</button>
                        <button onClick={() => randIGen()}> 시간 제너레이션 </button>
                      </div>
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
