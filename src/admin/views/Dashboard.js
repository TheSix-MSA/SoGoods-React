import React, {Fragment, useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
import fundingService from "../sevice/fundingService";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import memberService from "../sevice/memberService";
import noticeService from "../sevice/noticeService";

const initState = {
  dtoList: [
    {
      fundingDTO:
          {
            fno: 1,
            title: "",
            writer: "",
            email: "",
            content: "",
            regDate: "",
            dueDate: "",
            success: false,
            removed: false,
            totalAmount: 0,
            targetAmount: 1,
            authorized: false
          },
      mainProductPno: 1,
      favoriteCnt: 1
    },
  ],
  pageMaker: {
    page: 1,
    size: 10,
    totalCount: 0,
    keyword: "",
    type: "",
    pageList: [],
    prev: false,
    next: false
  },
  listRequestDTO: {
    page: 1,
    size: 10,
    keyword: "",
    type: ""
  }
}


function Dashboard() {
  const [funding, setFunding] = useState(initState);
  const [userCount, setUserCount] = useState({total:0,author:0});
  const [boardCount, setBoardCount] = useState({NOTICE: 0, NOVELIST: 0, FREE: 0});

  useEffect(() => {
    fundingService.getFundingList(funding.pageMaker.page).then(res => {
      setFunding(res.data.response);
    });
    memberService.getTotal().then(res =>{
      setUserCount(res.data.response);
    })
    noticeService.getTotal().then((res)=>{
      setBoardCount(res.data.response);
    })
  }, [])



  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">총 회원수</p>
                      <Card.Title as="h4">{userCount.total}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Total User
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">총 게시글 수</p>
                      <Card.Title as="h4">{boardCount.FREE+boardCount.NOTICE+boardCount.NOVELIST}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Total Board
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Total Income
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">총 펀딩 수</p>
                      <Card.Title as="h4">{funding.pageMaker.totalCount}개</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Total Funding
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">게시글 현황</Card.Title>
                <p className="card-category">Rate of All Boards</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                      data={{
                        labels: [
                          "Total Board",
                          "Free Board",
                          "Novelist Board",
                          "Notice Board",
                        ],
                        // series: [
                        //   [
                        //     boardCount.FREE+boardCount.NOTICE+boardCount.NOVELIST,
                        //   ],
                        //   [
                        //     boardCount.FREE,
                        //   ],
                        //   [
                        //     boardCount.NOVELIST,
                        //   ],
                        //   [
                        //     boardCount.NOTICE
                        //   ],
                        // ],
                        series: [
                          [
                            boardCount.FREE+boardCount.NOTICE+boardCount.NOVELIST,

                            boardCount.FREE,

                            boardCount.NOVELIST,

                            boardCount.NOTICE
                          ],
                        ],
                      }}
                      type="Bar"
                      options={{
                        seriesBarDistance: 140,
                        axisX: {
                          showGrid: false,
                        },
                        height: "245px",
                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            seriesBarDistance: 30,
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>Total Board
                  <i className="fas fa-circle text-danger"></i>Free Board
                  <i className="fas fa-circle text-danger"></i> Novelist Board
                  <i className="fas fa-circle text-danger"></i> Notice Board
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">작가와 일반회원 비율</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >

                  <ChartistGraph
                    data={{
                      labels: [`${Math.floor(((userCount.total-userCount.author)/userCount.total)*100)}%`,`${Math.floor((userCount.author/userCount.total)*100)}%`],
                      series: [userCount.total-userCount.author, userCount.author],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  AUTHOR <i className="fas fa-circle text-danger"></i>
                  GENERAL
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
