import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white flex  items-center p-4 justify-between">
      <h1 className="text-2xl font-bold hover:first-letter:underline">
        <Link to="/">
          <span className="text-blue-500 hover:text-white">Posts</span> App
        </Link>
      </h1>
      <ul className="flex ">
        <li className="m-2 decoration-none list-none hover:underline">
          <Link to="/users">Users</Link>
        </li>
        <li className="m-2 decoration-none list-none hover:underline">
          <Link to="/posts">Posts</Link>
        </li>

        <li className="m-2 decoration-none list-none hover:underline">
          <Link to="/about">About us</Link>
        </li>

        <li className="m-2 decoration-none list-none hover:underline">
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
