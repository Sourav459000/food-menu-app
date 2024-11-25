import React from "react";
import footer from "../images/footer.png"; // PNG file

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container flex items-left flex-col text-white lg:pl-40 md:pl-20 sm:pl-10 pl-6">
        <div className="mb-2">
          {/* Use image tag for PNG */}
          <img src={footer} alt="Bundl Technologies Pvt Limited" className="h-12" />
        </div>
        <p className="text-sm text-left">© 2023 Bundl Technologies Pvt Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
