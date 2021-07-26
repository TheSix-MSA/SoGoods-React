import React, {Fragment} from 'react';
import queryString from "querystring";
import {connect, useSelector} from "react-redux";
import orderServices from "../../service/orderServices";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../components/layouts/header/LayoutOne";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const FinalizedPage = ({location}) => {
    const { search } = location
    const history = useHistory();
    const queryObj = queryString.parse(search.replace("?",""));

    const user = useSelector((state) => state.login.email);

    const tid = localStorage.getItem("transactionId")!==null?
        JSON.parse(localStorage.getItem("transactionId")).tid:null;

    const orderId = localStorage.getItem("transactionId")!==null?
        JSON.parse(localStorage.getItem("transactionId")).orderId:null;

    const products = localStorage.getItem("transactionId")!==null?
        JSON.parse(localStorage.getItem("transactionId")).cartList:null;

    const completed = () => {
        history.push("/")
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
                                        <img src="https://morethankyounotes.com/wp-content/uploads/2017/02/Customer-Thank-You-Note-1.png.webp" alt=""/>
                                    </div>
                                    <div className="item-empty-area__text">
                                        <div className="your-order-area">
                                            <div className="place-order mt-25" style={{justifyContent:"center", display:"flex"}}>
                                                <button className="btn-hover" style={{backgroundColor:"#bdbdc5", width:"50%"}} onClick={() => completed()}>이용해 주셔서 감사합니다!</button>
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

FinalizedPage.propTypes = {
    addToCart: PropTypes.func,
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    location: PropTypes.object,
    deleteAllFromWishlist: PropTypes.func,
    deleteFromWishlist: PropTypes.func,
    wishlistItems: PropTypes.array
};

export default connect()(FinalizedPage);