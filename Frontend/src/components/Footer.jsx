import React from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/Footer.css";
import AppStoreBadges from "./assets/App_Store_Badge.svg";
import LogoProjectTitle from "./assets/LogoProjectTitle";

const Footer = () => {
  return (
    <div className="main-footer footer-item">
      <div>
        <div className="logo">
          <LogoProjectTitle />
        </div>
        <Row>
          <Col lg={6} className="px-2">
            <p>
              GMDB is an online database of information related to films,
              television programs, and streaming content online – including
              cast, production crew and personal biographies, plot summaries,
              trivia, ratings, and fan and critical reviews.
            </p>
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Blog</li>
              <li>Career</li>
            </ul>
          </Col>
          <Col xs lg="4">
            <h5> Download</h5>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Logo"
              width="130 px"
            />
            <img src={AppStoreBadges} alt="Logo" width="120 px" />
          </Col>
        </Row>
        <div className="container-fluid copyright">
          <p className="text-center copyright-text">
            {new Date().getFullYear()} Glints Movie Database App - All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
