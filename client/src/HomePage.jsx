import React from "react";
import  './App.css';
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
<section className="flex flex-col justify-center items-center">
  <div className="flex flex-col justify-center items-center bg-style py-60 px-10"> 
    <div className="text-center">
      <h1 className="text-3xl text-gray-800 font-extrabold sm:text-6xl">
        Project Proposal - AWS Cloud Architecture and Backend,
        <span>
          {" "}
          Khoi Tran{" "}
        </span>
        !
      </h1>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link 
          to="/Navigate"
          className="block w-full rounded-full border border-blue-500 px-12 py-3 text-sm font-medium text-black hover:text-white hover:bg-pink-300 focus:outline-none focus:ring sm:w-auto"
          href="/Navigate"
        >
          Explore Data
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link 
          to="/Update"
          className="block w-full rounded-full border border-blue-500 px-12 py-3 text-sm font-medium text-black hover:text-white hover:bg-pink-300 focus:outline-none focus:ring sm:w-auto"
          href="/Update"
        >
          Update Data
        </Link>
      </div>
    </div>
    
  </div>
</section>
    </>
  );
};

export default MainPage;