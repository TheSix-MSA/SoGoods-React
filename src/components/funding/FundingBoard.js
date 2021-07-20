import React from 'react';
import FundingList from "./FundingList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useParams,
    useRouteMatch,
    useHistory
} from "react-router-dom";
import FundingRegister from "./FundingRegister";


export default  () => {
    return (
        <div>
            <div>
                <Switch>
                    <Route path={`/funding/list`} component={FundingList}>
                    </Route>
                    <Route path={`/funding/read/:fno`}>
                    </Route>
                    <Route path={`/funding/register`} component={FundingRegister}>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
