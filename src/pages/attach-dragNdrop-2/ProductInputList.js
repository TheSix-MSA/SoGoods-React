import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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

const ProductInputList = () => {
    const [open, setOpen] = useState(false);
    productService.setOpenFn(setOpen)

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleAutoClose = () => {
        setOpen(false);
    };

    const list = productService.getProductList().map((product, i)=>{
        console.log(product)
        return (
            <>
                <li key={i}>
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
            <h1>BOARD</h1> <Button variant="outlined" color="primary">등록</Button>
            <ul>
                {list}
            </ul>


            <div style={{display: 'block'}}>
                <Button style={btn} variant="outlined" color="primary" onClick={handleClickOpen}>
                    상품 등록
                </Button>
            </div>
            <ol>
            </ol>
            <Dialog
                open={open}
                onClose={handleAutoClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'>
                <DialogTitle id="alert-dialog-title">{'상품 등록/수정'}</DialogTitle>
                <DialogContent>
                    <ProductRegister></ProductRegister>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default ProductInputList