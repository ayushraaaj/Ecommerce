import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png"
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playstore} alt="Playstore" />
                <img src={appstore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2024 &copy; Ayush Raj</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/ayushraaaj/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.linkedin.com/in/ayushraaaj/">YouTube</a>
                <a href="https://www.linkedin.com/in/ayushraaaj/">Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;