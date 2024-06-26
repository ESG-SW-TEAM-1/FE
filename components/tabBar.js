"use client";

import React, { useState } from "react";
import Top10Movies from "@/components/top10";
import UpcomingMovies from "@/components/upcoming";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("top10");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-screen-lg mx-auto my-10">
      <nav className="flex -mb-px">
        <div
          className={`w-full cursor-pointer py-4 text-center font-bold transition duration-200 ease-in-out ${
            activeTab === "top10"
              ? "text-textActive bg-primary font-nanum-extra-bold"
              : "text-textInactive bg-gray-300"
          }`}
          onClick={() => handleTabClick("top10")}
        >
          Top 10
        </div>
        <div
          className={`w-full cursor-pointer py-4 text-center font-bold transition duration-200 ease-in-out ${
            activeTab === "upcoming"
              ? "text-textActive bg-primary font-nanum-extra-bold"
              : "text-textInactive bg-gray-300"
          }`}
          onClick={() => handleTabClick("upcoming")}
        >
          Upcoming
        </div>
      </nav>

      <div className="mt-8 p-4">
        {activeTab === "top10" && <Top10Movies />}
        {activeTab === "upcoming" && <UpcomingMovies />}
      </div>
    </div>
  );
};

export default TabBar;
