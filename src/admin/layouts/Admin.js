import React from "react";
import {useLocation, Route, Switch} from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import FooterOne from "../../components/layouts/footer/FooterOne";
import routes from "./routes.js";
import HeaderOne from "../../components/layouts/header/HeaderOne";

function Admin() {
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
                <Sidebar routes={routes}/>
                <div className="main-panel" ref={mainPanel}>
                    <HeaderOne/>
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
