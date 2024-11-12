import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SERVERURL from '../services/serverUrl';
import { editResponseContext } from '../ContextShare/ContextShare';
import { editPublicLocationAPI } from '../services/allAPI';

const PublicLocationEdit = ({ publiclocation }) => {
  const { setEditResponse } = useContext(editResponseContext);
  const [imgFileStatus, setImgFileStatus] = useState(false);
  const [videoFileStatus, setVideoFileStatus] = useState(false);
  const [preview, setPreview] = useState('');
  const [locationData, setLocationData] = useState({
    id: publiclocation?._id,
    name: publiclocation?.name,
    link: publiclocation?.link,
    locationImg: '',
    locationVideo: `${SERVERURL}/uploads/${publiclocation?.locationVideo}`,
    contact: publiclocation?.contact,
  });

  useEffect(() => {
    if (locationData.locationImg instanceof File && ['image/png', 'image/jpg', 'image/jpeg'].includes(locationData.locationImg.type)) {
      setImgFileStatus(true);
      setPreview(URL.createObjectURL(locationData.locationImg));
    } else if (!locationData.locationImg) {
      setImgFileStatus(false);
      setPreview(`${SERVERURL}/uploads/${publiclocation?.locationImg}`);
    }

    if (locationData.locationVideo instanceof File && locationData.locationVideo.type === 'video/mp4') {
      setVideoFileStatus(true);
    } else {
      setVideoFileStatus(false);
    }
  }, [locationData.locationImg, locationData.locationVideo]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setLocationData({
      id: publiclocation?._id,
      name: publiclocation?.name,
      link: publiclocation?.link,
      locationImg: '',
      locationVideo: `${SERVERURL}/uploads/${publiclocation?.locationVideo}`,
      contact: publiclocation?.contact,
    });
    setPreview(`${SERVERURL}/uploads/${publiclocation?.locationImg}`);
  };

  const handleShow = () => setShow(true);

  const handleUpdatePublicLocation = async () => {
    const { id, name, link, locationImg, locationVideo, contact } = locationData;
    if (name && link && (locationImg || publiclocation?.locationImg) && (locationVideo || publiclocation?.locationVideo) && contact) {
      const reqBody = new FormData();
      reqBody.append('name', name);
      reqBody.append('link', link);
      reqBody.append('contact', contact);
      reqBody.append('locationImg', locationImg instanceof File ? locationImg : publiclocation?.locationImg);
      reqBody.append('locationVideo', locationVideo instanceof File ? locationVideo : publiclocation?.locationVideo);

      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await editPublicLocationAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            alert('Location updated successfully!');
            handleClose();
            setEditResponse(result);
          } else {
            console.error(result);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <>
      <span onClick={handleShow}>
        <i className="fa-solid fa-user-pen"></i>
      </span>
      <Modal size="lg" centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Location Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  onChange={(e) => setLocationData({ ...locationData, locationImg: e.target.files[0] })}
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: 'none' }}
                />
                <img width={'250px'} height={'250px'} src={preview} alt="Location preview" />
              </label>
              {!imgFileStatus && <div className="text-warning fw-bolder my-2">"Upload only JPEG, JPG, or PNG files."</div>}
              <label className="mt-3">
                <input
                  onChange={(e) => setLocationData({ ...locationData, locationVideo: e.target.files[0] })}
                  type="file"
                  accept="video/mp4"
                  style={{ display: 'none' }}
                />
                <div className="btn btn-secondary">Upload Video (MP4 only)</div>
                <div className="text-danger">Size must be under 1GB</div>
              </label>
              {!videoFileStatus && <div className="text-warning fw-bolder my-2">"Upload only MP4 files for videos."</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <p>Public</p>
              </div>
              <div className="mb-2">
                <input
                  value={locationData.name}
                  onChange={(e) => setLocationData({ ...locationData, name: e.target.value })}
                  placeholder="Location Name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={locationData.link}
                  onChange={(e) => setLocationData({ ...locationData, link: e.target.value })}
                  placeholder="Location Link"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={locationData.contact}
                  onChange={(e) => setLocationData({ ...locationData, contact: e.target.value })}
                  placeholder="Contact Number"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdatePublicLocation} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PublicLocationEdit;
