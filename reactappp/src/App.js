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
import OutsideClickDemo from './Pages/OutsideClickDemo/OutsideClickDemo';
import MultiSearch from './Pages/MultiSearch/MultiSearch';
import AllCheckboxes from './Pages/AllCheckboxes/AllCheckboxes';
import LinkPreviewerExample from './Pages/LinkPreviewer/LinkPreviewer';
import Test from './Test';
import FetchDataHook from './Pages/FetchDataHook/FetchDataHook';
import DragDrop from './Pages/DragDrop/DragDrop';
import InfiniteScroll from './Pages/InfiniteScroll/InfiniteScroll';
import VirtualizedList from './Pages/VirtualizedList/VirtualizedList';
function App() {
  const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

  return (
    <div className="App">
       <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          {/* <Route path="/scroll" element={<ScrollImages />} /> */}
          <Route path="/tabs" element={<TabForm />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/file" element={<NestedFile />} />
          <Route path="/nested" element={<Nested2 />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path='/hooks' element={<OutsideClickDemo/>}></Route>
            <Route path="/multisearch" element={<MultiSearch />} />
            <Route path="/allcheckboxes" element={<AllCheckboxes />} />
            <Route path="/linkpreviewer" element={<LinkPreviewerExample />} />
            <Route path="/test" element={<Test />} />
            <Route path="/fetchdata" element={<FetchDataHook />} />
            <Route path="/dragdrop" element={<DragDrop />} />
            <Route path="/infinite-scroll" element={<InfiniteScroll />} />
            <Route path="/list" element={<VirtualizedList list={LIST} height={400} width={300} itemHeight={35}  />} />
           
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
