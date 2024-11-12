import React, { useContext, useState } from 'react'
import '../App.css'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../ContextShare/AuthContext';


const Auth = ({insideRegister}) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  console.log(userData);

  const handleRegister = async (e)=>{
    e.preventDefault()
    if(userData.username && userData.email && userData.password){
      // api call
      // alert("Proceed to API Call")
      try{
        const result = await registerAPI(userData)
        console.log(result);
        
        if (result.status==200) {
          alert(`Welcome ${result?.data?.username}... Please Login to explore our website!!!`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')
        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setUserData({username:"",email:"",password:""})
          }
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Please fill the form completely")
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(userData.email && userData.password){
      // api call
    
    try{
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status==200) {
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorised(true)
        setIsLoading(true)
        setTimeout(() => {
          setUserData({username:"",email:"",password:""})
          navigate('/home')
          setIsLoading(false)
        }, 2000);
      }else{
        if (result.response.status==404) {
          alert(result.response.data)
        }
      }
    }catch(err){
      console.log(err);
    }
  }else{
    alert("Please fill the form completely")
  }
  }

  return (
    <>
      <div className='bordercustom border rounded shadow mt-5 bg-dark'>
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
          <h1 className='mb-5 text-white'>Welcome to FrameFind....</h1>
          {
            insideRegister && (
              <FloatingLabel controlId="floatingInputname" label="Username" className="mb-3 w-50">
              <Form.Control  value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} type="text" placeholder="Username" />
             </FloatingLabel>
            )
          }
  
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 w-50">
            <Form.Control  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
          </FloatingLabel>
  
          <FloatingLabel controlId="floatingPassword" label="Password" className='w-50'>
            <Form.Control value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
          </FloatingLabel>
  
          {
                    insideRegister ?
                    <div className="mt-3 text-center">
                      <button  onClick={handleRegister} className="btn btn-light mb-2">Register</button>
                      <p className='text-light'>Already have an Account Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3 text-center">
                      <button onClick={handleLogin} className="btn btn-light mb-2">
                        Login
                        {isLoading && <Spinner animation="border" variant="light" className='ms-2'/>}
                      </button>
                      <p className='text-light'>New User? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }
        </div>
      </div>
    </>
  )
}

export default Auth