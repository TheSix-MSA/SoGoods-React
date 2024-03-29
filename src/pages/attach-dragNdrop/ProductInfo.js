import React, {useState} from 'react';
import useInputs from "../../customHooks/useInputs";
const initState = {
    title: '',
    content: '',
}




const ProductInfo = ({updateText}) => {

    const [form, changeForm] = useInputs(initState);

    const changeValue = (e)=>{
        changeForm(e)
        updateText(form)
    }

    return (
        <div>
            <div>상품명<input type="text" name='title'   onChange={changeValue}/></div>
            <div>내용<textarea           name='content' onChange={changeValue}/></div>
        </div>
    )
}

export default ProductInfo