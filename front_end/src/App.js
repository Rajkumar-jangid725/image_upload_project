import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ImageUpload from './components/ImageUpload'
import Image from './components/Image'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Image />} />
        <Route path='/image_upload' element={<ImageUpload />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
