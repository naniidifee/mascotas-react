import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import MascotasPage from './pages/MascotasPage';
import MascotaDetalle from './components/mascotas/MascotasDetalle';
import CrearMascota from './components/mascotas/CrearMascota';
function App() {
  return (
    <>
      <Router>
        <nav style={{ padding: '15px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
          <NavLink to={"mascotas/"} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
            Mascotas
          </NavLink>
        </nav>
        
        <div style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="mascotas/" element={<MascotasPage />} />
            <Route path='mascotas/nueva' element={<CrearMascota />} />
            <Route path="mascotas/:id" element={<MascotaDetalle />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

