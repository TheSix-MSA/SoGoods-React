import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductRegister from "./ProductRegister";
import productService from "./productService";

const imgStyle = {
    display: 'block',
    width: 100,
    height: 50,
};

const btn ={
    float: 'none',
}

const initAllProduct = [
    {info: {},pictures:[]},
]

const ProductInputList = () => {
    const [open, setOpen] = useState(false);
    const [allProduct, setAllProduct] = useState(initAllProduct)

    productService.setOpenFlag(setOpen)

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addRegister = () => {
        // console.log(allProduct)
    }

    const editProduct = (product)=>{
        productService.updateProduct(product)
    }

    const list = productService.getProductList().map((product, i)=>{
        return (
            <>
                <li key={i} onClick={()=>{editProduct(product)}}>
                    <p>{product.text.title} : {product.text.content}</p>
                    <div>{product.pictures.map((picture ,j)=>
                        <img key={j} src={picture.preview} style={imgStyle}/>)}
                    </div>
                </li>
            </>
        )
    })



    return (
        <div>
            <h1>BOARD</h1> <Button onClick={addRegister} variant="outlined" color="primary">등록</Button>

            <div style={{display: 'block'}}>
                <Button style={btn} variant="outlined" color="primary" onClick={handleClickOpen}>
                    상품 등록
                </Button>
            </div>
            <ol>
                {list}
            </ol>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'
            >


                <DialogTitle id="alert-dialog-title">{'상품 등록/수정'}</DialogTitle>
                <DialogContent>
                    <ProductRegister></ProductRegister>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Disagree*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary" autoFocus>*/}
                {/*        Agree*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}
export default ProductInputList