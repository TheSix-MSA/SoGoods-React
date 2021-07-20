import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const BlogPostsNoSidebar = ({data}) => {
  console.log(data)
  return (
    <Fragment>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="blog-wrap-2 mb-30">
            <div className="blog-content-2">
              <div className="blog-meta-2">
                <ul>
                  <li>22 April, 2020</li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                      4 <i className="fa fa-comments-o" />
                    </Link>
                  </li>
                </ul>
              </div>
              <h4>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  Lorem ipsum blog post
                </Link>
              </h4>
              <p>
                Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
                cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
              </p>
              <div className="blog-share-comment">
                <div className="blog-btn-2">
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    read more
                  </Link>
                </div>
                <div className="blog-share">
                  <span>share :</span>
                  <div className="share-social">
                    <ul>
                      <li>
                        <a className="facebook" href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a className="twitter" href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a className="instagram" href="//instagram.com">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default BlogPostsNoSidebar;
