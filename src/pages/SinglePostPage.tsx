import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchPostsById } from "../features/postsSlice"

function SinglePostPage() {
  const { id } = useParams()

  const [showComments, setShowComments] = useState(false)

  const { post, posts } = useAppSelector((state) => state.posts)
  const { users } = useAppSelector((state) => state.users)
  const { comments } = useAppSelector((state) => state.comments)

  const user = users.find((user) => user.id === post?.userId)

  const postsByUser = posts.filter(
    (post) => post.userId === user?.id && post.id !== Number(id)
  )

  const thisPostComments = (id: number) => {
    return comments.filter((comment) => comment.postId === id)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchPostsById(id))
    }
  }, [dispatch, id])

  if (!post) return <h1>Loading</h1>

  return (
    <div className="bg-gray-200  p-20 pt-1 min-h-screen  display: flex flex-col justify-center ">
      <div>
        {/* posts */}
        <div className="bg-white p-6 rounded-md shadow-md mb-2">
          <h1
            className="
          text-xl font-bold  uppercase text-blue-700 mb-2"
          >
            {post.title}
          </h1>
          <p className="text-md  text-gray-700 mb-1">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${post.body}. ${post.body} `}</p>
          <p className="text-md  text-gray-700 mb-1">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${post.body}. ${post.body} `}</p>
          <p className="text-md  text-gray-700 mb-1">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${post.body}. ${post.body} `}</p>{" "}
          <p className="text-md  text-gray-700 mb-1">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${post.body}. ${post.body} `}</p>
        </div>

        {/* comments header */}
        <div className="flex items-left justify-between my-3">
          <h2
            className="text-xl font-bold  text-blue-700 mb-2 text-center mt-5 first-letter:uppercase"
            onClick={() => setShowComments(!showComments)}
          >
            Comments ({thisPostComments(post.id).length})
          </h2>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
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

            <p className="text-gray-500">{thisPostComments(post.id).length}</p>
          </div>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="bg-white p-5 rounded-md shadow-md mb-2">
            {thisPostComments(post.id).map((comment) => (
              <div key={comment.id} className="mb-5 flex ">
                <p
                  className="w-10 h-10 rounded-full bg-gray-700 first-letter:
                flex items-center justify-center text-white font text-md flex-grow-0 flex-shrink-0"
                >
                  {comment.name[0]}
                </p>
                {/* horizontal divider */}
                <div className="w-1 h-auto bg-gray-300 mx-2 flex-grow-0"></div>
                <div>
                  <h3 className="text-md font-bold text-blue-700 mb-2 first-letter:uppercase">
                    {comment.name}
                  </h3>
                  <p className="text-md text-gray-700 mb-1">{comment.body}</p>
                </div>
                <hr
                  className="
                my-5 border-gray-300
                "
                />

              </div>
            ))}
          </div>
        )}

        {/* other posts */}

        <h2 className="text-xl font-bold  text-blue-700 mb-2 mt-5">
          Other post by
          <span className=" text-blue-700 font-bold underline my-4 ">
            {user?.name}
          </span>
        </h2>

        {/* posts */}
        <div className="bg-white p-6 rounded-md shadow-md mb-2">
          <div>
            {postsByUser.map((post, index) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg p-4 my-2
                display: flex flex-col justify-center items-start"
              >
                <h3 className="text-xl font-bold  text-black mb-2 flex-start ">
                  {index + 1}. {post.title}
                </h3>
                <p className="text-mm  text-black mb-1 font-normal">
                  {post.body.substring(0, 50) + "..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
