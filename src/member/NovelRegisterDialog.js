import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import myAccountService from "./myAccountService";
import axios from "axios";

const initNovelState = {
    isbn:"",
    title:"",
    image:"",
    publisher:"",
    email:"",
    cover:"",
    isbn13:""
}


export default function NovelRegisterDialog({searchBook}) {
    const [open, setOpen] = React.useState(false);
    const [bookInfo, setBook] = useState(initNovelState);
    const [errorFlag, setErrorFlag] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        if (open) {
            myAccountService.searchNovelList(searchBook.isbn)
                .then(novel => {
                    if (novel.errorCode) {
                        console.log(novel);
                        setErrorFlag(true);
                    } else {
                        console.log(novel.item[0]);
                        setBook({...novel.item[0]});
                    }
                });
        }

    }, [open]);




    myAccountService.setDialogFn(handleClickOpen);
    myAccountService.setCloseDialogFn(handleClose);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {errorFlag === false ? <DialogTitle id="alert-dialog-title" style={{fontWeight:"bold"}}>{bookInfo.title}</DialogTitle> :
                    <DialogTitle id="alert-dialog-title">{"책 정보가 없습니다."}</DialogTitle>}
                <DialogContent>
                    {errorFlag === false ?
                        <DialogContentText id="alert-dialog-description" style={{width: "35vw"}}>
                            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div style={{height:"100%", textAlign:"center", padding:"3px", background:"lightgray"}}>
                                    <img src={bookInfo.cover} style={{objectFit: "contain"}} alt=""/>
                                </div>
                                <div style={{display:"flex", flexDirection:"column",justifyContent:"space-evenly"}}>
                                    <p><strong>Title : </strong><span>{bookInfo.title}</span></p>
                                    <p><strong>ISBN : </strong><span>{bookInfo.isbn13}</span></p>
                                    <p><strong>Publisher : </strong><span>{bookInfo.publisher}</span></p>
                                </div>
                            </div>
                        </DialogContentText> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};