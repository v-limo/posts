import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Posts from '../components/Posts';
import { fetchPosts, search } from '../features/postSlice';
import { fetchUsers } from '../features/usersSlice';

function Home() {
  const [input, setInput] = useState("")
  const dispatch = useAppDispatch()
  const {
    loading: postsLoading,
    posts,
    filteredPosts,
  } = useAppSelector((state) => state.posts)

  const { loading: usersLoading } = useAppSelector((state) => state.users)

  useEffect(() => {
    setTimeout(() => {
      dispatch(search(input))
    }, 500)
  }, [dispatch, input])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  let renderedCountries = filteredPosts.length ? filteredPosts : posts

  const loading = postsLoading || usersLoading
  return (
    <div className="bg-gray-200  p-20 pt-2 min-h-screen  display: flex flex-col justify-center items-center">
      <input
        type="text"
        value={input}
        placeholder="Search for a post"
        onChange={handleSearch}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      />

      {loading ? (
        <h1 className="text-2xl font-bold hover:first-letter:underline">
          Loading
        </h1>
      ) : (
        <Posts posts={renderedCountries} />
      )}
    </div>
  )
}

export default Home
