import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import Posts from "../components/Posts"
import User from "../components/User"
import { fetchUsersById } from "../features/usersSlice"

function SingleUserPage() {
  const { id } = useParams()

  const { user } = useAppSelector((state) => state.users)
  const { posts } = useAppSelector((state) => state.posts)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchUsersById(id))
    }
  }, [dispatch, id])

  if (!user) return <h1>Loading</h1>

  const userPosts = posts.filter((post) => post.userId === user.id)

  return (
    <div className="bg-gray-200  p-20 pt-2 min-h-screen  display: flex flex-col justify-center items-center">
      <User user={user} />
      <h2 className="text-2xl font-bold text-center text-gray-700 my-3 underline">
        Posts by
        <span className="text-blue-700 font-bold underline m-2">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </span>
      </h2>
      {userPosts.length ? <Posts posts={userPosts} /> : <h3>No posts for </h3>}
    </div>
  )
}

export default SingleUserPage
