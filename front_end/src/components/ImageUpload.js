import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, ProgressBar, Alert, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function ImageUpload() {
  const [testImage, setTestImage] = useState(null);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [image_details, setImage_details] = useState('');
  const [progress, setProgress] = useState();
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  function handleImage(e) {
    setTestImage(e.target.files[0])
  }

  function handleApi() {
    const formData = new FormData();
    formData.append('testImage', testImage);
    formData.append('name', name);
    formData.append('size', size);
    formData.append('tags', tags);
    formData.append('thumbnails', thumbnail);
    formData.append('image_details', image_details);

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/images',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: data => {
        setProgress(Math.round((100 * data.loaded) / data.total))
      }
    })
      .then((res) => {
        setAlertMessage('Image data uploaded successfully!')
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      {alertMessage && <Alert variant="success" className="text-center my-3">{alertMessage}</Alert>}
      <Button className="my-3" variant="primary" onClick={() => navigate(-1)}>Back</Button>
      <Form>
        <FormControl className="my-3" type="file" name="testImage" onChange={handleImage} />
        <FormControl className="my-3" type="text" name="name" placeholder="Enter image name" onChange={(e) => setName(e.target.value)} />
        <FormControl className="my-3" type="text" name="size" placeholder="Enter image size" onChange={(e) => setSize(e.target.value)} />
        <FormControl className="my-3" type="text" name="tags" placeholder="Enter image tags" onChange={(e) => setTags(e.target.value)} />
        <FormControl className="my-3" type="text" name="thumbnails" placeholder="Enter image thumbnail name" onChange={(e) => setThumbnail(e.target.value)} />
        <FormControl className="my-3" as="textarea" name="image_details" placeholder="Enter text here..." rows="8" onChange={(e) => setImage_details(e.target.value)} />
      </Form>
      <Button className="my-3" onClick={handleApi} variant="primary">Upload</Button>
      {progress && <ProgressBar now={progress} label={`${progress}%`} />}
    </Container>
  );
}

export default ImageUpload;
