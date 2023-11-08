import React, { useEffect } from 'react';
import Login from '../pages/Login';
import Layout from './Layout';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import Trending from '../pages/Trending';
import Favoris from '../pages/Favoris';
import Profil from '../pages/Profil';
import Recherche from '../pages/Recherche';
import Serie from '../pages/Serie';

const App = () => {
    const { saveToStorage, getFromStorage } = useStorage('storage-');
    const [username, setUsername] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const savedUser = getFromStorage('username');
    const [posts, setPosts] = useState([]);


    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const defaultProfileImageUrl = `/img/profile/${randomNumber}.jpg`;

    useEffect(() => {
        if (savedUser) {
            setUsername(savedUser);
        }
    }, [savedUser]);

    const loginHandler = (user) => {
        setUsername(user);
        saveToStorage('username', user);
        console.log("User logged in: ", user);
    }

    const logoutHandler = () => {
        saveToStorage('username', ''); 
        setUsername('');
        saveToStorage('favorites', []); 
        console.log("User logged out");
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3000/api/series/trending');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    const routes = [
        {
            path: '/login',
            element: <Login loginFn={loginHandler} />,
        },
        {
            path: "*",
            element: <Navigate to="/login" replace />,
        },
    ];

    const authRoutes = [
        {
            path: "",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="trending" />,
                },
                {
                    path: "trending",
                    element: <Trending data={posts} />,
                    children: [
                        {
                            path: ":id",
                            element: <Serie data={posts.series} />,
                        },
                    ],
                },
                {
                    path: "favoris",
                    element: <Favoris />,
                    children: [
                        {
                            path: ":id",
                            element: <Serie data={posts.series} />,
                        },
                    ],
                },
                {
                    path: "profil",
                    element: <Profil username={savedUser} profileImageUrl={defaultProfileImageUrl} logoutHandler={logoutHandler} />,
                },
                {
                    path: "recherche",
                    element: <Recherche />,
                    children: [
                        {
                            path: ":id",
                            element: <Serie data={posts.series} />,
                        },
                    ],
                }
            ],
        },
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ];


    return (
        <RouterProvider router={createBrowserRouter(username ? authRoutes : routes)} />
    );
}

export default App;