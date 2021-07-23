import React, { Component, Fragment } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import FooterOne from "../../components/layouts/footer/FooterOne";
// import AdminNavbar from "components/navbars/AdminNavbar";
// import Footer from "components/Footer/Footer";


import routes from "./routes.js";
import AdminNavbar from "../components/navbars/AdminNavbar";

// import sidebarImage from "../../assets/img/sidebar-3.jpg";

function Admin(){

  // const [image, setImage] = React.useState(sidebarImage);
  // const [color, setColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();

  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      const element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar routes={routes}  />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <FooterOne
              backgroundColorClass="bg-gray"
              spaceTopClass="pt-100"
              spaceBottomClass="pb-70"
          />
        </div>
      </div>
    </>
  );
}

export default Admin;
