import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Previews from "./Previews";
import ProductInfo from "./ProductInfo";

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


const initState = {
    info: {
        title: '',
        content: '',
    },
    pictures: []
}

const ProductRegister = ({addProductInfo}) => {
    const [spacing, setSpacing] = React.useState(2);
    const [product, setProduct] = useState(initState)

    const classes = useStyles();

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    const add = (event) => {
        setSpacing(Number(event.target.value));
    };

    const addInfo = (info) => {
        product.info = info
        setProduct({...product})
    }

    const addPictures = (pictures) => {
        product.pictures = pictures
        setProduct({...product})
        console.log(product)
    }

    return (

        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                    <Grid item>
                        <ProductInfo addInfo={addInfo}></ProductInfo>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.control}>
                    <Grid container>
                        <Grid item>
                            <Previews addPictures={addPictures}></Previews>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <button onClick={()=>{addProductInfo(product)}}>확인</button>
        </Grid>
    );
}
export default ProductRegister;
