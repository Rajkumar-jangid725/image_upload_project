import React from 'react';
import ImageTableRow from './ImageTableRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container, Table } from 'react-bootstrap';

const ImageTable = ({ images }) => {
    return (
        <Container>
            <Table>
                <tbody>
                    {images.map((image) => (
                        <ImageTableRow key={image.id} image={image} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ImageTable;
