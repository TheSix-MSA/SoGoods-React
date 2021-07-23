import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./modules/scroll-top";
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom";

import { multilanguage, loadLanguages } from "redux-multilanguage";
import {connect, useDispatch, useSelector} from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import instance from "./modules/axiosConfig";
import {useToasts} from "react-toast-notifications";
import ProductInputList from "./pages/attach-dragNdrop/ProductInputList";
import BoardRegister from "./board/BoardRegister";
import BoardModify from "./board/BoardModify";
import {loggedInUser, signin} from "./redux/member/loginSlice";
import {refreshToken} from "./modules/refreshToken";

//the six
const FundingBoard = lazy(()=>import("./components/funding/FundingBoard"));
const ProductInput = lazy(()=>import("./pages/attach-dragNdrop-2/ProductInputList"));


// home pages
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));

// blog pages
const BlogNoSidebar = lazy(() => import("./board/BlogNoSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./board/BlogDetailsStandard")
);

// other pages
const MyAccount = lazy(() => import("./member/MyAccount"));
const LoginRegister = lazy(() => import("./member/LoginRegister"));

const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Checkout = lazy(() => import("./pages/order/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const TableList = lazy(() => import("./admin/views/MemberTable"));
const Admin = lazy(() => import("./admin/layouts/Admin"));
const DashBoard = lazy(() => import("./admin/views/Dashboard"));


const App = (props) => {
  const {addToast} = useToasts()
  const {email,roles} = useSelector(state=>state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  useEffect(() => {
    console.log("asdasdasd")
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if(!email && userData) {
      dispatch(loggedInUser(userData));
    }
  },[]);

  useEffect(() => {
      if(email && email !== "") {
        const interval = setInterval(() => {
          refreshToken().then(res=>{
            dispatch(signin(res));
          });
        }, 1000*60*19);
        return () => clearInterval(interval);
      }
    },[email]);



  useEffect(() => {
    instance.interceptors.request.use(
        function (config) {
          config.headers.Authorization = `Bearer ${(JSON.parse(localStorage.getItem("userData")))?.accessToken || ""}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
    );
    instance.interceptors.response.use(
        (config) => {
          if(!config.data.success){
            addToast(
                config.data.error.message, {appearance: 'error',autoDismiss: true, id:"errorToast"}
            );
            return Promise.reject(config.data.error.message);
          }
          return config;
        },
        (error) => {
          if(error.response.data.error.message === "Refresh") {
            refreshToken().then(res=>{
              dispatch(signin(res));
            });
            return Promise.reject();
          }
          addToast(
              error.response.data.error.message, {appearance: 'error', autoDismiss: true},
          );
          return Promise.reject(error.response.data.error.message);
        }
    );
  }, []);
  /* 로딩 끝 */

  return (
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/product/input"}
                    component={ProductInput}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeOnepageScroll}
                />

                 Homepages

                <Route
                    path={process.env.PUBLIC_URL + "/funding"}
                    component={FundingBoard}
                />

                <Route
                    path={"/board/FREE/list/:currentPage"}
                    component={BlogNoSidebar}
                />{/* 재연 - Board 목록 컴포넌트로 사용 */}

                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/boardRegister"}
                    component={BoardRegister}
                /> {/* 재연 - Board 작성 컴포넌트로 사용 */}

                <Route
                  path={`/board/FREE/:bno`}
                  component={BlogDetailsStandard}
                /> {/* 재연 - Board 상세보기 컴포넌트로 사용 */}

                <Route
                  path={`/board/modify/FREE/:bno`}
                  component={BoardModify}
                /> {/* 재연 - Board 수정 컴포넌트로 사용 */}

                {/* Other pages */}

                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />


                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/admin"}
                    component={Admin}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
