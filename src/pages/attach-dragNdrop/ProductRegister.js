import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
        <>

        </>
    );
}
export default ProductRegister;
