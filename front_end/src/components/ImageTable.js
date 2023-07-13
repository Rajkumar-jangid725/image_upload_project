import React from 'react';
import ImageTableRow from './ImageTableRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container } from 'react-bootstrap';

const ImageTable = ({ images }) => {
    return (
        <Container>
            {images.map((image) => (
                <ImageTableRow key={image.id} image={image} />
            ))}
        </Container>
    );
};

export default ImageTable;
