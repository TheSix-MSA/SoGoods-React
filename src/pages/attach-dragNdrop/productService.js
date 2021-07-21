const productService = ()=>{

    const productList = [
        // {
        //     text: {
        //         title: 'aaa',
        //         content: 'ㄱㄱㄱ',
        //     },
        //     picture: [
        //     ]
        // },
    ]

    let openFlag;
    let setProductFn;

    const setOpenFlag = (func)=>{
        openFlag = func
    }

    //선택한 상품을 변경시키는 함수를 set하는 함수
    const setProduct = (func)=>{
        setProductFn = func
    }

    //선택한 상품으로 다이얼로그창 띄우기
    const updateProduct = (product)=>{
        setProductFn(product)
        openFlag(true)
    }

    //적용한 상품 조회화면
    const getProductList = ()=> productList

    const addProduct = (product) => {
        productList.push(product)
        console.log(productList)
        openFlag(false)//다이얼로그 창 닫기
    }

    return {
        getProductList,
        addProduct,

        setOpenFlag,
        setProduct,
        updateProduct,

    }
}
export default productService()