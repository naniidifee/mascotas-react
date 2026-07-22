import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import MascotasPage from './pages/MascotasPage';

function App() {
  return (
    <>
      <Router>
        <nav>
          <NavLink to={"mascotas/"}>Mascotas</NavLink>
        </nav>
        

        <Routes>
          <Route path="mascotas/" element={<MascotasPage />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App
