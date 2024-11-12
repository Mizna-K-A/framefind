import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import NewLocation from '../assets/NewLocation.png'; // Placeholder image for new location or to reset preview
import { updateLocationAPI } from '../services/allAPI'; // API endpoint for updating location
import { addResponseContext } from '../ContextShare/ContextShare';

const Edit = ({ location, show, handleClose }) => {
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const [imgFileStatus, setImgFileStatus] = useState(false);
  const [preview, setPreview] = useState(location.locationImg ? URL.createObjectURL(location.locationImg) : NewLocation);
  const [locationData, setLocationData] = useState({
    name: location.name || "",
    privacy: location.privacy || "public", // Added privacy field
    rent: location.rent || "", // Added rent field
    link: location.link || "", // Added location link field
    description: location.description || "",
    latitude: location.latitude || "",
    longitude: location.longitude || "",
    locationImg: location.locationImg || "",
    locationVideo: location.locationVideo || "", // Added location video field
    contact: location.contact || "" // Added contact field
  });

  useEffect(() => {
    if (locationData.locationImg && (locationData.locationImg.type === "image/png" || locationData.locationImg.type === "image/jpg" || locationData.locationImg.type === "image/jpeg")) {
      setImgFileStatus(true);
      setPreview(URL.createObjectURL(locationData.locationImg));
    } else if (!locationData.locationImg) {
      setImgFileStatus(false);
      setPreview(NewLocation);
    }
  }, [locationData.locationImg]);

  const handleSaveLocation = async () => {
    const { name, privacy, rent, link, description, latitude, longitude, locationImg, locationVideo, contact } = locationData;
    if (name && privacy && link && description && latitude && longitude) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("privacy", privacy);
      reqBody.append("rent", rent);
      reqBody.append("link", link);
      reqBody.append("description", description);
      reqBody.append("latitude", latitude);
      reqBody.append("longitude", longitude);
      if (locationImg) reqBody.append("locationImg", locationImg);
      if (locationVideo) reqBody.append("locationVideo", locationVideo);
      reqBody.append("contact", contact);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await updateLocationAPI(location.id, reqBody, reqHeader);
          if (result.status === 200) {
            handleClose();
            setAddResponse(result);
          } else {
            alert(result.response.data);
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
              <img width={'250px'} height={'250px'} src={preview} alt="Location preview" />
            </label>
            {!imgFileStatus && <div className="text-warning fw-bolder my-2">"Upload only JPEG, JPG, or PNG files."</div>}
          </div>
          <div className="col-lg-8">
            <div className="mb-2">
              <input value={locationData.name} onChange={e => setLocationData({ ...locationData, name: e.target.value })} placeholder='Location Name' type="text" className="form-control" />
            </div>
            <div className="mb-2">
              <select value={locationData.privacy} onChange={e => setLocationData({ ...locationData, privacy: e.target.value })} className="form-control">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            {locationData.privacy === "private" && (
              <div className="mb-2">
                <input value={locationData.rent} onChange={e => setLocationData({ ...locationData, rent: e.target.value })} placeholder='Rent' type="text" className="form-control" />
              </div>
            )}
            <div className="mb-2">
              <input value={locationData.link} onChange={e => setLocationData({ ...locationData, link: e.target.value })} placeholder='Location Link' type="text" className="form-control" />
            </div>
            <div className="mb-2">
              <input value={locationData.description} onChange={e => setLocationData({ ...locationData, description: e.target.value })} placeholder='Description' type="text" className="form-control" />
            </div>
            <div className="mb-2">
              <input value={locationData.latitude} onChange={e => setLocationData({ ...locationData, latitude: e.target.value })} placeholder='Latitude' type="text" className="form-control" />
            </div>
            <div className="mb-2">
              <input value={locationData.longitude} onChange={e => setLocationData({ ...locationData, longitude: e.target.value })} placeholder='Longitude' type="text" className="form-control" />
            </div>
            <div className="mb-2">
              <input value={locationData.locationVideo} onChange={e => setLocationData({ ...locationData, locationVideo: e.target.files[0] })} type="file" className="form-control" accept="video/mp4" />
              <div className="text-muted">Upload Video (MP4 only)</div>
            </div>
            <div className="mb-2">
              <input value={locationData.contact} onChange={e => setLocationData({ ...locationData, contact: e.target.value })} placeholder='Contact Info' type="text" className="form-control" />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSaveLocation} variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
