const BoardService = () => {

    const allProduct = []

    let fn;

    const getAllProduct = ()=>allProduct

    const setFn = (func) => {
        fn = func
    }

    const addProduct = (product) => {
        allProduct.push(product)
    }

    const removeProduct = (idx) =>{
        allProduct.splice(idx, 1)
    }

    return {
        getAllProduct,
        setFn,
        addProduct,
        removeProduct,

    }
}

export default BoardService