import React from "react";
import Image from "next/image";

const MadeBy = () => {
  return (
    <div className="container">
      <p className="text-white text-3xl font-nanum-bold mb-16">만든이들</p>
      <ul className="flex justify-evenly items-center gap-4 list-none">
        <li className="text-center">
          <Image
            src="/1.png"
            alt="신예슬"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block mt-4">신예슬</span>
        </li>
        <li className="text-center">
          <Image
            src="/2.png"
            alt="최성원"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block mt-4">최성원</span>
        </li>
        <li className="text-center">
          <Image
            src="/3.png"
            alt="신민규"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block mt-4">신민규</span>
        </li>
        <li className="text-center">
          <Image
            src="/4.png"
            alt="김채린"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block mt-4">김채린</span>
        </li>
      </ul>
    </div>
  );
};

export default MadeBy;
