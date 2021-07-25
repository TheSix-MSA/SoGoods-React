import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProductUpdateText from "./ProductUpdateText";
import PictureUpdateAttach from "./PictureUpdateAttach";
import productUpdateService from "./productUpdateService";

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

const ProductUpdateRegister = () => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [flag, setFlag] = useState(false)

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
                                <ProductUpdateText></ProductUpdateText>
                                {productUpdateService.getMode() === 'update'?
                                    <button onClick={productUpdateService.editProduct}>{'수정'}</button>:
                                    <button onClick={productUpdateService.addProduct}>{'등록'}</button>
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
