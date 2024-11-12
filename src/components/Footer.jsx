import React from 'react'

const Footer = () => {
  return (
    <div className='font'>
        <footer className="bg-dark text-white pt-4 pb-2 mt-3">
    <div className="container">
        <div className="row">
            {/* Logo and Description */}
            <div className="col-md-4 mb-3">
                <h3>FrameFind</h3>
                <p>Discover unique locations for your film and photography needs. Connect with location owners and bring your vision to life.</p>
            </div>
            
            {/* Navigation Links */}
            <div className="col-md-4 mb-3">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                    <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
                    <li><a href="/location" className="text-white text-decoration-none">Browse Locations</a></li>
                    <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
                    <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
                </ul>
            </div>

            {/* Contact & Social Media */}
            <div className="col-md-4 mb-3">
                <h5>Contact Us</h5>
                <p>Email: support@framefind.com</p>
                <p>Phone: +123 456 7890</p>
                <div className="d-flex">
                    <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>

        <hr className="border-secondary" />
        
        {/* Copyright */}
        <div className="text-center py-2">
            <p className="mb-0">&copy; {new Date().getFullYear()} FrameFind. All rights reserved.</p>
        </div>
    </div>
</footer>

    </div>
  )
}

export default Footer