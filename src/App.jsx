import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { isStandalonePwa } from './config/pwa';
import Home from './pages/Home';
import QRPage from './pages/QRPage';

export default function App() {
  const installedApp = isStandalonePwa();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRPage />} />
        <Route path="/qr" element={<Navigate to="/" replace />} />
        <Route path="/links" element={installedApp ? <Navigate to="/" replace /> : <Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
