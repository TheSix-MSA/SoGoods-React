import PropTypes from "prop-types";
import React from "react";

const ShopTopFilter = ({ products, getSortParams }) => {

  return (
    <div className="product-filter-wrapper" id="product-filter-wrapper">
      <div className="product-filter-wrapper__inner">
        <div className="row">
          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter">
              <h5>Categories</h5>
              {null ? (
                <ul>
                  {[1,2,3,4].map((category, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={e => {
                            getSortParams("category", category);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No categories found"
              )}
            </div>
          </div>

          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter">
              <h5>Color</h5>
              {null ? (
                <ul>
                  {[1,2,3,4].map((color, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={e => {
                            getSortParams("color", color);
                          }}
                        >
                          {color}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No colors found"
              )}
            </div>
          </div>
          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter">
              <h5>Size</h5>
              {null ? (
                <ul>
                  {[1,2,3,4,5].map((size, key) => {
                    return (
                      <li key={key}>
                        <button
                          className="text-uppercase"
                          onClick={e => {
                            getSortParams("size", size);
                          }}
                        >
                          {size}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No sizes found"
              )}
            </div>
          </div>
          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter product-filter--tag">
              <h5>Tag</h5>
              {null ? (
                <ul>
                  {[1,2,3,4,5].map((tag, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={e => {
                            getSortParams("tag", tag);
                          }}
                        >
                          {tag}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No tags found"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShopTopFilter.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array
};

export default ShopTopFilter;
