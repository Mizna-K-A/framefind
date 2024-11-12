import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../ContextShare/AuthContext'

const Header = ({ insideHeader,insideDashborad }) => {
    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

    const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
    return (
        <fiv className='font'>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white p-3" style={{ backgroundColor: 'black' }}>
                <div className="w-100 mb-3 mb-md-0 d-flex align-items-center fs-4">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>
                        <i className="fa-solid fa-film me-2"></i>
                        <span>FrameFind</span>
                    </Link>
                </div>
                {
                    insideHeader ? (
                        <div className="d-flex gap-2">
                            <Link to='/login' className="btn btn-outline-light">Login</Link>
                            <Link to='/register' className="btn btn-light text-dark">Signup</Link>
                        </div>
                    ) : null // You can also use `null` instead of `<>` for a cleaner output
                }
                {
                    insideDashborad ? (
                        <div>
                            <button onClick={handleLogout} className='btn btn-danger fs-6 buttonhover-3'>LogOut</button>
                        </div>
                    ) : null
                }

            </div>

        </fiv>
    )
}

export default Header