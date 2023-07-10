import React from 'react';

const AddImageButton = () => {
    return (
        <div className="container">
            <h1 className="text-info" style={{ "marginLeft": "2%" }}>Images_with_Details</h1>
            <div className="d-flex justify-content-end">
                <a className="btn btn-primary" href='http://localhost:5000/image_upload'>Add Image</a>
            </div>
        </div>

    );
};

export default AddImageButton;
