import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPostsNoSidebar from "../../wrappers/blog/BlogPostsNoSidebar";
import boardService from "./boardService";

const initState = {
    boardDtoList: [],
    boardListRequestDTO:{
        page:1,
        size:0,
        keyword:'',
        type:''
    },
    pageMaker:{
        page:1,
        size:0,
        totalCount:0,
        pageList:[],
        prev:false,
        next:false
    }
}
const BlogNoSidebar = ({ location }) => {
    const { pathname } = location;
    const [data, setData] = useState(initState);

    useEffect(() => {
      boardService.getBoardList().then(res => {
        setData(res)
      })
    }, [])
    console.log(data)
  return (
    <Fragment>
              <MetaTags>
                <meta
                  name="description"
                  content="Blog of flone react minimalist eCommerce template."
                />
              </MetaTags>
              <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="blog-area pt-100 pb-100 blog-no-sidebar">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mr-20">
                          <div className="row">
                            {/* blog posts */}
                            <BlogPostsNoSidebar />
                          </div>

                          {/* blog pagination */}
                          <BlogPagination />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </LayoutOne>
    </Fragment>
  );
};

BlogNoSidebar.propTypes = {
  location: PropTypes.object
};

export default BlogNoSidebar;
