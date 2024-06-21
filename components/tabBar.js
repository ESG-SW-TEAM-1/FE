import React, { useState } from "react";

const TabBar = () => {
  const tabData = [
    {
      id: 0,
      title: "전시",
      content: ["전시정보1", "전시정보2", "전시정보3"],
    },
    { id: 1, title: "팝업", content: ["팝업정보1", "팝업정보2", "팝업정보3"] },
    {
      id: 2,
      title: "굿즈스토어",
      content: ["굿즈스토어정보1", "굿즈스토어정보2", "굿즈스토어정보3"],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <nav className="flex -mb-px">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`w-full cursor-pointer py-4 text-center font-bold transition duration-200 ease-in-out ${
              activeTab === item.id
                ? "text-textActive  bg-primary"
                : "text-textInactive bg-gray-300 "
            }`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.title}
          </div>
        ))}
      </nav>

      <div className="mt-8 p-4">
        {tabData
          .filter((item) => activeTab === item.id)
          .map((item) => (
            <div key={item.id} className="text-textActive">
              {item.content.map((content, index) => (
                <p key={index} className="mb-8">
                  {content}
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabBar;
