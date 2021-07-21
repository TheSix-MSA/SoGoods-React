const codeService = () => {

    let fn;
    let closeFn;
    let warningFn;
    let closeWarningFn;

    const setCloseFn = (func) => {
        closeFn = func;
    };

    const setFn = (func)=>{
        fn = func
    }

    const popUpModal = ()=>{
        fn();
    }

    const closeModal = ()=>{
        closeFn();
    }
    const setWarningCloseFn = (func) => {
        closeWarningFn = func;
    };

    const setWarningFn = (func) => {
        warningFn = func;
    };

    const popUpWarningModal = () => {
        warningFn();
    };

    const closeWarningModal = () => {
        closeWarningFn();
    };


    return {setFn,popUpModal,setCloseFn,closeModal,setWarningFn,setWarningCloseFn,popUpWarningModal,closeWarningModal}
};

export default codeService();