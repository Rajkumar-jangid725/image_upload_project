import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    // State variables for form data
    const [thumbnail, setThumbnail] = useState('');
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [tags, setTags] = useState('');
    const [imageDetails, setImageDetails] = useState('');

    // Function to handle file input change
    function handleImage(e) {
        setThumbnail(e.target.files[0]);
        setName(e.target.files[0].name);
        setSize(e.target.files[0].size);
        setTags(e.target.files[0].tags);
        setImageDetails(e.target.files[0].imageDetails);
    }

    // Function to handle API call
    function handleApi() {
        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        formData.append('name', name);
        formData.append('size', size);
        formData.append('image_details', imageDetails);
        formData.append('tags', tags);

        axios.post('http://localhost:5000/image_upload', formData)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleBackApi() {
        //
    }
    // Render the component
    return (
        <div className='container'>
            <br />
            <div className='d-flex justify-content-end'><button className="mx-3" type="Back" onCLick={handleBackApi} >Back</button></div>
            <div className='my-3'><input type="file" name='testImage' onChange={handleImage} /></div>
            <div className='my-3'><input type="text" name='name' placeholder='Enter image name' onChange={(e) => setName(e.target.value)} /></div>
            <div className='my-3'><input type="text" name='size' placeholder='Enter image size' onChange={(e) => setSize(e.target.value)} /></div>
            <div className='my-3'> <input type="text" name='tags' placeholder='Enter image tags' onChange={(e) => setTags(e.target.value)} /></div>
            <div className='my-3'><input type="text" name='thumbnails' placeholder='Enter image thumbnail name' onChange={(e) => setName(e.target.value)} /></div>
            <div><textarea className="form-control" type="text" name='image_details' placeholder="Enter text here..." id="myBox" rows="8" onChange={(e) => setImageDetails(e.target.value)}></textarea></div>
            <div className='my-3'><button onClick={handleApi}>Upload</button></div>
        </div>
    );
}

export default ImageUpload;


