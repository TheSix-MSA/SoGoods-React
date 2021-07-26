import React from 'react'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

/**
 *
 * @param WrappedComponents
 * @param accept String "ANONYMOUS","GENERAL","AUTHOR","ADMIN"
 * @returns 로그인페이지로 보낼지 컴포넌트를 보여줄지 결정
 */
const withAuth = (WrappedComponents,accept=[]) => {
    return (props) => {
        const history = useHistory();
        const {pathname} = useLocation();
        const {addToast} = useToasts()
        const userData = localStorage.getItem("userData");
        let roles = [];
        if(userData) {
            roles = JSON.parse(userData).roles;
        }
        useEffect(() => {
            if(accept.includes("ANONYMOUS") && roles.length>0) {
                return history.push("/");
            }else if(accept.includes("ADMIN") && !roles.includes("ADMIN")) {
                addToast(
                    "잘못 된 접근입니다", {appearance: 'error', autoDismiss: true},
                );
                return history.push("/")
            }else if(!accept.includes("ANONYMOUS")&&!accept.some((e)=>roles.includes(e))) {
                return history.push("/login-register",{from:pathname})
            }
        }, []);
        return <WrappedComponents {...props}/>;
    };
}

export default withAuth;