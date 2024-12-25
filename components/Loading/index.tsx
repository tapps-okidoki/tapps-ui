import React from 'react';

function TappsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-tapps-blue border-t-transparent"></div>

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default TappsLoading;
