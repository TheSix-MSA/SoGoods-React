import React, {Fragment, useEffect, useState} from 'react';
import LayoutOne from "../layouts/header/LayoutOne";
import fundingService from "./fundingService";
import {useParams} from "react-router-dom";
import FundingSideBar from "./FundingSideBar";
import FundingPost from "./FundingPost";
import {useSelector} from "react-redux";


const initState = {
    fundingDTO:{},
    productDTOs:[],
    favoriteCount:0
}

const FundingRead = ({location}) => {

    const info = useSelector(state=>state.login);
    const { pathname } = location;
    let {fno} = useParams()
    const [funding, setFunding] = useState(initState)

    // 상세 페이지에 필요한 데이터 불러오기
    useEffect(()=>{
        fundingService.getOneFunding(fno)
            .then(res1=> {
                const fno     = [res1.response.fundingDTO.fno]
                const pnoList = res1.response.productDTOs.map(product=>product.pno)

                //펀딩의 메인이미지
                fundingService.getA3src('FUNDING', fno)
                    .then(res2=>{
                        let src = res2.data.response[0].imgSrc
                        res1.response.fundingDTO.imgSrc = src
                        setFunding({...res1.response})
                })

                fundingService.getA3srcList('PRODUCT', pnoList, [0,1])
                    .then(res1=>{
                        console.log('================PRODUCT==========')

                        // let src = res2.data.response[0].imgSrc
                        // res1.response.fundingDTO.imgSrc = src
                        // setFunding({...res1.response})
                    })


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
                                    {/* blog post */}
                                    <FundingPost {...funding}/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* blog sidebar */}
                                {funding.productDTOs.length>0&&<FundingSideBar {...funding}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};


export default FundingRead;