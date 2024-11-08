import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Update from './Update';
import  DataField  from './DataTable';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path="/Navigate" element={<DataField />} />
        </Routes>
        
        <Routes>
          <Route path="/Update" element={<Update />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
