import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PictureAttach from "./PictureAttach";
import ProductText from "./ProducText";
import productService from "./productService";
import {useToasts} from "react-toast-notifications";
import {Button} from "@material-ui/core";

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

const ProductRegister = () => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [flag, setFlag] = useState(false)
    const {addToast} = useToasts();

    const changeState = ()=>{
        setFlag(!flag);
    }



    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            <Grid item>
                                <ProductText></ProductText>
                                {productService.getMode() === 'update'?
                                    <Button style={btn} variant="outlined" color="primary" onClick={productService.editProduct}>{'수정'}</Button>:
                                    <Button style={btn} variant="outlined" color="primary" onClick={()=>{productService.addProduct(addToast)}}>{'등록'}</Button>
                                }

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <PictureAttach></PictureAttach>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
export default ProductRegister;
