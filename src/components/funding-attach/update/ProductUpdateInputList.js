import React, {useEffect, useState} from 'react';
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

const ProductUpdateInputList = () => {
    console.log('1 랜더링')
    const [open, setOpen] = useState(false);
    
    productService.setOpenFn(setOpen)

    const list = productService.getProductList().map((product, i)=>{
        console.log(product)
        product.pictures.map((picture )=> Object.assign(picture, {
            preview: URL.createObjectURL(picture)
        }))
        return (
            <>
                <li key={i}>
                    <p onClick={()=>{productService.openDialogForEdit(i)}}>{product.text.title} : {product.text.content}</p>
                    <div>
                        {product.pictures.map((picture ,j)=>
                        <img key={j} src={picture.preview} style={imgStyle}/>)}
                    </div>
                </li>
            </>
        )
    })

    useEffect(() => () => {
        console.log('uesEffect...1')

        // Make sure to revoke the data uris to avoid memory leaks
        //  productService.getProductList().map(product => {
        //      product.pictures.forEach(file => {
        //         console.log("삭제할 preview ", file.preview)
        //          URL.revokeObjectURL(file.preview)
        //      });
        //  })
        console.log('productService.getProductList(): ', productService.getProductList())
    }, [open]);

    return (
        <div>
            <h1>BOARD</h1> <Button variant="outlined" color="primary">등록</Button>
            <ul>
                {list}
            </ul>


            <div style={{display: 'block'}}>
                <Button style={btn} variant="outlined" color="primary" onClick={productService.openDialog}>
                    상품 등록
                </Button>
            </div>
            <ol>
            </ol>
            <Dialog
                open={open}
                onClose={productService.closeDialog}
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
export default ProductUpdateInputList