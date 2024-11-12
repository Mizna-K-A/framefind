import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import landing from '../assets/landingimg.jpg'
import Footer from '../components/Footer'
import { homeLocationAPI } from '../services/allAPI'
import SERVERURL from '../services/serverUrl'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    const [allHomeLocations, setAllHomeLocations] = useState([])

    useEffect(() => {
        getAllHomeLocations()
    }, [])

    const getAllHomeLocations = async () => {
        try {
            const result = await homeLocationAPI()
            if (result.status === 200) {
                setAllHomeLocations(result.data)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleLocations = ()=>{
        if(sessionStorage.getItem("token")){
          navigate('/home')
        }else{
          alert("Please login to get full access to our locations!!!")
        }
      }

    return (
        <div className='font'>
            <Header insideHeader={true} />
            <div className='text-center text-light fadeIn' style={{ background: `url(${landing})`, height: '90vh', backgroundSize: 'cover' }}>
                <h1 className='fade-in'>Welcome to FrameFind..</h1>
                <h5 className='fade-in'>"Discover and Rent Locations for Film and Photography"</h5>
            </div>
            <section>
                <h2 className='text-center fade-in'>Our Locations</h2>
                <div className='d-flex justify-content-center align-items-center fade-in'>
                    <div className='w-75 d-flex justify-content-center align-items-center rounded shadow'>
                        <div id="locationCarousel" className="carousel slide" data-bs-ride="carousel">
                            {/* Carousel Indicators */}
                            <div className="carousel-indicators">
                                {allHomeLocations.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#locationCarousel"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : "false"}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            {/* Carousel Inner */}
                            <div className="carousel-inner">
                                {allHomeLocations.map((location, index) => (
                                    <div key={location._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <img height='600px' src={`${SERVERURL}/uploads/${location?.locationImg}`} className="d-block w-100" alt={location.name} />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{location.name}</h5>
                                            <p>Contact: {location.contact}</p>
                                            <p>
                                                <a className='btn btn-dark' href={`${SERVERURL}/uploads/${location?.locationVideo}`} rel='noopener noreferrer'>
                                                    Location Video
                                                </a>
                                            </p>
                                            <p>
                                                <a className='btn btn-dark' href={location.link} rel='noopener noreferrer'>
                                                    Location <i className="fa-solid fa-location-dot"></i>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Carousel Controls */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#locationCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#locationCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className='text-center'>
                <a onClick={handleLocations} className='fs-5'>View More Location....</a>
            </div>
            <Footer />
        </div>
    )
}

export default Landing
