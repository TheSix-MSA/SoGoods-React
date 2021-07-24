import React, {Fragment, useEffect, useState} from 'react';
import LayoutOne from "../layouts/header/LayoutOne";
import fundingService from "./fundingService";
import {useParams} from "react-router-dom";
import FundingSideBar from "./FundingSideBar";
import FundingPost from "./FundingPost";

const initState = {
    fundingDTO:{},
    productDTOs:[],
    favoriteCount:0
}

const FundingRead = () => {

    let {fno} = useParams()
    const [funding, setFunding] = useState(initState)

    // 상세 페이지에 필요한 데이터 불러오기
    useEffect(()=>{
        fundingService.getOneFunding(fno).then(res=> {
            console.log(res.response)
            setFunding(res.response)
        })
    },[])



    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row flex">
                            <div className="col-lg-9">
                                <div className="blog-details-wrapper ml-20">
                                    {/* funding post */}
                                    <FundingPost {...funding}/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* funding side bar
                                 펀딩 객체에 데이터가 있을 때 전송*/}
                                {funding.productDTOs.length>0 && <FundingSideBar {...funding}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};


export default FundingRead;