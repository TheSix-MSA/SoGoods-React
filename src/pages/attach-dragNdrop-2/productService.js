const productService = ()=>{

    let openFn;
    let mode;
    let prodIdx;
    // let registerFn;

    // {
    //     text:{
    //         title: 'aaa',
    //         content: 'ㄱㄱㄱ'
    //     },
    //     pictures: []
    // },

    const productList = [
    ]

    let product;

    const fileObjList = []

    const setMode = (mod) => {
        mode = mod
    }

    const getMode = ()=>mode

    const initProduct = () => {
        product = {
            text:{
                title: '',
                content: ''
            },
            pictures: []
        }
    }

    const setOpenFn = (func)=>{
        openFn = func
    }

    // const setRegisterFn = (func) =>{
    //     registerFn = func
    // }

    const getProductList = () => {
        return productList
    }

    const getProduct = () => product

    const getProductByIdx = (idx) => {
        return {...productList[idx]}
    }

    //새 상품 apply눌렀을 떄
    const addProduct = () => {

        productList.push(product)

        //다이얼로그 닫기 -> 최상위 부모컴포넌트 랜더링
        closeDialog()
    }

    const editProduct = () => {
        productList[prodIdx] = {...product}
        openFn(false)
    }

    const setText = (form) => {



        product.text = form

    }

    const setPictures = (pictures)=>{
        product.pictures = pictures
    }



    //다이얼로그 창 닫기
    const closeDialog = () => {
        openFn(false)
        initProduct()
    }

    //새 상품등록버튼 클릭시
    const openDialog = () => {
        setMode('register')
        initProduct()

        //랜더링
        openFn(true)
    }

    //등록된 상품 수정을 위해 클릭시
    const openDialogForEdit = (idx) => {
        prodIdx = idx
        setMode('update')
        product = getProductByIdx(idx)

        //랜더링
        openFn(true)
    }

    const addFileObj = (file) => {
        fileObjList.push(file)
    }

    const getFileObj = () => fileObjList

    return {
        setOpenFn,

        getProductList,
        getProduct,
        addProduct,
        editProduct,

        openDialog,
        closeDialog,

        openDialogForEdit,

        setText,
        setPictures,

        getMode,

        addFileObj,
        getFileObj,

    }
}
export default productService()