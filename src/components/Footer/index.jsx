import React from "react";
import "./footer.css";
import packageJSON from "../../../package.json";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h5 className="footer-title">Sortulizer v{packageJSON.version}</h5>
          </div>
          <div className="col text-center description">
            <p>by Ronnie Geraghty</p>
          </div>
          <div className="col text-right">
            <a
              className="footerlink"
              href="https://github.com/ronniegeraghty/Sortulizer"
            >
              <FaGithub className="footer-icon" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
