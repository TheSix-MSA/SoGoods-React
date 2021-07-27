import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProductUpdateText from "./ProductUpdateText";
import PictureUpdateAttach from "./PictureUpdateAttach";
import productUpdateService from "./productUpdateService";
import {Button} from "@material-ui/core";
import productService from "../add/productService";
import {useToasts} from "react-toast-notifications";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const btn ={
    clear: "both",
    margin:"10px"
}

const ProductUpdateRegister = () => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [flag, setFlag] = useState(false)
    const {addToast} = useToasts();

    const changeState = ()=>{
        setFlag(!flag);
    }

    const mode = productUpdateService.getMode()

    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            <Grid item>
                                <ProductUpdateText></ProductUpdateText>
                                {mode=='register'?
                                    <Button style={btn} variant="outlined" color="primary" onClick={()=>{productUpdateService.addProduct()}}>{'등록'}</Button>:
                                    <Button style={btn} variant="outlined" color="primary" onClick={()=>{productUpdateService.editProduct(addToast)}}>{'수정'}</Button>
                                }

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <PictureUpdateAttach></PictureUpdateAttach>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
export default ProductUpdateRegister;
