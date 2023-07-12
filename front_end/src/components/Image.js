import React, { useState, useEffect } from 'react';
import ImageTable from './ImageTable';
import AddImageButton from './AddImageButton';
import axios from 'axios';

const Image = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000')
            .then((res) => {
                const imageData = res.data.map((image) => ({
                    name: image.name,
                    image_details: image.image_details,
                    size: image.size,
                    tags: image.tags,
                    thumbnail: image.thumbnail,
                    id: image._id
                }));
                setImages(imageData);
            })
            .catch((err) => console.log(err, "Error"));
    }, []);

    return (
        <>
            <div className='container'>
                <br />
                <br />
                <AddImageButton />
                <br />
                <br />
                <ImageTable images={images} />
            </div>
        </>
    );
};

export default Image;
