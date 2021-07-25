import React, {Component} from "react";
import {useLocation, NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import '../../css/light-bootstrap-dashboard.css'
import '../../css/documentation.css'
import '../../css/demo.css'


import logo from "../../../assets/img/reactlogo.png";

function Sidebar({color, image, routes}) {
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar">
            <div
                // className="sidebar-background"
                // style={{
                //   backgroundImage: "url(" + image + ")",
                // }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img
                                src={logo}
                                alt="..."
                            />
                        </div>
                    </a>
                    <a className="simple-text">
                        The Six Management
                    </a>
                </div>
                <Nav>
                    {routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? "active active-pro"
                                            : activeRoute(prop.layout + prop.path)
                                    }
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon}/>
                                        <p>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
