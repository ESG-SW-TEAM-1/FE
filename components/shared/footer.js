import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-center items-center px-auto py-4 mt-8">
        <span className="text-textInactive text-xs">
          <a
            href="https://west-orbit-b88.notion.site/Moving-Movie-c13f63ffd4c9412780175efa94e73b9b"
            target="_blank"
            className="hover:cursor-pointer hover:text-textActive transition duration-300 ease-in-out"
          >
            &copy; 2024 ESG SW 엔지니어 트렉 1조.
          </a>{" "}
          All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
