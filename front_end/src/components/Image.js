import React, { useState, useEffect } from 'react';
import ImageTable from './ImageTable';
import AddImageButton from './AddImageButton';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../pagination.css'

const Image = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(3);

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
    }, [currentPage, imagesPerPage]);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const pageCount = Math.ceil(images.length / imagesPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    return (
        <>
            <div className='container'>
                <br />
                <br />
                <AddImageButton />
                <br />
                <br />
                <ImageTable images={currentImages} />
                <ReactPaginate
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </>
    );
};

export default Image;
