import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const ViewImageButton = ({ id }) => {
  const [image, setImage] = useState(null);

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/image/${id}`);
      const imageData = response.data;
      const image = imageData.image;
      setImage(image);
    } catch (error) {
      console.error('Error Finding image:', error);
    }
  };

  useEffect(() => {
    handleView(id);
  }, [id]);

  return (
    <Button variant="outline-success" id={image?.name} onClick={() => handleView(id)}>View</Button>
  );
};

export default ViewImageButton;
