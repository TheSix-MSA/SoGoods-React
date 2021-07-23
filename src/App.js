import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
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
import Confirmation from "./pages/order/Confirmation";

//the six
const FundingBoard = lazy(()=>import("./components/funding/FundingBoard"));
const ProductInput = lazy(()=>import("./pages/attach-dragNdrop-2/ProductInputList"));


// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = lazy(() => import("./pages/home/HomeFashionEight"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeFurnitureFour = lazy(() => import("./pages/home/HomeFurnitureFour"));
const HomeFurnitureFive = lazy(() => import("./pages/home/HomeFurnitureFive"));
const HomeFurnitureSeven = lazy(() =>
  import("./pages/home/HomeFurnitureSeven")
);
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeElectronicsThree = lazy(() =>
  import("./pages/home/HomeElectronicsThree")
);
const HomeBookStoreTwo = lazy(() => import("./pages/home/HomeBookStoreTwo"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));
const HomeMedicalEquipment = lazy(() =>
  import("./pages/home/HomeMedicalEquipment")
);
const HomeBlackFridayTwo = lazy(() =>
  import("./pages/home/HomeBlackFridayTwo")
);
const HomeValentinesDay = lazy(() => import("./pages/home/HomeValentinesDay"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./board/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./board/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./member/MyAccount"));
const LoginRegister = lazy(() => import("./member/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
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
      <BreadcrumbsProvider>
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
                  component={HomeFashion}
                />

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion"}
                  component={HomeFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-two"}
                  component={HomeFashionTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-three"}
                  component={HomeFashionThree}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-seven"}
                  component={HomeFashionSeven}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-eight"}
                  component={HomeFashionEight}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-kids-fashion"}
                  component={HomeKidsFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-cosmetics"}
                  component={HomeCosmetics}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture"}
                  component={HomeFurniture}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-three"}
                  component={HomeFurnitureThree}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-four"}
                  component={HomeFurnitureFour}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-five"}
                  component={HomeFurnitureFive}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-seven"}
                  component={HomeFurnitureSeven}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-electronics-two"}
                  component={HomeElectronicsTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-electronics-three"}
                  component={HomeElectronicsThree}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-book-store-two"}
                  component={HomeBookStoreTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-organic-food-two"}
                  component={HomeOrganicFoodTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-onepage-scroll"}
                  component={HomeOnepageScroll}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-auto-parts"}
                  component={HomeAutoParts}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-cake-shop"}
                  component={HomeCakeShop}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-handmade"}
                  component={HomeHandmade}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-pet-food"}
                  component={HomePetFood}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-medical-equipment"}
                  component={HomeMedicalEquipment}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-black-friday-two"}
                  component={HomeBlackFridayTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-valentines-day"}
                  component={HomeValentinesDay}
                />

                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                  component={ShopGridFilter}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                  component={ShopGridTwoColumn}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}
                  component={ShopGridNoSidebar}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/funding"}
                    component={FundingBoard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-full-width"}
                  component={ShopGridFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                  component={ShopGridRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-standard"}
                  component={ShopListStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-full-width"}
                  component={ShopListFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-two-column"}
                  component={ShopListTwoColumn}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                  component={ProductTabRight}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                  component={ProductSticky}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-slider/:id"}
                  component={ProductSlider}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
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
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/confirmOrder"}
                  component={Confirmation}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
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
      </BreadcrumbsProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
