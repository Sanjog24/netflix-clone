import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ListProvider } from './context/ListContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ListProvider>
        <App />
      </ListProvider>
    </BrowserRouter>
  </StrictMode>,
)