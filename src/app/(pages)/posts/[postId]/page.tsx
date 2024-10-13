import { notFound } from 'next/navigation'; // For handling 404
import { getPostById } from '../actions';
import React, { MouseEventHandler } from 'react';
import ImageCarrousel from '~/app/_components/image-carrousel';
import MapBox from '~/app/_components/google-map';
import { useUser } from '@clerk/nextjs';
import { createConversationFromPost } from '../../chats/actions';
import { auth } from '@clerk/nextjs/server';
import SendMessageButton from '~/app/_components/send-message-button';

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);
  const user = auth();
  let allImages : any = []

  if (!post) {
    return notFound(); 
  }
  else {
    allImages = post.imagesUrls.split(',').filter(word => word != "");
  }
 
  let location = {   
    latitude: "44.326696",
    longitude: "23.792532" 
  }

  return (  
    <div className="flex flex-col min-h-screen justify-between">
      <main className="flex justify-center mt-10 flex-1">
        <div className="max-w-7xl w-full bg-white p-6 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Left Column: Image Carousel and Description */}
            <div className="flex-1 space-y-6">
              {/* Image Carousel */}
              <ImageCarrousel allImages={allImages} />

              {/* Description */}
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold">Description</h2>
                <p>{post?.description}</p>
              </div>
            </div>

            {/* Right Column: Seller Info and Product Details */}
            <div className="flex-none w-full md:w-1/3 border border-gray-300 p-4 rounded-lg shadow-sm">
              {/* Seller info */}
              <h3 className="text-lg font-bold">Seller Name</h3>
              <p className="text-gray-600">Rating: ★★★★☆</p>
              
              <SendMessageButton senderId={user?.userId} receiverId={post?.userId} postId={post?.id}/>

              {/* Product details */}
              <div className="space-y-2 mt-4">
                <h1 className="text-2xl font-bold">{post?.title}</h1>
                <p className="text-2xl text-green-600 font-semibold">{post?.price}$</p>
                <p className="text-gray-600">Condition: {post?.condition.toUpperCase()}</p>
              </div>

              {/* Order button */}
              <div className="flex flex-col space-y-4 mt-6">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
                  Buy Now
                </button>
                <p className="text-gray-1000 text-xs">
                  * Pay only if you're satisfied with the product.
                </p>
              </div>

               {/* Location Map */}
              <div className="mt-6">
                <h2 className="text-lg font-bold">Location</h2>
                <MapBox />
              </div>

            </div>
          </div>
        </div>
      </main>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}
 
