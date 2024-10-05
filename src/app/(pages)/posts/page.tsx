import React from 'react'
import { getPosts } from '../new-post/actions';

const Posts = async () => {

  const posts = await getPosts();
  
  return (

    <div>
        {posts.map((post: any) => (
            <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <p>{post.location}</p>
                <p>{post.price}</p>
                <p>{post.condition}</p>
            </div>
        ))}
    </div>
  )
}

export default Posts