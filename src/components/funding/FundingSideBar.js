import React from "react";
import { Link } from "react-router-dom";

const BlogSidebar = (funding) => {

    const productList = funding.productDTOs.map(p=>
        <>
            <div className="single-sidebar-blog" >
                 <div className="sidebar-blog-img" key={p}>
                    <div to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                        <img
                            src={
                                process.env.PUBLIC_URL + "/assets/img/blog/sidebar-1.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="sidebar-blog-content" >
                        <div>{p.name}</div>
                        <div>{p.price}원 펀딩</div>

                            <div to={process.env.PUBLIC_URL + "/blog-details-standard"}>x
                                {p.des}
                            </div>

                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title"> 리워드 선택</h4>
                <div className="sidebar-project-wrap mt-30">
                </div>
                {productList}
            </div>
            <div className="sidebar-widget mt-35">
                <h4 className="pro-sidebar-title">Categories</h4>
                <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <input type="checkbox" defaultValue />{" "}
                                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                    Women <span>4</span>{" "}
                                </Link>
                                <span className="checkmark" />
                            </div>
                        </li>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <input type="checkbox" defaultValue />{" "}
                                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                    Men <span>4</span>{" "}
                                </Link>
                                <span className="checkmark" />
                            </div>
                        </li>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <input type="checkbox" defaultValue />{" "}
                                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                    Bags <span>4</span>{" "}
                                </Link>
                                <span className="checkmark" />
                            </div>
                        </li>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <input type="checkbox" defaultValue />{" "}
                                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                    Accessories <span>4</span>{" "}
                                </Link>
                                <span className="checkmark" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-widget mt-50">
                <h4 className="pro-sidebar-title">Tag </h4>
                <div className="sidebar-widget-tag mt-25">
                    <ul>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                Clothing
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                Accessories
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                For Men
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>Women</Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                Fashion
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
