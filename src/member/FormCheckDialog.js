import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Postcode from "./Postcode";
import codeService from "./codeService";
import DialogContentText from "@material-ui/core/DialogContentText";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormCheckDialog({warningType}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    codeService.setWarningFn(handleClickOpen);
    codeService.setWarningCloseFn(handleClose);

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {warningType.type==="인증"?
                        "email 인증이 필요합니다" :warningType.type==="same"?"패스워드가 일치하지 않습니다.":
                            warningType.type+"은 필수입력사항입니다."
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </div>
    );
}