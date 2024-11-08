import { useState } from 'react'
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Amplify, API } from 'aws-amplify';
import Navigation from './components/common/Navigation';
import HomePage from './HomePage';
import Footer from './components/common/Footer';
import  DataField  from './DataTable';
const myApi ="apic1eeecf5";
const path = 'data';


function App() {

  const [count, setCount] = useState(0)
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path="/Navigate" element={<DataField />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App
