import React from 'react';
import ImageTableRow from './ImageTableRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const ImageTable = ({ images }) => {
    return (
        <>
            <table className="Image_Table">
                {/* <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Details</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead> */}
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
