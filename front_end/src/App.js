import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ImageUpload from './components/ImageUpload'
import Image from './components/Image'
import ViewPage from './components/ViewPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Image />} />
        <Route path='/image_upload' element={<ImageUpload />} />
        <Route path='/image_view/:id' element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
