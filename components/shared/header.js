"use client";

import React from "react";
import Link from "next/link";
import ImageForm from "../imageForm";
import { useRouter } from "next/navigation";
import SearchMovie from "../searchMovie";

const Header = () => {
  const router = useRouter();
  return (
    <header className="px-10 py-4">
      <ul className="flex justify-between items-center">
        <li
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        >
          <ImageForm src="/logo.png" alt="Logo" width={150} height={57} />
        </li>
        <div className="flex ">
          <li>
            <SearchMovie />
          </li>
          <li className="flex items-center ml-4">
            <Link
              href={"/login"}
              className="text-center text-sm border border-primary-light bg-primary-light rounded-lg py-2 px-6 transition duration-300 ease-in-out hover:text-textActive"
            >
              LOGIN
            </Link>
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
