import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import myAccountService from "../../member/myAccountService";
import useInputs from "../../customHooks/useInputs";


const initUserInfo = {
  email:"",
  password: "",
  name: "",
  gender: "",
  birth: "",
  phone: "",
  address: "",
  detailAddress: ""
};

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const userSelector = useSelector(state => state.login);
  const [userInfo, setUserInfo, setInfo] = useInputs(initUserInfo);
  const [editFlag, setEditFlag] = useState(false);

  useEffect(() => {
    myAccountService.getMyInfo(userSelector.email)
        .then(value => setInfo(value.data.response));
  },[]);



  const editInfo = () => {
    setEditFlag(true);
  };

  const applyInfo = () => {
    setEditFlag(false);
  };

  console.log(userInfo);

  return (
      <Fragment>
        <MetaTags>
          <title>Flone | My Account</title>
          <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          My Account
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb/>
          <div className="myaccount-area pb-80 pt-100">
            <div className="container">
              <div className="row">
                <div className="ml-auto mr-auto col-lg-9">
                  <div className="myaccount-wrapper">
                    <Accordion defaultActiveKey="0">
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="0">
                            <h3 className="panel-title">
                              <span>1 .</span> Edit your account information{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>My Account Information</h4>
                                <h5>Your Personal Details</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>email</label>
                                    <input type="email" name="email" value={userInfo.email} disabled={true}
                                           style={{background: "lightgray"}}/>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Name</label>
                                    <input type="text" name="name" value={userInfo.name} disabled={true}
                                           style={{background: "lightgray"}} onChange={setUserInfo}/>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Telephone</label>
                                    {
                                      editFlag === false ?
                                          <input type="text" name="phone" value={userInfo.phone} disabled={true}
                                                 style={{background: "lightgray"}}/> :
                                          <input type="phone" name="phone" value={userInfo.phone} onChange={setUserInfo}/>
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Address</label>
                                    {
                                      editFlag === false ?
                                          <input type="text" name="address" value={userInfo.address} disabled={true}
                                                 style={{background: "lightgray"}}/> :
                                          <input type="text" name="address" value={userInfo.address} onChange={setUserInfo}/>
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Detail Address</label>
                                    {
                                      editFlag === false ?
                                          <input type="text" name="detailAddress" value={userInfo.detailAddress}
                                                 style={{background: "lightgray"}} disabled={true}/> :
                                          <input type="text" name="detailAddress" value={userInfo.detailAddress} onChange={setUserInfo}/>
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password</label>
                                    {
                                      editFlag === false ?
                                          <input type="password" name="password" style={{background: "lightgray"}}
                                                 disabled={true}/> :
                                          <input type="password" name="password" onChange={setUserInfo}/>
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password check</label>
                                    {
                                      editFlag === false ?
                                          <input type="password" name="passwordCheck" disabled={true}
                                                 style={{background: "lightgray"}}/> :
                                          <input type="password" name="passwordCheck" onChange={setUserInfo}/>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  {
                                    editFlag === false ?
                                        <button onClick={editInfo}>Edit</button> :
                                        <button onClick={applyInfo}>apply</button>
                                  }
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="1">
                            <h3 className="panel-title">
                              <span>2 .</span> Change your password
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Change Password</h4>
                                <h5>Your Password</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password</label>
                                    <input type="password"/>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password Confirm</label>
                                    <input type="password"/>
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Continue</button>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="2">
                            <h3 className="panel-title">
                              <span>3 .</span> Modify your address book entries{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Address Book Entries</h4>
                              </div>
                              <div className="entries-wrapper">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-info text-center">
                                      <p>John Doe</p>
                                      <p>Paul Park </p>
                                      <p>Lorem ipsum dolor set amet</p>
                                      <p>NYC</p>
                                      <p>New York</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-edit-delete text-center">
                                      <button className="edit">Edit</button>
                                      <button>Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Continue</button>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;
