import React from 'react';

const loading = () => {
    return (
        <div className="w-full  justify-center items-center flex">
        <div className="w-full items-center flex flex-col justify-center   ">
        <span className="loader-circle mb-2"></span>
          <div className="max-sm:text-sm text-primary font-semibold">
          Loding data
          </div>
          <div className="text-sm">Please wait a moment</div>
        </div>
      </div>
    );
};

export default loading 