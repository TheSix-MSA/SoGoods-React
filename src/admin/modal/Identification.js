// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Tab from "react-bootstrap/Tab";
// import noticeService from "../../admin/sevice/noticeService"
// import useInputs from "../../customHooks/useInputs";
// import {useHistory} from "react-router-dom";
// import {useSelector} from "react-redux";
//
// const initState = {
//     title: '',
//     writer: '',
//     email: '',
//     content: ''
// }
//
// export default function Identification() {
//     const [open, setOpen] = React.useState(false);
//     const [board, onChange] = useInputs(initState);
//     const history = useHistory()
//     const {email, name} = useSelector(state => state.login)
//     console.log(history)
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     const register = () => {
//         noticeService.registerBoard({...board, email: email, writer: name}).then(res => {
//             // history.push(`/admin/notice`)
//             history.push(`/board/notice/list`)
//         })
//     }
//     return (
//         <div>
//             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 공지 글 작성
//             </Button>
//             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//                 <DialogTitle id="form-dialog-title">공지글</DialogTitle>
//
//                 <Tab.Container>
//                     <h3> 글작성 </h3>
//                     <div className="login-form-container">
//                         <div className="login-register-form">
//                             <input
//                                 type={"text"}
//                                 name={"title"}
//                                 placeholder="Title"
//                                 value={board.title}
//                                 onChange={onChange}
//                             />
//
//                             <textarea
//                                 name={"content"}
//                                 placeholder="Content"
//                                 value={board.content}
//                                 onChange={onChange}
//                             />
//                             <DialogActions>
//                                 <Button type="button" color="primary" onClick={() => {
//                                     register()
//                                 }} >
//                                     작성
//                                 </Button>
//                                 <Button onClick={handleClose} color="primary">
//                                     취소
//                                 </Button>
//                             </DialogActions>
//                         </div>
//
//                     </div>
//                 </Tab.Container>
//             </Dialog>
//         </div>
//
//
//     );
// }