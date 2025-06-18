import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import { AuthLayout } from './components/index2.js'
import Login2 from "./pages/Login2.js"
import Privacy from './pages/Privacy.js';
import Terms from './pages/Terms.js';
import Help from './pages/Help.js';


import AddPost from "./pages/AddPost";
import Signup2 from './pages/Signup2'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPost from "./pages/AllPost";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login2 />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup2 />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/privacy",
        element: (
          <AuthLayout authentication>
            {" "}
            <Privacy />
          </AuthLayout>
        ),
      },
      {
        path: "/terms",
        element: (
          <AuthLayout authentication>
            {" "}
            <Terms />
          </AuthLayout>
        ),
      },
      {
        path: "/help",
        element: (
          <AuthLayout authentication>
            {" "}
            <Help />
          </AuthLayout >
        ),
      },
    ],
  },
])
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

