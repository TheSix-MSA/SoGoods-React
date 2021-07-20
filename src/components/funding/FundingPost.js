import React, {Fragment} from 'react';

const FundingPost = (funding) => {
    return (
        <div>
            <Fragment>
                <div className="blog-details-top">
                    <div className="blog-details-img">
                        <img
                            alt=""
                            src={process.env.PUBLIC_URL + "/assets/img/blog/blog-5.jpg"}
                        />
                    </div>
                    <div className="blog-details-content">
                        <h3>{funding.fundingDTO.title}</h3>
                    </div>
                    <div style={{border:"1px solid #f7f7f7" ,backgroundColor:"#f7f7f7"}}>
                        <h5> 펀딩 목표금액 : {funding.fundingDTO.targetAmount}</h5>
                        <h5> 펀딩 기간: {funding.fundingDTO.regDate} ~ {funding.fundingDTO.dueDate}</h5>

                    </div>
                    <p>
                        {funding.fundingDTO.content}
                    </p>
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