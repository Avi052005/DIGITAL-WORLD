import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">About Us</li>
                    </ol>
                </div>
            </div>

            <div className="about">
                <div className="container">
                    <h1>About Us</h1>
                    <h2 className="lead">
                        Welcome to our company! We are dedicated to providing the best products and services to our customers.
                    </h2>
                    <p>
                        Our mission is to bring value and satisfaction to our clients through innovative solutions and exceptional customer service.
                        We believe in the power of creativity and hard work to achieve outstanding results.
                    </p><br/>
                    <p>
                        Our team consists of experienced professionals who are passionate about what they do. We strive to exceed expectations and
                        continuously improve our offerings to meet the evolving needs of our clients.
                    </p><br/>
                    <p>
                        Thank you for choosing us. We look forward to serving you and building a lasting relationship.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
