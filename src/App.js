import { Routes, Route } from 'react-router-dom';
import Cars from './pages/Cars';

function App() {
  return (
    <Routes>
      <Route path="/cars" element={ <Cars /> } />
    </Routes>
  );
}

export default App;
