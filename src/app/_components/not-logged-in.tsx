import React from 'react'

const NotLoggedIn = ({message}:{message: string}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5]">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-[#003338]">
            You must be logged in to {message}
        </h2>
        </div>
    </div>
  );
}

export default NotLoggedIn