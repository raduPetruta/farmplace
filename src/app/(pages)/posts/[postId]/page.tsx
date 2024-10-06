import { notFound } from 'next/navigation'; // For handling 404
import { getPostById } from '../actions';

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);

  if (!post) {
    return notFound(); 
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex flex-col sm:flex-row">
        {/* Images */}
        <div className="sm:w-1/2">
          <img src={post.imagesUrls} alt={post.title} className="w-full h-auto rounded" />
        </div>
        {/* Post Info */}
        <div className="sm:w-1/2 sm:ml-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-xl text-gray-700">{post.price} lei</p>
          <p className="text-gray-500">{post.isNegotiable ? 'Negotiable' : 'Fixed price'}</p>
          <p className="mt-4">{post.description}</p>
          <p className="mt-2 text-sm text-gray-500">Location: {post.location}</p>
          <p className="mt-2 text-sm text-gray-500">Condition: {post.condition}</p>
        </div>
      </div>
    </div>
  );
}
