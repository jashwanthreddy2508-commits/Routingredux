import Home from './Home.jsx';
import About from './Aboutytem.jsx';

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="item/:id" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App
