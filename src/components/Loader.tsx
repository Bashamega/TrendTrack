import React from "react";

const Loader: React.FC = () => {
  return (
    <div className=" w-screen h-full flex flex-col items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
      <p>Loading</p>
    </div>
  );
};

export default Loader;
