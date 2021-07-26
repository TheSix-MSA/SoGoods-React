import React, {useState} from 'react';
import useInputs from "../../../customHooks/useInputs";
import productUpdateService from "./productUpdateService";
// const initState = {
//     title: '',
//     content: '',
// }

const ProductUpdateText = ({}) => {

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
    const [form, changeForm] = useInputs(productUpdateService.getProduct().text);

    productUpdateService.setText(form)


    return (
        <div>
            <div>상품이름
                <input
                    name='name'
                    value={form.name}
                    onChange={changeForm}/>
            </div>
            <div>상품설명
                <textarea
                    name='des'
                    value={form.des}
                    onChange={changeForm}/>
            </div>
            <div>가격<input type='number' name='price'   value={form.price}    onChange={changeForm}/></div>
        </div>
    )
}

export default ProductUpdateText