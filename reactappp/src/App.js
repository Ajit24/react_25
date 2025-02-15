import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Pages/Search';
import Navbar from './Pages/Navbar/Navbar';
import ScrollImages from './Pages/Scroll/ScrollImages';
import TabForm from './Pages/TabForm/TabForm';
import Pagination from './Pages/Pagination/Pagination';
import OtpInput from './Pages/OtpInput/OtpInput';
import NestedFile from './Pages/NestedFile/NestedFile';
import Nested2 from './Pages/NestedFile/Nested2'
import Carousel from './Pages/Carousel/Carousel';
function App() {
  return (
    <div className="App">
       <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/scroll" element={<ScrollImages />} />
          <Route path="/tabs" element={<TabForm />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/file" element={<NestedFile />} />
          <Route path="/nested" element={<Nested2 />} />
          <Route path="/carousel" element={<Carousel />} />

           
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
