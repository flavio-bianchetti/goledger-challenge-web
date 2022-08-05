import { Routes, Route } from 'react-router-dom';
import Cars from './pages/Cars';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Cars /> } />
      <Route path="/cars" element={ <Cars /> } />
    </Routes>
  );
}

export default App;
