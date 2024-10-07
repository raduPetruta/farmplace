import { notFound } from 'next/navigation'; // For handling 404
import { getPostById } from '../actions';
import Image from 'next/image';
import { format } from 'path';

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);
  
  if (!post) {
    return notFound(); 
  }
  else {
    post.imagesUrls = post.imagesUrls.substring(0, post.imagesUrls.length - 1)
  }

  return (  
    <div className="flex justify-center mt-10">
    <div className="max-w-7xl w-full bg-white p-4 shadow-md rounded-lg">
      {/* Product Details */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side: Image Carousel */}
        <div className="col-span-1">
          <div className="relative">
          </div>
          {/* <div className="flex space-x-2 mt-2"> */}
            {/* {post.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 rounded cursor-pointer ${
                  index === selectedImage ? 'border-2 border-[#00c4cc]' : ''
                }`}
                width={64}
                height={64}
                onClick={() => handleImageClick(index)}
              />
            ))} */}
          </div>
        </div>

        {/* Center: Main Product Info */}
        <div className="col-span-2">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[#003338]">{post.title}</h1>
            <p className="text-xl text-gray-600">
              {post.price}{' '}
              {post.isNegotiable && <span className="text-sm text-green-500">(Prețul e negociabil)</span>}
            </p>
            <div className="flex space-x-2 mt-2">
              <span className="px-3 py-1 border rounded text-sm text-gray-700">{post.condition}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-[#003338]">DESCRIERE</h2>
            <p className="text-gray-700">{post.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-[#00c4cc] text-white font-bold py-2 px-4 rounded hover:bg-[#008b8c] transition">
              Cumpără cu livrare
            </button>
            <button className="bg-white text-gray-700 font-bold py-2 px-4 border rounded hover:bg-gray-100 transition">
              Plătește doar dacă îți place articolul
            </button>
          </div>
        </div>

        {/* Right Side: Seller and Shipping Info */}
        <div className="col-span-1">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#003338]">PRIVAT</h2>
            <p className="text-gray-700">User: bisnessartchy</p>
            <p className="text-gray-700">Rating vechi: Bun</p>
            <p className="text-gray-700">Activ ieri la 15:13</p>
            <button className="bg-[#00c4cc] text-white font-bold py-2 px-4 mt-4 w-full rounded hover:bg-[#008b8c] transition">
              Trimite mesaj
            </button>
            <button className="bg-white text-gray-700 font-bold py-2 px-4 mt-2 w-full border rounded hover:bg-gray-100 transition">
              Sună vânzătorul
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-[#003338]">LIVRARE PRIN OLX</h2>
            <p className="text-gray-700">Produs: {post.price}</p>
            <p className="text-gray-700">Livrare de la: 0,00 lei</p>
            <h3 className="font-bold mt-4">Plată</h3>
            <p className="text-gray-700">Payment</p>
          </div>
        </div>
      </div>
    </div>
    

  );
}
 
