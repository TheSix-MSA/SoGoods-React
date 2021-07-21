const productService = ()=>{

    let openFn;
    const product = {
        text:{
            title: '',
            content: ''
        },
        pictures: []
    }



    const productList = [
        // {
        //     text:{
        //         title: 'aaa',
        //         content: 'ㄱㄱㄱ'
        //     },
        //     pictures: []
        // },
    ]

    const setOpenFn = (func)=>{
        openFn = func
    }

    const getProductList = () => productList
    const getProduct     = () => product

    //새 상품 등록
    const addProduct = () => {
        productList.push(product)
        openFn(false)
    }

    return {
        setOpenFn,
        getProductList,
        getProduct,
        addProduct,
    }
}
export default productService()