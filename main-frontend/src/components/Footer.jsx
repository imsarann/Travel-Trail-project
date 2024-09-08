

const Footer = () => {
  return (
      <footer className="footer">
          <div className="d-flex flex-row justify-content-center">
                <img src="../src/assets/logo.png" className="logo-img" />
            </div>
        <div className="footer-content">
        <div className="footer-info text-left">
          <h4>Contact Us</h4>
          <p>Travel Trail Inc.</p>
          <p>123 Explorer's Way</p>
          <p>Wanderlust City, WL 56789</p>
          <p>Email: info@traveltrail.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
        <div className="footer-social d-flex flex-column justify-content-end mb-5">
          <h4 className="text-right mr-3">Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in mb-5"></i>
            </a>
          </div>
        </div>
    </div>
          <hr/>
      <div className="footer-bottom">
        <p>&copy; 2024 Travel Trail Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
