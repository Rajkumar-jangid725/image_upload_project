import React from 'react';
import ImageTableRow from './ImageTableRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const ImageTable = ({ images }) => {
    return (
        <>
            <table className="Image_Table">
                <tbody>
                    {images.map((image) => (
                        <ImageTableRow key={image.id} image={image} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ImageTable;
