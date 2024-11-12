import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import SERVERURL from '../services/serverUrl';

const LocationCard = ({ insideLocationCard, displayData }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    return (
        <div className='font d-flex'>
            <div className='d-flex m-3 fade-in'>
                <div className="card mb-4 shadow p-3">
                    <img
                        style={{ width: '300px', height: '200px' }}
                        src={`${SERVERURL}/uploads/${displayData?.locationImg}`}
                        className="card-img-top"
                        alt="Location"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{displayData?.name}</h5>
                        <button className="btn btn-dark me-5" onClick={handleShow}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Location Details */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Location Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex'>
                        <div className='me-4'>
                            <img
                                style={{ height: '250px', width: '370px' }}
                                src={`${SERVERURL}/uploads/${displayData?.locationImg}`}
                                className="img-fluid mb-3"
                                alt="Location"
                            />
                        </div>
                        <div>
                            <p><strong>Location Name</strong> {displayData?.name}</p>
                            {
                                displayData?.rent &&
                                <p><strong>Rent:</strong> {displayData.rent}</p>
                            }

                            <p><strong>Contact:</strong> {displayData?.contact}</p>
                        </div>
                    </div>
                    {/* Video Section with Controls */}
                    <p className='text-center'>
                        <a className='btn btn-dark' href={`${SERVERURL}/uploads/${displayData?.locationVideo}`} rel="noopener noreferrer">Video of Location</a>
                    </p>
                    <p className='text-center'>
                        <a className='btn btn-dark' href={displayData?.link} rel="noopener noreferrer">
                            Location <i className="fa-solid fa-location-dot"></i>
                        </a>
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LocationCard;
