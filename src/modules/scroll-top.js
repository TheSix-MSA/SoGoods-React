import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = props => {
  const {pathname} = props.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  },[pathname]);
  return props.children;
};

export default withRouter(ScrollToTop);
