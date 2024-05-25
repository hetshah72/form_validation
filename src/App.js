import './App.css';
import Form from './components/Form';
import Details from './components/Details';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'> 
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/details" element={<Details/>} />
    </Routes>
    </div>
  );
}

export default App;