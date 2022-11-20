import { Link } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { UserProps } from '../types/userTypes';

function User({ user }: UserProps) {
  const { posts } = useAppSelector((state) => state.posts)


 const findUserPosts = (id: number) => {
    return posts.filter((post) => post.userId === id)
  }

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 m-2
    hover:shadow-lg hover:scale-105
      "
    >
      <p className="flex flex-col">
        <Link to={`/users/${user.id}`}>
          <p>{user.name}</p>
        </Link>
        <hr
          className="
        my-2 mx-4
        "
        />
        <p className="text-gray-500">{user.username}</p>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-500">{user.phone}</p>
        <p className="text-gray-500">{user.website}</p>
      </p>
      <hr className="my-2 mx-4" />

      <p className="text-gray-500">
        <Link to={`/users/${user.id}/posts`}>
          <span className="text-blue-500 hover:text-blue-700">
            {findUserPosts(user.id).length} posts
          </span>
        </Link>
      </p>
    </div>
  )
}

export default User
