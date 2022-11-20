import { PostI, PostsProps } from '../types/postTypes';
import Post from './Post';

function Posts({ posts }: PostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
