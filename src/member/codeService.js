const codeService = () => {

    let fn;
    let closeFn;
    let warningFn;
    let closeWarningFn;

    /**
     * 팝업끄는기능 지정
     * @param func
     */
    const setCloseFn = (func) => {
        closeFn = func;
    };

    /**
     * 팝업 끄기
     * @param func
     */
    const closeModal = ()=>{
        closeFn();
    }

    /**
     * 팝업 여는기능 지정
     * @param func
     */
    const setFn = (func)=>{
        fn = func
    }

    /**
     * 팝업 열기
     */
    const popUpModal = ()=>{
        fn();
    }

    /**
     * 경고팝업닫기 세팅
     * @param func
     */
    const setWarningCloseFn = (func) => {
        closeWarningFn = func;
    };

    /**
     * 경고팝업 열기 세팅
     * @param func
     */
    const setWarningFn = (func) => {
        warningFn = func;
    };

    /**
     * 경고팝업 열기
     */
    const popUpWarningModal = () => {
        warningFn();
    };

    /**
     * 경고팝업 닫기
     */
    const closeWarningModal = () => {
        closeWarningFn();
    };


    return {setFn,popUpModal,setCloseFn,closeModal,setWarningFn,setWarningCloseFn,popUpWarningModal,closeWarningModal}
};

export default codeService();