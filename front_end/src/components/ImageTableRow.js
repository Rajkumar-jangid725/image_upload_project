import React from 'react';
import ViewImageButton from './ViewImageButton';
import DeleteImageButton from './DeleteImageButton';

const ImageTableRow = ({ image }) => {
  const { thumbnail, name, size, details, tags } = image;

  return (
    <tr>
      <td>{thumbnail}</td>
      <td>{name}</td>
      <td>{size}</td>
      <td>{details}</td>
      <td>{tags}</td>
      <td>
        <ViewImageButton image={image} />
        <DeleteImageButton image={image} />
      </td>
    </tr>
  );
};

export default ImageTableRow;
