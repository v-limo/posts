import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPostsById } from '../features/postSlice';

function SinglePostPage() {
  const { id } = useParams()

  const { post, posts } = useAppSelector((state) => state.posts)
  const { users } = useAppSelector((state) => state.users)

  const user = users.find((user) => user.id === post?.userId)

  const postsByUser = posts.filter(
    (post) => post.userId === user?.id && post.id !== Number(id)
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchPostsById(id))
    }
  }, [dispatch, id])

  if (!post) return <h1>Loading</h1>

  return (
    <div className="bg-gray-200  p-20 pt-1 min-h-screen  display: flex flex-col justify-center ">
      <ul>
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
        <h2
          className="text-xl font-bold  text-blue-700 mb-2 
        
        text-center mt-5
        "
        >
          Other post by
          <span className=" text-blue-700 font-bold underline m-2">
            {user?.name}
          </span>
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
        </h2>
      </ul>
    </div>
  )
}

export default SinglePostPage
