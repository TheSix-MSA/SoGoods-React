import React from 'react'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

/**
 *
 * @param WrappedComponents
 * @param accept String "GENERAL","AUTHOR","ADMIN"
 * @returns 로그인페이지로 보낼지 컴포넌트를 보여줄지 결정
 */
const withAuth = (WrappedComponents,accept) => {
    return (props) => {
        const {roles} = useSelector(state=>state.login);
        const history = useHistory();
        const {addToast} = useToasts()
        useEffect(() => {
            //로그인한 유저는 접근 못하는 페이지
            if (roles.length > 0) {
                addToast(
                    "잘못된 접근입니다.", {appearance: 'warn', autoDismiss: true},
                );
                history.goBack();
            }
            //권한이 없는 유저는 접근 못함
            if(!roles.includes(accept) && !roles.includes("ADMIN")) {
                addToast(
                    "권한이 없습니다.", {appearance: 'error', autoDismiss: true},
                );
                history.push("/login-register");
            }
        }, []);
        return <WrappedComponents {...props}/>;
    };
}

export default withAuth;