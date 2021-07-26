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
    return (
        <Fragment>
            {notice && notice?.map((data, idx) => (
                <Grid container key={idx}>
                    <Grid item xs={12} style={{cursor:"pointer"}}>
                        {data.private === false &&
                        <Paper className={classes.paper}>
                            <span style={{float: "left"}}> 공지사항 </span>
                            <div onClick={() => {
                                moveDetail(data.bno)
                            }}>
                                <span style={{textOverflow:"ellipsis", whiteSpace:"nowrap",
                                    overflowX:"hidden", maxWidth:"200px", height: "30px"}}> {data.title} </span>
                                <span style={{float:"right"}}> {getFormatDate(new Date(data.modDate))} </span>
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
        color: "black",
        margin: '10px',
        backgroundColor: ''
    },
}));

export default BoardNotice;