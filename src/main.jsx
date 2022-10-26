import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/styles/main.scss'

// layouts
import Root from './layouts/Root'

// routes
import Home, { loader as homeLoader } from './routes/Home'
import User, { loader as userLoader } from './routes/user/User'
import UserIndex, { loader as userIndexLoader } from './routes/user/Index'
import Post, { loader as postsLoader } from './routes/user/Post'
import Album, { loader as albumLoader } from './routes/user/Album'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "/user/:userId",
        element: <User />,
        loader: userLoader,
        children: [
          {
            path: "/user/:userId",
            element: <UserIndex />,
            loader: userIndexLoader
          },
          {
            path: "/user/:userId/album/:albumId",
            element: <Album />,
            loader: albumLoader,
          },
          {
            path: "/user/:userId/post/:postId",
            element: <Post />,
            loader: postsLoader,
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
