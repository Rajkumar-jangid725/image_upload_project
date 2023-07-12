import React from 'react';
import ViewImageButton from './ViewImageButton';
import DeleteImageButton from './DeleteImageButton';
import { Table } from 'react-bootstrap';

const ImageTableRow = ({ image }) => {
  const id = image.id;
  return (
    <Table>
      <thead>
        <tr key={image.name}>
          <td style={{ width: '10%' }}>
            <img src={image.thumbnail} alt={`${image.name} Thumbnail`} />
          </td>
          <td style={{ width: '15%' }}>{image.name}</td>
          <td style={{ width: '7%' }}>{image.size}</td>
          <td style={{ width: '35%' }}>
            <div style={{ maxHeight: '100px', overflowY: 'auto', textAlign: "left" }}>
              {image.image_details}
            </div>
          </td>
          <td style={{ width: '15%' }}>{image.tags}</td>
          <td style={{ width: '18%' }}>
            <ViewImageButton image={image} id={id} />
            <DeleteImageButton image={image} id={id} />
          </td>
        </tr>
      </thead>
    </Table>
  );
};

export default ImageTableRow;
