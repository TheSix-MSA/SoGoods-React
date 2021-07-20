import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";

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

      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurnitureFive;
