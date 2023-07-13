import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteImageButton = ({ id }) => {
  const [images, setImages] = useState([]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/image/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

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
  }, [images, id]);

  return (
    <Button variant="outline-danger" id={id} className="mx-1" onClick={() => handleDelete(id)}>
      Delete
    </Button>
  );
};

export default DeleteImageButton;

