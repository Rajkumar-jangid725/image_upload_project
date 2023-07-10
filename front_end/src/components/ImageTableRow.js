import React from 'react';
import ViewImageButton from './ViewImageButton';
import DeleteImageButton from './DeleteImageButton';

const ImageTableRow = ({ image }) => {
  return (
    <thead>
      <tr key={image.name}>
        <td style={{ width: '10%' }}>
          <img src={image.thumbnail} alt={`${image.name} Thumbnail`} />
        </td>
        <td style={{ width: '15%' }}>{image.name}</td>
        <td style={{ width: '10%' }}>{image.size}</td>
        <td style={{ width: '35%' }}>{image.image_details}</td>
        <td style={{ width: '15%' }}>{image.tags}</td>
        <td style={{ width: '15%' }}>
          <ViewImageButton image={image} />
          <DeleteImageButton image={image} />
        </td>
      </tr>
    </thead>
  );
};

export default ImageTableRow;
