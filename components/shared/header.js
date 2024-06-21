"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-2">
      <ul className="flex justify-end items-center">
        <li>
          <Link
            href={"/login"}
            className="text-center text-sm text-textActive border border-primary bg-primary rounded-lg py-1 px-3 transition duration-300 ease-in-out hover:bg-white hover:text-primary"
          >
            LOGIN
          </Link>
        </li>
        <li className="ml-2">
          <Link
            href={"/signup"}
            className="text-center text-sm text-textActive border border-primary bg-primary rounded-lg py-1 px-3 transition duration-300 ease-in-out hover:bg-white hover:text-primary"
          >
            SIGN UP
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
