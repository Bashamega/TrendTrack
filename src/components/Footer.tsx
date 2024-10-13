import React from "react";
const Navbar = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-300 text-base-content p-10">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            TrendTrack - v0.17.0
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Navbar;
