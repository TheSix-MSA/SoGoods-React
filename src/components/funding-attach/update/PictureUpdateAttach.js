import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import productUpdateService from "./productUpdateService";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    minHeight: 100,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};




const PictureUpdateAttach = () => {



    const [files, setFiles] = useState(productUpdateService.getProduct().pictures);
    const [picDel, setPicDel] = useState([]);
    const [picIns, setPicIns] = useState([]);

    const maxFiles = 6

    useEffect(()=>{
        productUpdateService.initTempProduct()
    },[])

    let pictureToInsert = productUpdateService.getPictureToInsert();
    let pictureToDelete = productUpdateService.getPictureToDelete();
    const {
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
            accept: 'image/*',
            maxFiles: maxFiles,
            onDrop: acceptedFiles => {
                const max = maxFiles;

                pictureToInsert = [...pictureToInsert, ...acceptedFiles];

                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        imgSrc:  URL.createObjectURL(file),
                    })
                )

                const newFiles = [...files, ...acceptedFiles]

                if(newFiles.length <= max){
                    setFiles(newFiles)
                }else{
                    console.log(`파일갯수 ${max} 초과`)
                }
            }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const removeImg = (idx) => {

        console.log(files[idx].hasOwnProperty('type'))

        if(files[idx].hasOwnProperty('type') === false){
            //db에서 가져온 사진인데 클릭됐다면
            setPicDel([...picDel, files[idx].fileName])
        }else{

            console.log(files[idx])
            //pictureToInsert.filter(picture=> picture.)
        }


        files.splice(idx, 1)
        setFiles([...files])
    }

    productUpdateService.setPictures([...files])

    console.log("화면상 files객체")
    console.log(files)

    console.log("del할 db그림객체")
    console.log(picDel)

    console.log("ins할 file객체")
    console.log(picIns)

    // useEffect(() => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => {
    //         return URL.revokeObjectURL(file.preview)
    //     });
    // }, [files]);



    const thumbs = files.map((file, idx)=> (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt={'미리보기zz'}
                    onClick={()=>{removeImg(idx)}}

                />
            </div>
        </div>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone', style: style})}>
                <input {...getInputProps()} />
                <p>이곳으로 파일을 드래그하거나, 이곳을 클릭하세요</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>

        </section>
    );
}
export default PictureUpdateAttach
