import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Previews from "./Previews";
import ProductRegister from "./ProductRegister";
import BoardService from "./BoardService";

const img = {
    display: 'block',
    width: 100,
    height: 50,

};

const btn ={
    float: 'none',
}

const Board = () => {
    const [open, setOpen] = useState(false);
    const [allProduct, setAllProduct] = useState([])
    console.log(allProduct)
    const handleClickOpen = (e) => {
        e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addProductInfo = (product)=>{
        allProduct.push(product)
        console.log(allProduct)
        setAllProduct([...allProduct])
        handleClose()
    }

    const productList = allProduct.map((product, idx)=>{

        const allImg = product.pictures;
        return (
            <>
                <li  >
                    <p onClick={handleClickOpen}>{product['info']['title']} - {product['info']['content']}</p>
                    <div>
                        {allImg.map((picture,j)=><img key={j} src={picture.preview} style={img}/>)}
                    </div>
                </li>
            </>
        )
    });

    const addRegister = () => {
        console.log(allProduct)
    }

    return (
        <div>
            <h1>BOARD</h1> <Button onClick={addRegister} variant="outlined" color="primary">등록</Button>
            {productList}
            <div style={{display: 'block'}}>
                <Button style={btn} variant="outlined" color="primary" onClick={handleClickOpen}>
                    상품 등록
                </Button>
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ProductRegister  addProductInfo={addProductInfo}></ProductRegister>

                {/*<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-description">*/}
                {/*        Let Google help apps determine location. This means sending anonymous location data to*/}
                {/*        Google, even when no apps are running.*/}
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
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
export default Board