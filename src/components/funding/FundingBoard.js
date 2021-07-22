import React from 'react';
import FundingList from "./FundingList";
import {Switch, Route} from "react-router-dom";
import FundingRegister from "./FundingRegister";
import FundingRead from "./FundingRead";
import MyFundingPage from "./MyFundingPage";
import MyFavFundingPage from "./MyFavFundingPage";
import FundingUpdate from "./FundingUpdate";


export default  () => {
    return (
        <div>
            <div>
                <Switch>
                    <Route path={`/funding/list`} component={FundingList}>
                    </Route>
                    <Route path={`/funding/read/:fno`} component={FundingRead}>
                    </Route>
                    <Route path={`/funding/register`} component={FundingRegister}>
                    </Route>
                    <Route path={`/funding/mypage/fav`} component={MyFavFundingPage}>
                    </Route>
                    <Route path={`/funding/mypage`} component={MyFundingPage}>
                    </Route>
                    <Route path={`/funding/update/:fno`} component={FundingUpdate}>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
