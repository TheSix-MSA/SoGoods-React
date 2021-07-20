import PropTypes from "prop-types";
import React from "react";

const productImageGallerySticky = ({ product }) => {
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
        <div className="product-img-badges">
            <span className="pink">123%</span>
          <span className="purple">New</span>
        </div>
      <div className="product-sticky-image mb--10">
        {[1,2,3,4].map((single, key) => {
            return (
              <div className="product-sticky-image__single mb-10" key={key}>
                <img
                  src={process.env.PUBLIC_URL + single}
                  alt=""
                  className="img-fluid"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

productImageGallerySticky.propTypes = {
  product: PropTypes.object
};

export default productImageGallerySticky;
