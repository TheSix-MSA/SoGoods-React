import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./modules/scroll-top";
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import {connect, useDispatch, useSelector} from "react-redux";
import instance from "./modules/axiosConfig";
import {useToasts} from "react-toast-notifications";
import BoardRegister from "./board/BoardRegister";
import BoardModify from "./board/BoardModify";
import {loggedInUser, signin} from "./redux/member/loginSlice";
import {refreshToken} from "./modules/refreshToken";
import Confirmation from "./pages/order/Confirmation";
import withAuth from "./hoc/withAuth";
import getLeftDate from "./modules/dateCalc";
import {ToastCenter, ToastError} from "./modules/toastModule";

const AuthorApplication = lazy(()=>import( "./member/AuthorApplication"));
//the six
const FundingBoard = lazy(()=>import("./components/funding/FundingBoard"));
const BoardRoute = lazy(()=>import("./board/BoardRoute"));
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

// 새로고침시 자동 로그인
  useEffect(() => {
    const lastActiveTime = JSON.parse(localStorage.getItem("lastActiveTime"));
    const time = Math.abs(new Date()-new Date(lastActiveTime));
    if(time/(1000*60*60)>2) {
      localStorage.clear();
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if(!email && userData) {
        dispatch(loggedInUser(userData));
      }
    }
  },[]);

  // 사일런스 리프레시
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


  // axios 인터셉터
  useEffect(() => {
    instance.interceptors.request.use(
        function (config) {
          localStorage.setItem("lastActiveTime",JSON.stringify(new Date()));
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
            ToastError(config.data.error.message);
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
          ToastCenter(error.response.data.error.message);
          return Promise.reject(error.response.data.error.message);
        }
    );
  }, []);

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

                <Route
                    path={process.env.PUBLIC_URL + "/funding"}
                    component={FundingBoard}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/board"}
                    component={BoardRoute}
                />


                {/* Other pages */}

                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={withAuth(MyAccount,["GENERAL","AUTHOR"])}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={withAuth(LoginRegister,["ANONYMOUS"])}
                />


                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={withAuth(Wishlist,["GENERAL","AUTHOR"])}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/confirmOrder"}
                  component={Confirmation}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={withAuth(Checkout,["GENERAL","AUTHOR"])}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/admin"}
                    component={withAuth(Admin,["ADMIN"])}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/author-application"}
                    component={withAuth(AuthorApplication,["GENERAL"])}
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
