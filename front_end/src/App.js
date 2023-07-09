// import React from 'react';
// import ImageTable from './components/ImageTable';
// import AddImageButton from './components/AddImageButton';


// const App = () => {
//   const images = [
//     {
//       id: 1,
//       thumbnail: 'thumbnail1.jpg',
//       name: 'Image 1',
//       size: '1 MB',
//       details: 'Lorem ipsum dolor sit amet',
//       tags: 'tag1, tag2',
//     },
//   ];

//   return (
//     <div className='container'>
//       <br />
//       <br />
//       <AddImageButton />
//       <br />
//       <br />
//       <ImageTable images={images} />
//     </div>
//   );
// };

// export default App;


// Frontend - App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageTable from './components/ImageTable';
import AddImageButton from './components/AddImageButton';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all images from the backend API
    axios.get('/image')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleImageUpload = (imageData) => {
    // Upload an image to the backend API
    axios.post('/api/image', imageData)
      .then(response => {
        console.log(response.data);
        // Refresh the list of images after successful upload
        axios.get('/image')
          .then(response => {
            setImages(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='container'>
      <br />
      <br />
      <AddImageButton onImageUpload={handleImageUpload} />
      <br />
      <br />
      <ImageTable images={images} />
    </div>
  );
};

export default App;
