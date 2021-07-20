import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductGridSingleEleven from "../../components/product/ProductGridSingleEleven";

const ProductGridEleven = ({
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
  colorClass,
  productGridStyleClass
}) => {
  return (
    <Fragment>
      {products.map((product) => {
        return (
          <ProductGridSingleEleven
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            productGridStyleClass={productGridStyleClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter((cartItem) => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                (wishlistItem) => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              compareItems.filter(
                (compareItem) => compareItem.id === product.id
              )[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGridEleven.propTypes = {
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
  productGridStyleClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

export default connect()(ProductGridEleven);
