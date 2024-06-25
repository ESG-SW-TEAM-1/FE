import React from "react";

const Ticketing = () => {
  return (
    <div className="flex justify-center items-center my-4">
      <span className="text-textInactive font-bold mr-3">예매</span>
      <a
        href="https://www.cgv.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className=" py-2 px-4 rounded mr-4 p-2"
      >
        <img src="/cgv.png" height={50} width={50} />
      </a>
      <a
        href="https://www.megabox.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className=" py-2 px-4 rounded mr-4"
      >
        <img src="/megabox.png" height={100} width={100} />
      </a>
      <a
        href="https://www.lottecinema.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className=" py-2 px-4 rounded "
      >
        <img src="/lottecinema.png" height={150} width={150} />
      </a>
    </div>
  );
};

export default Ticketing;
