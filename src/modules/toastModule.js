import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const ToastCenter = (msg) => {
    toast.warn(msg, {
        toastId: 'toastCenter',
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        bodyStyle: {
            color: 'black',
            fontSize: '17px',
            fontWeight: 'bold',
        },
        transition: Zoom,
        className: 'toastCenter',
    });
};

export const ToastTopRight = (msg) => {
    toast.info(msg, {
        toastId: 'toastTopRight',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        bodyStyle: {
            color: 'black',
            fontSize: '17px',
            fontWeight: 'bold',
        },
        className: 'toastInfo',
    });
};

export const ToastError = (msg) => {
    toast.error("❌"+msg, {
        toastId: 'toastError',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        bodyStyle: {
            color: 'black',
            fontSize: '17px',
            fontWeight: 'bold',
        },
        className: 'toastError',
    });
};

export const ToastWarning = (msg) => {
    toast.error("❗️"+msg, {
        toastId: 'toastError',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        bodyStyle: {
            color: 'black',
            fontSize: '15px',
            fontWeight: 'bold',
        },
        className: 'toastWarning',
    });
};
