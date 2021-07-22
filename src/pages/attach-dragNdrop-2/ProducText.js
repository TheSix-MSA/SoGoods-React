import React, {useState} from 'react';
import useInputs from "../../customHooks/useInputs";
import productService from "./productService";
const initState = {
    title: '',
    content: '',
}

const ProductText = ({}) => {
    console.log('ProductText 랜더링')

    //안좋은 코드
    // const product = productService.getProduct()
    // let state = null;
    // if(product.text.title === '' && product.text.content===''){
    //     state = initState
    // }else{
    //     state = product.text
    // }
    // const [form, changeForm] = useInputs(state);

    //Before
    const [form, changeForm] = useInputs(productService.getProduct().text);

    productService.setText(form)


    return (
        <div>
            <div>상품명<input  name='title'   value={form.title}    onChange={changeForm}/></div>
            <div>내용<textarea name='content' value={form.content} onChange={changeForm}/></div>
        </div>
    )
}

export default ProductText