import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextShare/ContextShare.jsx'
import AuthContext from './ContextShare/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthContext>
      <ContextShare>
        <BrowserRouter> <App /> </BrowserRouter>
      </ContextShare>
   </AuthContext>
  </StrictMode>,
)
