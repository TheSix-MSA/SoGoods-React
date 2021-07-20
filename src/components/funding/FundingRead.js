import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogRightSidebar from "../../pages/blog/BlogRightSidebar";
import BlogPost from "../../wrappers/blog/BlogPost";
import fundingService from "./fundingService";


const initState = {
    fundingDTO:{},
    productDTOs:[],
    favoriteCount:0
}

const FundingRead = ({location}) => {

    const { pathname } = location;

    const [funding, setFunding] = useState(initState)

    useEffect(()=>{
        fundingService.getOneFunding().then(res=> {
            console.log(res.response)
            setFunding(res.response)
        })

    })

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row flex">
                            <div className="col-lg-9">
                                <div className="blog-details-wrapper ml-20">
                                    {/* blog post */}
                                    <BlogPost />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* blog sidebar */}
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

BlogRightSidebar.propTypes = {
    location: PropTypes.object
};


export default FundingRead;