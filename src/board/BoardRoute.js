import React from 'react';
import {Switch, Route} from "react-router-dom";
import withAuth from "../hoc/withAuth";
import BoardRegister from "./BoardRegister";
import BoardModify from "./BoardModify";
import BlogNoSidebar from "./BlogNoSidebar";
import BlogDetailsStandard from "./BlogDetailsStandard";


export default  () => {
    return (
        <div>
            <div>
                <Switch>
                    <Route path={"/board/:boardType/list/"} component={BlogNoSidebar}>
                    </Route>{/* 재연 - Board 목록 컴포넌트로 사용 */}

                    <Route path={"/board/:boardType/boardRegister"} component={withAuth(BoardRegister,["GENERAL","AUTHOR"])}>
                    </Route> {/* 재연 - Board 작성 컴포넌트로 사용 */}

                    <Route path={`/board/modify/:boardType/:bno`} component={withAuth(BoardModify,["GENERAL","AUTHOR"])}>
                    </Route> {/* 재연 - Board 수정 컴포넌트로 사용 */}

                    <Route path={`/board/:boardType/:bno`} component={BlogDetailsStandard}>
                    </Route> {/* 재연 - Board 상세보기 컴포넌트로 사용 */}

                </Switch>
            </div>
        </div>
    );
};
