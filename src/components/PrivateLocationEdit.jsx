import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SERVERURL from '../services/serverUrl'
import { editResponseContext } from '../ContextShare/ContextShare'
import { editPrivateLocationAPI } from '../services/allAPI'
// import NewLocation from '../assets/NewLocation.png'

const PrivateLocationEdit = ({privatelocation}) => {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const [imgFileStatus, setImgFileStatus] = useState(false)
  const [videoFileStatus, setVideoFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [locationData, setLocationData] = useState({
    id: privatelocation?._id,
    name: privatelocation?.name,
    rent: privatelocation?.rent,
    link: privatelocation?.link,
    locationImg: "",
    locationVideo: `${SERVERURL}/uploads/${privatelocation?.locationVideo}`,
    contact: privatelocation?.contact,
  });
  console.log(locationData);
  
  useEffect(() => {
    if (locationData.locationImg && (locationData.locationImg.type === "image/png" || locationData.locationImg.type === "image/jpg" || locationData.locationImg.type === "image/jpeg")) {
      setImgFileStatus(true)
      setPreview(URL.createObjectURL(locationData.locationImg))
    } else if (!locationData.locationImg) {
      setImgFileStatus(false)
      setPreview("")
    }
    if (locationData.locationVideo && locationData.locationVideo.type === "video/mp4") {
      setVideoFileStatus(true)
    } else {
      setVideoFileStatus(false)
    }
  }, [locationData.locationImg, locationData.locationVideo])

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setLocationData({
    id: privatelocation?._id,
    name: privatelocation?.name,
    link: privatelocation?.link,
    locationImg: "",
    locationVideo: `${SERVERURL}/uploads/${privatelocation?.locationVideo}`,
    contact: privatelocation?.contact,
    })
  }
  const handleShow = () => {
    setShow(true)
    setLocationData({
      id: privatelocation?._id,
      name: privatelocation?.name,
      rent: privatelocation?.rent,
      link: privatelocation?.link,
      locationImg: privatelocation?.locationImg,
      locationVideo: privatelocation?.locationVideo,
      contact: privatelocation?.contact,
      })
  }
  const handleUpdatePrivateLocation = async () => {
    const { id, name, rent, link, locationImg, locationVideo, contact } = locationData;
    if (name && rent && link && contact) { // Removed locationImg and locationVideo from validation
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("rent", rent);
      reqBody.append("link", link);
      if (locationImg) {
        reqBody.append("locationImg", locationImg); // Attach image only if selected
      }
      if (locationVideo) {
        reqBody.append("locationVideo", locationVideo); // Attach video only if selected
      }
      reqBody.append("contact", contact);
  
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
        };
        try {
          const result = await editPrivateLocationAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            alert("Location updated successfully!!");
            handleClose();
            setEditResponse(result);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill out all fields!");
    }
  };
  
  return (
    
    <>
    <span onClick={handleShow}>
    <i class="fa-solid fa-user-pen"></i>
    </span>
       <Modal
      size='lg'
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Location Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setLocationData({ ...locationData, locationImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img width={'250px'} height={'250px'} src={preview?preview:`${SERVERURL}/uploads/${privatelocation?.locationImg}`} alt="Location preview" />
              </label>
              {!imgFileStatus && <div className="text-warning fw-bolder my-2">"Upload only JPEG, JPG, or PNG files."</div>}
              <label className="mt-3">
                <input onChange={e => setLocationData({ ...locationData, locationVideo: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <div className="btn btn-secondary">Upload Video (MP4 only)</div>
                <div className='text-danger'>size must be under 1GB</div>
              </label>
              {!videoFileStatus && 
              <div className="text-warning fw-bolder my-2">"Upload only MP4 files for videos."</div>}
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
        <Button onClick={handleUpdatePrivateLocation} variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal> 
    </>
  )
}

export default PrivateLocationEdit