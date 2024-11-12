import React, { useEffect, useState } from 'react'
import LocationCard from '../components/LocationCard'
import Header from '../components/Header'
import { allPrivateLocationAPI, allPublicLocationAPI } from '../services/allAPI'

const Location = () => {
  const [allPublicLocation, setAllPublicLocation] = useState([])
    const [allPrivateLocation, setAllPrivateLocation] = useState([])

    useEffect(() => {
        getPublicLocation()
    }, [])
    console.log(allPublicLocation);
    useEffect(()=>{
        getPrivateLocation()

    },[])
    console.log(allPrivateLocation);
    


    const getPublicLocation = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await allPublicLocationAPI(reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setAllPublicLocation(result.data)
                } else {
                    console.log(result.response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    const getPrivateLocation = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await allPrivateLocationAPI(reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setAllPrivateLocation(result.data)
                } else {
                    console.log(result.response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
  return (
    <div className='font'>
          <Header/>
          <section>
                <div className="container">
                    <div>
                        <h2 className="text-center my-4">Available Public Locations</h2>
                        <div className='d-flex flex-wrap'>
                            {
                                allPublicLocation?.length > 0 ?
                                    allPublicLocation?.map(publiclocation => (
                                        <div key={publiclocation?._id} className="col-md-4 mb-4">
                                            <LocationCard displayData={publiclocation}/>
                                        </div>
                                    ))
                                    :
                                    <div className="fw-bolder text-danger m-5 text-center">Public locations Not Found</div>
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center my-4">Available Private Locations</h2>
                       <div className='d-flex flex-wrap'>
                            {
                                allPrivateLocation?.length > 0 ?
                                    allPrivateLocation?.map(privatelocation => (
                                        <div key={privatelocation?._id} className="col-md-4 mb-4">
                                            <LocationCard displayData={privatelocation}/>
                                        </div>
                                    ))
                                    :
                                    <div className="fw-bolder text-danger m-5 text-center">Public locations Not Found</div>
                            }
                       </div>
                    </div>

                </div>
            </section>
    </div>
  )
}

export default Location