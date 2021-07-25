import React, {Fragment} from 'react';
import getFormatDate from "../modules/getFormatDate";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const BoardNotice = ({notice, page}) => {
    const classes = useStyles();
    const history = useHistory()
    const moveDetail = (bno) => {
        history.push(`/board/NOTICE/${bno}`)
    }
    console.log(notice)
    return (
        <Fragment>
            {notice && notice?.map((data, idx) => (
                <Grid container>
                    <Grid item xs={12} key={idx}>
                        {data.private === false &&
                        <Paper className={classes.paper}>
                            <span style={{float: "left"}}> 공지사항 </span>
                            <div onClick={() => {
                                moveDetail(data.bno)
                            }}>
                                <span style={{}}> {data.title} </span>
                                {data.content}
                                {getFormatDate(new Date(data.modDate))}
                                <span
                                    style={{display: "inline-block", paddingLeft: "10px"}}>
                                    {data.replyCnt} <i className="fa fa-comments-o"/>
                                </span>
                            </div>
                        </Paper>
                        }
                    </Grid>
                </Grid>
            ))}
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '10px',
        backgroundColor: ''
    },
}));

export default BoardNotice;