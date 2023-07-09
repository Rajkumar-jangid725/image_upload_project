import React from 'react';

const AddImageButton = () => {
    const handleAddImage = () => {
        // Logic to add an image
    };

    return (
        // <button onClick={handleAddImage} className="btn btn-primary float-left">
        //   Add Image
        // </button>
        <div className="container">
            <h1 className="text-info" style={{"margin-left":"2%"}}>Images_with_Details</h1>
            <div className="d-flex justify-content-end" onClick={handleAddImage}>
                <button className="btn btn-primary" style={{ "margin-right": "8%" }}>Add Image</button>
            </div>
        </div>

    );
};

export default AddImageButton;
