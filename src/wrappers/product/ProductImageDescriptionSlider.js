import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import ProductImageGallerySlider from "../../components/product/ProductImageGallerySlider";
import ProductDescriptionInfoSlider from "../../components/product/ProductDescriptionInfoSlider";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems
}) => {
  const wishlistItem = wishlistItems?.filter(
    wishlistItem => wishlistItem.id === product.id
  )[0];
  const compareItem = compareItems?.filter(
    compareItem => compareItem.id === product.id
  )[0];
  const { addToast } = useToasts();

  const discountedPrice = 0;
  const finalProductPrice = 0;
  const finalDiscountedPrice = 0;

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-50">
            {/* product image gallery */}
            <ProductImageGallerySlider product={product} />
          </div>
          <div className="col-lg-12 text-center">
            {/* product description info */}
            <ProductDescriptionInfoSlider
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};


export default connect()(ProductImageDescription);
