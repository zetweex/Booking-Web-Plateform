import React from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
    const globalState = useSelector((state) => state);
    return globalState.isLogged;
}

const ProtectedRoutes = () => {

    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;