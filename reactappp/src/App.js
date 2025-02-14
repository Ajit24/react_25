import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Pages/Search';
import Navbar from './Pages/Navbar/Navbar';
import ScrollImages from './Pages/Scroll/ScrollImages';
import TabForm from './Pages/TabForm/TabForm';
import Pagination from './Pages/Pagination/Pagination';
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
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
