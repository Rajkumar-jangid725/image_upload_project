import React from 'react';
import ImageTable from './components/ImageTable';
import AddImageButton from './components/AddImageButton';

const App = () => {
  const images = [
    {
      id: 1,
      thumbnail: 'thumbnail1.jpg',
      name: 'Image 1',
      size: '1 MB',
      details: 'Lorem ipsum dolor sit amet',
      tags: 'tag1, tag2',
    },
  ];

  return (
    <div className='container'>
      <br />
      <br />
      <AddImageButton />
      <br />
      <br />
      <ImageTable images={images} />
    </div>
  );
};

export default App;
