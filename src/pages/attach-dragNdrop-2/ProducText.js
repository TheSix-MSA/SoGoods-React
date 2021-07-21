import React, {useState} from 'react';
import useInputs from "../../customHooks/useInputs";
import productService from "./productService";
const initState = {
    title: '',
    content: '',
}

const ProductText = ({}) => {

    const [form, changeForm] = useInputs(initState);

    const changeValue = (e)=>{
        changeForm(e)
        productService.setText(form)

        productService.getProduct().text = form
    }

    return (
        <div>
            <div>상품명<input type="text" name='title'   onChange={changeValue}/></div>
            <div>내용<textarea           name='content' onChange={changeValue}/></div>
        </div>
    )
}

export default ProductText