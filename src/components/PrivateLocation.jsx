import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import NewLocation from '../assets/NewLocation.png'  // Placeholder image for new location
import { addPrivateLocationAPI } from '../services/allAPI'   // API function for adding location
import { addResponseContext } from '../ContextShare/ContextShare'

const PrivateLocation = () => {
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const [imgFileStatus, setImgFileStatus] = useState(false)
  const [videoFileStatus, setVideoFileStatus] = useState(false)
  const [preview, setPreview] = useState(NewLocation)
  const [locationData, setLocationData] = useState({
    name: "", privacy: "private", rent: "", link: "", locationImg: "", locationVideo: "", contact: ""
  })

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (locationData.locationImg && (locationData.locationImg.type === "image/png" || locationData.locationImg.type === "image/jpg" || locationData.locationImg.type === "image/jpeg")) {
      setImgFileStatus(true)
      setPreview(URL.createObjectURL(locationData.locationImg))
    } else if (!locationData.locationImg) {
      setImgFileStatus(false)
      setPreview(NewLocation)
    }
    if (locationData.locationVideo && locationData.locationVideo.type === "video/mp4") {
      setVideoFileStatus(true)
    } else {
      setVideoFileStatus(false)
    }
  }, [locationData.locationImg, locationData.locationVideo])

  const handleClose = () => {
    setShow(false)
    setLocationData({ name: "", rent: "", link: "", locationImg: "", locationVideo: "", contact: "" })
  }
  const handleShow = () => setShow(true)

  const handleSavePrivateLocation = async () => {
    const { name, rent, link, locationImg, locationVideo, contact } = locationData
    if (name && rent && link && locationImg && locationVideo && contact) {
      const reqBody = new FormData()
      reqBody.append("name", name)
      reqBody.append("rent", rent)
      reqBody.append("link", link)
      reqBody.append("locationImg", locationImg)
      reqBody.append("locationVideo", locationVideo)
      reqBody.append("contact", contact)

      const token = sessionStorage.getItem("token")      
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await addPrivateLocationAPI(reqBody, reqHeader)          
          if (result.status === 200) {
            handleClose()
            setAddResponse(result)
            alert("location added")
            console.log(data);
          } else {
            alert(JSON.stringify(result.data));
            return res.status(406).json("Location already available in our Database... Please Add Another!!");

            // alert(result.response.data)            
          }
        } catch (err) {
          console.log("catch");
          console.log(err)
        }
      }
    } else {
      alert("Please fill out all fields!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn btn-dark text-center buttonhover-2">
        <i className="fa-solid fa-plus"></i>Add Private Location
      </button>
      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Private Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setLocationData({ ...locationData, locationImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img width={'250px'} height={'250px'} src={preview} alt="Location preview" />
              </label>
              {!imgFileStatus && <div className="text-warning fw-bolder my-2">"Upload only JPEG, JPG, or PNG files."</div>}
              <label className="mt-3">
                <input onChange={e => setLocationData({ ...locationData, locationVideo: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <div className="btn btn-secondary">Upload Video (MP4 only)</div>
                {!videoFileStatus && <div className='text-danger'>size must be under 1GB</div>}
              </label>
              {!videoFileStatus && <div className="text-warning fw-bolder my-2">"Upload only MP4 files for videos."</div>}
            </div>
            <div className="col-lg-8">
            <div className="mb-2">
                <p>Private</p>
              </div>
              <div className="mb-2">
                <input value={locationData.name} onChange={e => setLocationData({ ...locationData, name: e.target.value })} placeholder='Location Name' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={locationData.rent} onChange={e => setLocationData({ ...locationData, rent: e.target.value })} placeholder='Rent' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={locationData.link} onChange={e => setLocationData({ ...locationData, link: e.target.value })} placeholder='Location Link' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={locationData.contact} onChange={e => setLocationData({ ...locationData, contact: e.target.value })} placeholder='Contact Number' type="text" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSavePrivateLocation} variant="primary">Add Location</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PrivateLocation
