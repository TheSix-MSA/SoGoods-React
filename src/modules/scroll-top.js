import { useEffect } from "react";
import {useHistory, withRouter} from "react-router-dom";

const ScrollToTop = props => {
  const {pathname,search} = props.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  },[pathname,search]);
  return props.children;
};

export default withRouter(ScrollToTop);
