import React, {useState} from 'react';

const initState = {
    title: '',
    content: ''

}

const ProductInfo = ({addInfo}) => {

    const [info, setInfo] = useState({...initState})

    const change = (e) => {
        info[e.target.name] = e.target.value

        addInfo(info)

        setInfo({...info})
    }

    return (
        <div>
            <div>상품명<input type="text" name={'title'} value={info.title} onChange={change}/></div>
            <div>내용<textarea name={'content'} value={info.content} onChange={change}/></div>
        </div>
    );
};

export default ProductInfo;