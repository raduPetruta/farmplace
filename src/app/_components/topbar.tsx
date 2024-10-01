// components/Topbar.js

import { FaHeart, FaRegComment, FaBell, FaUserCircle } from 'react-icons/fa';

export const Topbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#003338] text-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#00c4cc] uppercase">Farmplace</div>

      {/* Center Links */}
      <div className="flex space-x-6">
        <span className="flex items-center cursor-pointer">
          <FaRegComment className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer">
          <FaHeart className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer">
          <FaBell className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer">
          <FaUserCircle className="mr-1" />
        </span>
      </div>

      {/* Right Button */}
      <div>
        <button className="bg-white text-black px-4 py-2 rounded font-bold">
          + Add post
        </button>
      </div>
    </div>
  );
};

export default Topbar;
