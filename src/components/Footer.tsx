import React from "react";
import packageJson from "../../package.json"; // Adjust the path as per your folder structure

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-300 text-base-content p-10">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            TrendTrack - v{packageJson.version}
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
