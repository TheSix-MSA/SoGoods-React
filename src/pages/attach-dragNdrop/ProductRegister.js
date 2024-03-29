import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PictureAttach from "./PictureAttach";
import ProductInfo from "./ProductInfo";
import productService from "./productService";

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

const ProductRegister = () => {
    const [product, setProduct] = useState({
        text: {
            title: '',
            content: '',
        },
        pictures: [
        ]
    })
    productService.setProduct(setProduct)

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const updateText = (text)=>{
        setProduct({...product, text: text})
    }

    const updatePictures = (pictures)=>{
        const newPictures = pictures.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        setProduct({...product, pictures: newPictures})
    }

    const registerTemp = ()=>{
        //apply 할 때, 자식 컴포넌트 두 곳의 데이터를 가져오기
        productService.addProduct(product)
    }

    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            <Grid item>
                                <ProductInfo updateText={updateText}></ProductInfo>
                                <button onClick={registerTemp}>확인</button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <PictureAttach updatePictures={updatePictures}></PictureAttach>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>


            </Grid>
        </>
    );
}
export default ProductRegister;
