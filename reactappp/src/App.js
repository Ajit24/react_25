import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Pages/Search';
import Navbar from './Pages/Navbar/Navbar';
function App() {
  return (
    <div className="App">
       <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
