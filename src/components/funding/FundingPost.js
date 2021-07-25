import React, {Fragment} from 'react';
import ImgCarousel from "./ImgCarousel";

const FundingPost = (funding) => {

    console.log(funding)

    const list = funding.productDTOs.map((productDTO, i)=>{
        const part = productDTO.imgArr.map(img=>{
            return {imgPath: img.imgSrc}
        })
        return (
            <ImgCarousel tutorialSteps ={part} ></ImgCarousel>
        )
    })



    return (
        <div>
            <Fragment>
                <div className="blog-details-top">
                    <h3 style={{textAlign:"center"}}>{funding.fundingDTO.title}</h3>
                    <div className="blog-details-img" >
                        <img
                            alt=""
                            src={funding.fundingDTO.imgSrc}
                            style={{objectFit:"cover"}}
                        />
                    </div>
                    <div className="blog-details-content">
                        <div style={{border:"1px solid #f7f7f7" ,backgroundColor:"#f7f7f7"}}>
                            <h5> 펀딩 목표금액 : {funding.fundingDTO.targetAmount} 원</h5>
                            <h5> 펀딩 기간 : {funding.fundingDTO.regDate} ~ {funding.fundingDTO.dueDate}</h5>
                            <h6> ► 100% 이상 모이면 펀딩이 성공되며, 펀딩 마감일까지 목표 금액이 100% 모이지 않으면 결제가 진행되지 않습니다.</h6>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <div><h4>펀딩 상세내용</h4></div>
                        <p>
                            {funding.fundingDTO.content}
                        </p>

                        <div>

                            {list}

                        </div>

                    </div>
                    </div>
                    <div className="dec-img-wrapper">
                        <div className="row">
                        </div>
                    </div>
                    <div className="tag-share">
                    </div>
                    {/*<div className="next-previous-post">*/}
                    {/*  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>*/}
                    {/*    {" "}*/}
                    {/*    <i className="fa fa-angle-left" /> prev post*/}
                    {/*  </Link>*/}
                    {/*  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>*/}
                    {/*    next post <i className="fa fa-angle-right" />*/}
                    {/*  </Link>*/}
                    {/*</div>*/}
            </Fragment>

        </div>
    );
};

export default FundingPost;