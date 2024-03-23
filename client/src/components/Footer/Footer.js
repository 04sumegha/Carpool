import React from 'react';
import './Footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We are dedicated to providing sustainable transportation solutions through carpooling.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@carpool.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>Stay connected with us on social media:</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#">Facebook</a></li>
              <li className="list-inline-item"><a href="#">Twitter</a></li>
              <li className="list-inline-item"><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
