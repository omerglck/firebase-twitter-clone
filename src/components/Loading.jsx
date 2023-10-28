import React from "react";

const Loading = () => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  return array.map((i) => (
    <div
      key={i}
      role="status"
      className="w-full p-4  border-b-[1px] border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center mb-4 space-x-3">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

      <div className="mt-5 flex justify-between">
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
      </div>
    </div>
  ));
};

export default Loading;
