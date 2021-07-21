import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
        <div className="product-img-badges">
            <span className="pink">123%</span>
          <span className="purple">New</span>
        </div>
      <div className="product-fixed-image">
        {null ? null
         : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
