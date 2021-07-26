import PropTypes from "prop-types";
import React, {Fragment, useEffect, useRef, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../components/layouts/header/LayoutOne";
import BlogPagination from "./BlogPagination";
import BlogPostsNoSidebar from "./BlogPostsNoSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getBoardData} from "../redux/board/boardAsyncService";
import {useHistory, useLocation} from "react-router-dom";
import useInputs from "../customHooks/useInputs";
import * as queryString from "querystring";
import boardService from "./boardService";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import BoardNotice from "./BoardNotice";
import {Form} from "react-bootstrap";

const initState = {
    page: 1,
    type: "t",
    keyword: '',
}
const BlogNoSidebar = ({match}) => {
    const {roles} = useSelector(state => state.login)
    const classes = useStyles();
    const location = useLocation()
    const [boardData, setBoardData] = useState({})
    const [notice, setNotice] = useState({})
    const value = queryString.parse(location.search.replace("?", ""));
    const dispatch = useDispatch()
    const history = useHistory()
    const boardType = useRef(match.params.boardType?.toUpperCase())
    const [search, onChange, setSearch] = useInputs({...initState, page: value.page || 1})

    useEffect(() => {
        boardType.current = match.params.boardType.toUpperCase()
        dispatch(getBoardData({
            ...search, page: value.page, boardType: boardType.current,
            keyword: value.keyword, type: value.type
        })).unwrap().then(res => {
            setBoardData(res.response)
        })
        boardService.noticeBoard(100).then(res => {
            setNotice(res.data.response)
        })
    }, [dispatch, value.page, match.params.boardType])

    const searching = (e) => {
        e.preventDefault();
        dispatch(getBoardData({...search, boardType: boardType.current})).unwrap().then(res => {
            setBoardData(res.response)
            history.push(`/board/${boardType.current}/list?page=1&keyword=${search.keyword}&type=${search.type}`)
        })
    }

    const boardRegister = () => {
        history.push(`/board/${boardType.current}/boardRegister`)
    }

    const registerBtn = () => {
        return (
            <div style={{textAlign: "right"}}>
                <Button variant="contained" size="small" color="primary" className={classes.margin}
                        onClick={boardRegister}> 글쓰기 </Button>
            </div>
        )
    }

    console.log(roles)
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
                <div className="blog-area pt-100 pb-100 blog-no-sidebar">
                    <div className="container">
                        {boardType.current === "NOTICE" &&roles.includes("ADMIN") ?
                            registerBtn() : null}
                        {boardType.current === "NOVELIST" &&roles.includes("AUTHOR") ?
                            registerBtn() : null}
                        {boardType.current === "FREE" ?
                            registerBtn() : null}
                        <div className="pro-sidebar-search mb-55 mt-25">
                            <Form onSubmit={searching}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink id="demo-simple-select-placeholder-label-label">
                                        선택
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        name="type"
                                        defaultValue="t"
                                        onChange={onChange}>
                                        <MenuItem value="t"> 제목</MenuItem>
                                        <MenuItem value="w"> 작성자</MenuItem>
                                        <MenuItem value="c"> 내용</MenuItem>
                                        <MenuItem value="tc"> 제목+내용</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    style={{width: "80%", margin: "8px"}}
                                    id="standard-basic"
                                    label="검색어"
                                    name="keyword"
                                    value={search.keyword}
                                    onChange={onChange}/>
                                <Button type="submit" variant="outlined" onClick={searching}
                                        style={{marginTop: "15px", padding: "15px 15px"}}>
                                    <i className="pe-7s-search"/>
                                </Button>
                            </Form>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mr-20">
                                    <div className="row">
                                        {/* blog posts */}
                                        {notice && boardType.current !== "NOTICE" &&
                                        <BoardNotice notice={notice.boardDtoList} page={notice.pageMaker}/>
                                        }
                                        {boardData.boardDtoList !== null ? (
                                            <BlogPostsNoSidebar
                                                notice={notice}
                                                boardData={boardData.boardDtoList}
                                                boardType={boardType.current}
                                            />
                                        ) : <p> 일치하는 결과가 없습니다. </p>}
                                    </div>
                                    {/* blog pagination */}
                                    {boardData &&
                                    <BlogPagination
                                        boardType={boardType.current}
                                        pageMaker={boardData.pageMaker}
                                        request={boardData.boardListRequestDTO}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>

    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


BlogNoSidebar.propTypes = {
    location: PropTypes.object
};

export default BlogNoSidebar;
