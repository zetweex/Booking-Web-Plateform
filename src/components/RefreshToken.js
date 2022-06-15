import React from 'react';
import { useNavigate } from "react-router-dom";

export const getNewToken = async (refresh_token) => {
    
    let body_content = {
        refreshToken: refresh_token,
    }

    let result = await fetch("https://fleepi-api.herokuapp.com/refreshToken", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body_content),
    });
    
    let response = await result.json();

    return response.access_token;
}

export const refreshTokenValidity = () => {
    const refresh_token = localStorage.getItem("refresh_token");
    const new_access_token = getNewToken(refresh_token);
    
    localStorage.setItem("access_token", new_access_token);

    return;
}

export const my_fetch = async (api_routes, method, header, body) => {

    let result = await fetch(api_routes, {
        method: method,
        headers: header,
        body: JSON.stringify(body),
    })
    .catch((error) => {
        refreshTokenValidity();
        my_fetch(api_routes, method, header, body);
    });

    let response = await result;

    return response;
}