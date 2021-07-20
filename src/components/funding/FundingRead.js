import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogRightSidebar from "../../pages/blog/BlogRightSidebar";
import fundingService from "./fundingService";
import {useParams} from "react-router-dom";
import FundingSideBar from "./FundingSideBar";
import FundingPost from "./FundingPost";


const initState = {
    fundingDTO:{},
    productDTOs:[],
    favoriteCount:0
}

const FundingRead = ({location}) => {

    const { pathname } = location;

    const fno = useParams()

    const [funding, setFunding] = useState(initState)

    useEffect(()=>{
        fundingService.getOneFunding(5).then(res=> {
            console.log(res.response)
            setFunding(res.response)
        })

    },[])

    //const fundingObj1 = <h1>funding.fundingDTO.title</h1>



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
                                    <FundingPost {...funding}/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* blog sidebar */}
                                <FundingSideBar {...funding}/>
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