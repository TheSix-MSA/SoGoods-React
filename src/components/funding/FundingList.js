import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import Nav from "react-bootstrap/Nav";
import ShopSearch from "../../components/product/ShopSearch";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import * as queryString from "query-string";
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
import fundingService from "./fundingService";
import PageList from "./PageList";

const initState= {
    listRequestDTO:{},
    dtoList:[],
    pageMaker:{
        page: 1,
        size: 0,
        pageList: [],
        prev: false,
        next: false,
        totalCount:0,
        start:1,
        end:10
    }
}


const FundingList = ({ location, products, productTabClass}) => {
    const [layout, setLayout] = useState("grid three-column");
    const [sortType, setSortType] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [filterSortType, setFilterSortType] = useState("");
    const [filterSortValue, setFilterSortValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const value = queryString.parse(location.search);	// 문자열의 쿼리스트링을 Object로 변환
    const page = value.page||1
    console.log(value)
    const history = useHistory()
    const [data, setData] = useState(initState)

    useEffect(()=> {
        fundingService.getList(page).then(res=>{
            console.log(res.response)
            setData(res.response);
        })
    }, [page])

    // 펀딩 리스트 불러오기
    const list = data.dtoList.map((dto, idx)=>
        <div key={idx}>
            <h5>{dto.fundingDTO.fno}</h5>
            <h5>{dto.fundingDTO.title}</h5>
            <img alt={"이미지"} src="https://i.imgur.com/WCySTkp.jpeg" height={"200px"}/>
            <h5>마감일자 : {dto.fundingDTO.dueDate}</h5>
            <h5>펀딩금액 : {dto.fundingDTO.totalAmount}</h5>
        </div>
    )






    const pageLimit = 15;
    const { pathname } = location;

    const getLayout = layout => {
        setLayout(layout);
    };

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    };

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(
            sortedProducts,
            filterSortType,
            filterSortValue
        );
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);

    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Furniture Home</title>
                <meta
                    name="description"
                    content="Furniture home of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <LayoutOne headerTop="visible">
                <Nav
                    variant="pills"
                    className={`product-tab-list-6 justify-content-center mb-60 ${
                        productTabClass ? productTabClass : ""
                    }`}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="newArrival">
                            <h4>진행중인 펀딩</h4>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="bestSeller">
                            <h4>마감된 펀딩</h4>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{display:"flex"}}>
                            {/* shop topbar default */}
                            <ShopTopbar>
                                getLayout={getLayout}
                                getFilterSortParams={getFilterSortParams}
                            </ShopTopbar>
                            <div className="pro-sidebar-search" style={{display:"flex"}}>
                                <form className="pro-sidebar-search-form" action="#">
                                    <input type="text" placeholder="Search here..." />
                                    <button>
                                        <i className="pe-7s-search" />
                                    </button>
                                </form>
                            </div>
                            </div>
                            {/* shop page content default */}
                            <ShopProducts layout={layout} products={currentData} />
                            <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr" ,gridTemplateRows: "1fr 1fr 1fr"}}>
                                {list}
                            </div>
                            <PageList {...data}></PageList>
                            {/* shop product pagination */}
                            <div className="pro-pagination-style text-center mt-30">
                                <Paginator
                                    totalRecords={10}
                                    pageLimit={pageLimit}
                                    pageNeighbours={2}
                                    setOffset={setOffset}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageContainerClass="mb-0 mt-0"
                                    pagePrevText="«"
                                    pageNextText="»"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

FundingList.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
};


export default connect()(FundingList);

