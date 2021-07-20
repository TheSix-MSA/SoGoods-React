import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductGridSingleNine from "../../components/product/ProductGridSingleNine";

const ProductGridNine = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {
  return (
    <Fragment>
      
    </Fragment>
  );
};

ProductGridNine.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

export default connect()(ProductGridNine);
