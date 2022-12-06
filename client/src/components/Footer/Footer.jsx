import React from "react";
import { FaLinkedin } from "react-icons/fa";
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={Styles.FooterLanding}>
      <span>Created by: </span>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/fiorella-parmetler-63632424a/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Fiorella Parmetler
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/carlos-rodr%C3%ADguez-25708a246/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Carlos Rodriguez
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/lucas-macchi-a02956233/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Lucas Macchi
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/ericcmerc"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Eric Alejandro Mercado
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/martin-m-b00955125/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Martin Mendoza
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/micaelpicco/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Micael Picco
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/juan-pablo-romero-poveda-477514253/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Juan Pablo
        </a>
      </div>
      <div>
        <a
          className={Styles.FooterLandingText}
          href="https://www.linkedin.com/in/juan-manesevich-a00239186"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={Styles.FooterLandingIcon} /> Juan Manesevich 
        </a>
      </div>
    </footer>
  );
};

export default Footer;
