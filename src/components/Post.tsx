import { Link } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { PostProps } from "../types/postTypes"

function Post({ post }: PostProps) {
  const { users } = useAppSelector((state) => state.users)
  const { comments } = useAppSelector((state) => state.comments)

  const findUser = (id: number) => {
    return users.find((user) => user.id === id)
  }

  const findComments = (id: number) => {
    return comments.filter((comment) => comment.postId === id)
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

        {/* comments */}
        <div className="flex justify-between items-center">
          <div>
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
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>

            <p className="text-gray-500">{findComments(post.id).length}</p>
          </div>
        </div>
      </p>
    </div>
  )
}

export default Post
