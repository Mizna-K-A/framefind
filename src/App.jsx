import React, { useContext } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Dashborad from './pages/Dashborad'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Location from './pages/Location'
import ProtectedRoute from './ContextShare/ProtectedRoute';
import About from './components/About'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={true}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route 
                path="/home" 
                element={
                    <ProtectedRoute redirectTo="/">
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute redirectTo="/login">
                        <Dashborad />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/location" 
                element={
                    <ProtectedRoute redirectTo="/login">
                        <Location />
                    </ProtectedRoute>
                }
            />

      </Routes>
    </>
  )
}

export default App