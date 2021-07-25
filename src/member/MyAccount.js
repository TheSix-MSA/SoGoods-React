import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../components/layouts/header/LayoutOne";
import {useSelector} from "react-redux";
import myAccountService from "./myAccountService";
import useInputs from "../customHooks/useInputs";
import CodeDialogSlide from "./CodeDialog";
import codeService from "./codeService";
import {useToasts} from "react-toast-notifications";
import {useHistory} from "react-router-dom";
import NovelRegisterDialog from "./NovelRegisterDialog";
import MyNovel from "./MyNovel";
import MyOrders from "../pages/order/MyOrders";

const initUserInfo = {
  email:"",
  name: "",
  gender: "",
  birth: "",
  phone: "",
  address: "",
  detailAddress: ""
};

const initPassword = {
  email:"",
  password:"",
  passwordCheck:""
};


const initSearchBook = {
  isbn:""
};

const MyAccount = () => {
  const userSelector = useSelector(state => state.login);
  const [userInfo, setUserInfo, setInfo] = useInputs(initUserInfo);
  const [passInfo, setPassInfo, setPass] = useInputs({...initPassword,email:userSelector.email});
  const [searchBook, setSearchBook, setBook] = useInputs({...initSearchBook});
  const [editFlag, setEditFlag] = useState(false);
  const [passEditFlag, setPassEditFlag] = useState(false);
  const {addToast} = useToasts();

  useEffect(() => {
    let isSubscribed = true;
    myAccountService.getMyInfo(userSelector.email)
        .then(value => {
          if(isSubscribed) setInfo({...value.data.response});
        });
    return () => {
      isSubscribed = false
    }
  },[userSelector]);

  /**
   * 유저 수정 글쓰기기능 활성화
   */
  const editInfo = () => {
    setEditFlag(true);
  };

  /**
   * 유저 수정 글쓰기기능 활성화
   */
  const passEditInfo = () => {
    setPassEditFlag(true);
  };

  /**
   * 수정하기
   */
  const applyInfo = (e) => {
    e.preventDefault();

    for (let info in userInfo) {
      if (userInfo[info] === "") {
        addToast(info + "을 입력해주세요.", {appearance: 'warning', autoDismiss: true});
        return;
      }
    };

    myAccountService.modifyInfo(userInfo).then(value => {
      addToast("회원정보가 수정되었습니다", {appearance: 'success', autoDismiss: true});
    });

    setEditFlag(false);
  };

  /**
   * 카카오 주소APi에서 받은 주소를 상태에 추가.
   *
   * @param address
   */
  const addAddress = (address) => {
    setInfo({...userInfo,address:address});
  };


  /**
   * 비밀번호 수정버튼
   */
  const passApplyInfo = (e) => {
    e.preventDefault()

    if(passInfo.password!==passInfo.passwordCheck){
      addToast("패스워드가 일치하지 않습니다.", {appearance: 'warning', autoDismiss: true});
    }else{

      for (let info in passInfo) {
        if (passInfo[info] === "") {
          addToast(info + "를 입력해주세요.", {appearance: 'warning', autoDismiss: true});
          return;
        }
      }//end of for loop

      myAccountService.modifyInfo(passInfo).then(value => {
        addToast("회원정보가 수정되었습니다", {appearance: 'success', autoDismiss: true});
      });

      setPassEditFlag(false);
    }
  };

  /**
   *  kakao 주소찾기 api모달 호출
   */
  const popupPost = () => {
    codeService.popUpModal();
  };
  const getNovel = () => {
    myAccountService.searchNovelList(9788970127248);
  };


  /**
   * 검색팝업을 올림.
   */
  const searchIsbn = () =>{
    myAccountService.popUpDialogFn();
  }

  const clearInput = () => {
    setBook({...initSearchBook});
  };

  myAccountService.setClearInputFn(clearInput);
  const roles = JSON.parse(localStorage.getItem("userData")).roles.includes("AUTHOR");


  return (
      <Fragment>
        <MetaTags>
          <title>Flone | My Account</title>
          <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
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
                                          <input type="phone" name="phone" value={userInfo.phone}
                                                 onChange={setUserInfo}/>
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
                                          <input type="text" name="address" value={userInfo.address}
                                                 onChange={setUserInfo} onClick={popupPost}/>
                                    }
                                  </div>
                                </div>
                                <CodeDialogSlide addAddress={addAddress}></CodeDialogSlide>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Detail Address</label>
                                    {
                                      editFlag === false ?
                                          <input type="text" name="detailAddress" value={userInfo.detailAddress}
                                                 style={{background: "lightgray"}} disabled={true}/> :
                                          <input type="text" name="detailAddress" value={userInfo.detailAddress}
                                                 onChange={setUserInfo}/>
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
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password</label>
                                    {
                                      passEditFlag === false ?
                                          <input type="password" name="password" style={{background: "lightgray"}}
                                                 disabled={true}/> :
                                          <input type="password" name="password" onChange={setPassInfo}
                                                 minLength={8}
                                          />
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password check</label>
                                    {
                                      passEditFlag === false ?
                                          <input type="password" name="passwordCheck" disabled={true}
                                                 style={{background: "lightgray"}}/> :
                                          <input type="password" name="passwordCheck" onChange={setPassInfo}
                                                 minLength={8}
                                          />
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  {
                                    passEditFlag === false ?
                                        <button onClick={passEditInfo}>Edit</button> :
                                        <button onClick={passApplyInfo}>apply</button>
                                  }
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
                              <span>3 .</span> Your Board List
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Change Password</h4>
                                <h5>Your Password</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password</label>
                                    {
                                      passEditFlag === false ?
                                          <input type="password" name="password" style={{background: "lightgray"}}
                                                 disabled={true}/> :
                                          <input type="password" name="password" onChange={setPassInfo}
                                                 minLength={8}
                                          />
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>password check</label>
                                    {
                                      passEditFlag === false ?
                                          <input type="password" name="passwordCheck" disabled={true}
                                                 style={{background: "lightgray"}}/> :
                                          <input type="password" name="passwordCheck" onChange={setPassInfo}
                                                 minLength={8}
                                          />
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  {
                                    passEditFlag === false ?
                                        <button onClick={passEditInfo}>Edit</button> :
                                        <button onClick={passApplyInfo}>apply</button>
                                  }
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="single-my-account mb-20" >
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="3">
                            <h3 className="panel-title">
                              <span>4 .</span> orders you've made{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Your Orders</h4>
                              </div>
                              <div className="align-items-center justify-content-center entries-wrapper">
                                <div className="billing-info  entries-edit-delete">
                                </div>
                              </div>
                              <MyOrders/>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      {roles?
                        <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="4">
                            <h3 className="panel-title">
                              <span>5 .</span> Modify your address book entries{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Address Book Entries</h4>
                              </div>
                              <NovelRegisterDialog searchBook={searchBook}/>
                              <div className="align-items-center justify-content-center entries-wrapper">
                                <div className="billing-info  entries-edit-delete text-center"
                                     style={{padding: "15px"}}>
                                  <label>Register Book</label>
                                  <div style={{display: "flex"}}>
                                    <input type="text" name="isbn" placeholder={"ISBN (13자리)"} onChange={setSearchBook}
                                           minLength={13} value={searchBook.isbn}/>
                                    <button className="edit" onClick={searchIsbn} style={{marginLeft: "15px"}}>SEARCH
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <MyNovel></MyNovel>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>:null}
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
