import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {connect, useSelector} from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import queryString from "querystring";
import orderServices from "../../service/orderServices";

const Confirmation = ({location}) => {
  const { search } = location	// 문자열 형식으로 결과값이 반환된다.
  const queryObj = queryString.parse(search.replace("?",""));

  const user = useSelector((state) => state.login.email);

  console.log("User Info: ", user);

  console.log({...queryObj, buyer:user});

  const finalCheckOut = () => {
    console.log("TID 넘어오니?!?!?!",orderServices.getTid());
    //const res = orderServices.orderConfirmedSave({...queryObj, buyer:user});
    //console.log(res)
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
