import React from 'react';
import { Container, Button, Row } from 'react-bootstrap';

const AddImageButton = () => {
    return (
        <Container>
            <h1 className="text-info">
                Images_with_Details
            </h1>
            <Row className="d-flex justify-content-end mx-2" >
                <Button variant="primary" href="http://localhost:3000/image_upload" style={{ width: '12%' }}>
                    Add Image
                </Button>
            </Row>
        </Container>
    );
};

export default AddImageButton;

