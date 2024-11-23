import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer footer-light">
      <div className="footer-content">
        <div className="container">
          <div className="row">
            {/* Widget 1 */}
            <div className="col-md-4">
              <div
                className="widget clearfix widget-contact-us"
                style={{
                  backgroundImage: "url('/images/world-map-dark.png')",
                  backgroundPosition: "50% 20px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h4>À propos de nous</h4>
                <ul className="list-icon">
                  <li>
                    <i className="fa fa-map-marker"></i> Québec, QC, Canada
                  </li>
                  <li>Alexandre Carignan</li>
                  <li>
                    <i className="fa fa-phone"></i> (418) 440-5010
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>{" "}
                    <a href="mailto:"></a>
                  </li>
                  <li>Alexandre Carignan Webmestre</li>
                  <li>
                    <i className="fa fa-phone"></i> (418) 440-5010
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>{" "}
                    <a href="mailto:alexandre.carignan@alxmultimedia.com">
                      alexandre.carignan@alxmultimedia.com
                    </a>
                  </li>
                  <li>
                    <br />
                    <i className="fa fa-clock-o"></i> Lundi - Vendredi:{" "}
                    <strong>08:00 - 22:00</strong>
                    <br />
                    Samedi, Dimanche: <strong>Fermé</strong>
                  </li>
                </ul>
                <div className="social-icons social-icons-border">
                  <ul>
                    <li className="social-facebook">
                      <a href="https://www.facebook.com/Promiterra-1511476392410240/">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="col-md-2">
              <div className="widget">
                <h4>Quick Links</h4>
                <ul className="list-icon list-icon-arrow">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Shortcodes</a></li>
                </ul>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="col-md-3">
              <div className="widget">
                <h4>Latest From Our Blog</h4>
                <div className="post-thumbnail-list">
                  <div className="post-thumbnail-entry">
                    <div className="post-thumbnail-content">
                      <a href="#">Suspendisse consectetur fringilla luctus</a>
                      <span className="post-date">
                        <i className="fa fa-clock-o"></i> 6m ago
                      </span>
                      <span className="post-category">
                        <i className="fa fa-tag"></i> Technology
                      </span>
                    </div>
                  </div>
                  <div className="post-thumbnail-entry">
                    <div className="post-thumbnail-content">
                      <a href="#">Consectetur adipiscing elit</a>
                      <span className="post-date">
                        <i className="fa fa-clock-o"></i> 24h ago
                      </span>
                      <span className="post-category">
                        <i className="fa fa-tag"></i> Lifestyle
                      </span>
                    </div>
                  </div>
                  <div className="post-thumbnail-entry">
                    <div className="post-thumbnail-content">
                      <a href="#">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </a>
                      <span className="post-date">
                        <i className="fa fa-clock-o"></i> 11h ago
                      </span>
                      <span className="post-category">
                        <i className="fa fa-tag"></i> Lifestyle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-content">
        <div className="container">
          <div className="copyright-text text-center">
            &copy; 2024 - Alxmultimedia par Alexandre Carignan
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
