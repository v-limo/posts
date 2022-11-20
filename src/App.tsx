import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { useAppDispatch } from "./app/hooks"
import NavBar from "./components/NavBar"
import { fetchComments } from "./features/commentsSlice"
import { fetchPosts } from "./features/postsSlice"
import { fetchUsers } from "./features/usersSlice"
import Home from "./pages/Home"
import SinglePostPage from "./pages/SinglePostPage"
import SingleUserPage from "./pages/SingleUserPage"
import UsersPage from "./pages/UsersPage"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetch = () => {
      dispatch(fetchPosts())
      dispatch(fetchUsers())
      dispatch(fetchComments())
    }
    fetch()
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<SingleUserPage />} />
          <Route path="/posts/:id" element={<SinglePostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
