import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridTen from "./ProductGridTen";

const TabProductNineteen = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  productTabClass,
  productGridStyleClass
}) => {
  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className={`product-tab-list-6 justify-content-center mb-60 ${
              productTabClass ? productTabClass : ""
            }`}
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>진행중인 펀딩</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>마감된 펀딩</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGridTen
                  category={category}
                  type="new"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGridTen
                  category={category}
                  type="bestSeller"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGridTen
                  category={category}
                  type="saleItems"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductNineteen.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProductNineteen;
