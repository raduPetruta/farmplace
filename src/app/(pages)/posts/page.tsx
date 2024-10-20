import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '../new-post/actions';

export default async function PostsPage() {
  const posts = await getPosts();
  
  
  console.log(posts);

  function getFirstImageOfPost(imagesUrls: any){
    return imagesUrls.split(',')[0];
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {
        posts.map((post : any) => (
          <li key={post.id} className="p-4 border rounded shadow-md">
            <Link href={`/posts/${post.id}`}> 
                <Image src={getFirstImageOfPost(post.imagesUrls)} width={150} height={150} alt="img"/>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.price} lei</p>
                <p className="text-sm text-gray-500">{post.location}</p> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
