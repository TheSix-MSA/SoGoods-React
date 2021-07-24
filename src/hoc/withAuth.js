import React from 'react'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

/**
 *
 * @param WrappedComponents
 * @param accept String "ANONYMOUS","GENERAL","AUTHOR","ADMIN"
 * @returns 로그인페이지로 보낼지 컴포넌트를 보여줄지 결정
 */
const withAuth = (WrappedComponents,accept=[]) => {
    return (props) => {
        const {roles} = useSelector(state=>state.login);
        const history = useHistory();
        const {addToast} = useToasts()
        useEffect(() => {
            console.log(accept)
            console.log(roles)
            if(accept.includes("ANONYMOUS") && roles.length>0) {
                console.log(123123, history);
                history.goBack();
            }else if(!accept.some((e)=>roles.includes(e))) {
                console.log("hihi")
                history.push("/login-register")
            }
        }, []);
        return <WrappedComponents {...props}/>;
    };
}

export default withAuth;