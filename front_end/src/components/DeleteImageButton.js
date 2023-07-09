import React from 'react';

const DeleteImageButton = ({ image }) => {
  const handleDeleteImage = () => {
    // Logic to delete the image
  };

  return (
    <button onClick={handleDeleteImage} className ="mx-3">
      Delete Image
    </button>
  );
};

export default DeleteImageButton;
