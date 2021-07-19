import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderThirty from "../../wrappers/hero-slider/HeroSliderThirty";
import CountDownFive from "../../wrappers/countdown/CountDownFive";
import BrandLogoSliderFour from "../../wrappers/brand-logo/BrandLogoSliderFour";
import TabProductNineteen from "../../wrappers/product/TabProductNineteen";
import VideoPopupTwo from "../../components/video-popup/VideoPopupTwo";
import ProductSliderThree from "../../wrappers/product/ProductSliderThree";
import ImageSliderTwo from "../../wrappers/image-slider/ImageSliderTwo";

const HomeFurnitureFive = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Furniture Home</title>
        <meta
          name="description"
          content="Furniture home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        {/*<HeroSliderThirty />*/}
        {/* tab product */}
        <TabProductNineteen
          spaceTopClass="pt-95"
          spaceBottomClass="pb-100"
          category="furniture"
          productGridStyleClass="product-wrap-10--style2"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurnitureFive;
