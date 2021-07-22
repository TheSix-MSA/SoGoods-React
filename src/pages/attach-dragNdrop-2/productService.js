const productService = ()=>{

    let openFn;
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
        console.log(productList)
        return productList
    }

    const getProduct = () => product

    const getProductByIdx = (idx) => {
        return productList[idx]
    }

    //새 상품 apply눌렀을 떄
    const addProduct = () => {

        productList.push(product)

        //다이얼로그 닫기 -> 최상위 부모컴포넌트 랜더링
        closeDialog()
    }

    const setText = (form) => {



        product.text = form

    }

    const setPictures = (pictures)=>{
        product.pictures = pictures
    }



    //다이얼로그 창 닫기
    const closeDialog = () => {
        console.log('close')
        openFn(false)
        initProduct()
    }

    //새 상품등록버튼 클릭시
    const openDialog = () => {

        initProduct()

        //랜더링
        openFn(true)
    }

    //등록된 상품 수정을 위해 클릭시
    const openDialogForEdit = (idx) => {
        console.log(idx)
        product = getProductByIdx(idx)
        console.log(product)

        //랜더링
        openFn(true)
    }

    return {
        setOpenFn,

        getProductList,
        getProduct,
        addProduct,

        openDialog,
        closeDialog,

        openDialogForEdit,

        setText,
        setPictures,
    }
}
export default productService()