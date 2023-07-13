import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

const ViewPage = () => {
    let { id } = useParams();
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/image/${id}`);
                const record = response.data.data;
                const name = `${record.name}`;
                const imgUrl = `http://localhost:5000/api/image/${name}`;
                const image_details = `${record.image_details}`;
                const size = `${record.size}`;
                const tags = `${record.tags}`;

                setImageData({ name, imgUrl, image_details, size, tags });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Container>
            {imageData && (
                <div>
                    <Button className="my-3" variant="primary" onClick={() => navigate(-1)}>Back</Button>
                    <h1 className="text-success my-3">{imageData.name}</h1>
                    <img src={imageData.imgUrl} alt={imageData.name} style={{ width: '100%' }} className='my-5' />
                    <p>{imageData.image_details}</p>
                    <b>{`Size : ${imageData.size}`}</b>
                </div>
            )}
        </Container>
    );
};

export default ViewPage;
