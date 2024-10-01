import { useState, useRef } from 'react';
import axios from 'axios';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const FileUpload = () => {

    const fileRef = useRef();

    const onUploadClick = async () => {
        if (!fileRef.current.files.length) {
            return;
        }
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/kriahtracker/upload', {base64data: base64});

        window.location.href = '/';
    }
    const onGenerateClick = async () => {
        window.location.href = `/api/kriahtracker/generatecsv`;
    }

    return (

        <>
            <div className="d-flex vh-100" style={{ marginTop: -70 }}>
            <div className="d-flex w-100 justify-content-center align-self-center">
                <div className="row">
                    <div className='col-md-2'>
                        <button className='btn btn-outline-secondary' onClick={onGenerateClick}>Download Demo</button>
                    </div>
                </div>
            
            </div>
                <div className="d-flex w-100 justify-content-center align-self-center">
                    <div className="row">
                        <div className="col-md-10">
                            <input ref={fileRef} type="file" className='form-control' />
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-secondary' onClick={onUploadClick}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileUpload;