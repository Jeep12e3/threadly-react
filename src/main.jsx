import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter membungkus seluruh app supaya routing berbasis URL aktif */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
