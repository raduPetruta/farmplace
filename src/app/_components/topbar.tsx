// components/Topbar.js
'use client'

import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegComment, FaBell, FaUserCircle } from 'react-icons/fa';

export const Topbar = () => {

  const router = useRouter();

  const onUserClick = () => {
    router.push('/profile');
  };
  const onChatsClick = () => {
    router.push('/chats');
  };
  const onFavoritesClick = () => {
    router.push('/favorites');
  };
  const onNotificationsClick = () => {
    router.push('/notifications');
  };
  const onNewPostClick = () => {
    router.push('/new-post');
  };

  const loggedInUser = useUser();

  return (
    <div className="flex justify-between items-center p-4 bg-[#003338] text-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#00c4cc] uppercase">Farmplace</div>

      {/* Center Links */}
      <div className="flex space-x-6">
        <span className="flex items-center cursor-pointer" onClick={onChatsClick}>
          <FaRegComment className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer" onClick={onFavoritesClick}>
          <FaHeart className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer" onClick={onNotificationsClick}>
          <FaBell className="mr-1" />
        </span>
        <span className="flex items-center cursor-pointer" onClick={onUserClick}>
          {loggedInUser ? (
            <div>logh</div>
          ) : (
            <div>nooo</div>
          )}
          <FaUserCircle className="mr-1" /> 
        </span>
      </div>

      {/* Right Button */}
      <div>
        <button className="bg-white text-black px-4 py-2 rounded font-bold" onClick={onNewPostClick}>
          + Add post
        </button>
      </div>
    </div>
  );
};

export default Topbar;
