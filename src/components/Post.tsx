import { Link } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { PostProps } from "../types/postTypes"

function Post({ post }: PostProps) {
  const { users } = useAppSelector((state) => state.users)

  const findUser = (id: number) => {
    return users.find((user) => user.id === id)
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 m-2">
      <Link to={`/posts/${post.id}`}>
        <h1 className="text-xl font-bold text-blue-500 first-letter:uppercase">
          {post.title.length > 20
            ? post.title.slice(0, 20) + "..."
            : post.title}
        </h1>
      </Link>

      <hr className="my-2" />
      <p className="text-gray-500 first-letter:uppercase">
        {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}

        <Link to={`/posts/${post.id}`}>
          <span className="text-blue-500 hover:text-blue-700">Read more</span>
        </Link>

        <hr
          className="my-2 px-4
        "
        />

        {findUser(post.userId) && (
          <p>
            <Link to={`/users/${post.userId}`}>
              <span
                className="text-blue-500 hover:text-blue-700
            random:font-bold random:text-red-500
            rounded-full radius:shadow-md
            "
              >
                By {findUser(post.userId)?.name}
              </span>
            </Link>
          </p>
        )}
      </p>
    </div>
  )
}

export default Post
