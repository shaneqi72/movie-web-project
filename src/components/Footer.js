import React from 'react';
import './Footer.css';


const Footer = () => {
    return (

        <div className='container-fluid bg-dark footer-container'>
            <footer className='border-top mt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-4 col-lg-4">
                            <h4>The Basics</h4>

                            <ul >
                                <li>
                                    <a href="#">About Moive Go</a>
                                </li>
                                <li>
                                    <a href="#">Contact us</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-xs-12 col-md-4 col-lg-4">
                            <h4>Our Service</h4>
                            <ul>
                                <li>
                                    <a href="#">Provide Movies Information</a>
                                </li>
                                <li>
                                    <a href="#">Support Community</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-md-4 col-lg-4">
                            <h4>Legal</h4>
                            <ul>
                                <li>
                                    <a href="#">Terms and Conditions</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='container d-flex justify-content-center py-5 copyright'>
                    &copy; Copyright 2020
                </div>
            </footer>
        </div >
    )
}

export default Footer;
