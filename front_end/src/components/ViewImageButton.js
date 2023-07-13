import React from 'react';
import { Button } from 'react-bootstrap';

const ViewImageButton = ({ image, id }) => {
  return (
    <Button variant="outline-success" id={id} href={`http://localhost:3000/image_view/${id}`}> View </Button>
  );
};

export default ViewImageButton;