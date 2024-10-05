'use client';

import { useState } from 'react';
// @ts-ignore
import { v4 as uuid } from 'uuid'
import { createPost } from './actions';
import { useUser } from '@clerk/nextjs';
import { getImagesUrls, SimpleUploadButton } from '~/app/_components/simple-upload-button';
import { useRouter } from 'next/navigation';

const NewPost = () => {
  const router = useRouter();
  const loggedInUser = useUser().user!;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('new');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const images = getImagesUrls();
    let imagesUrls : String = "";

    images.map((image: any) => {
      imagesUrls += image[0].url + ",";
    });

    const newPost = {
      id: uuid(),
      userId: loggedInUser.id,
      title,
      description,
      imagesUrls : imagesUrls,
      location,
      price,
      isNegotiable,
      condition,
      createdAt : "Aa",
      updatedAt : "aa"
    };
    
    await createPost(newPost);
    if(newPost)
      router.push('/');
    console.log('New Post:', newPost);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-[#003338]">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
            <input
              type="number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Condition</label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Images (comma-separated URLs)</label>
            <SimpleUploadButton/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isNegotiable}
              onChange={(e) => setIsNegotiable(e.target.checked)}
            />
            <label className="text-gray-700 font-bold">Price is Negotiable</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00c4cc] text-white py-2 rounded font-bold hover:bg-[#008b8c] transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;

