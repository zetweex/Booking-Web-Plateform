import React from 'react';
import GoogleLogo from '../assets/google-logo.png';

const GoogleButtonAuth = (props) => {
    return (
        <div className="google-button-auth-container" onClick={props.onClick}>
            <div className="google-button-auth-sub-container">
                <img className="google-auth-btn-img" src={GoogleLogo} alt="Google logo"></img>
                <div className="title-container">
                    <h1 className="google-auth-btn-text">{props.title}</h1>
                </div>
            </div>
        </div>
    );
}

export default GoogleButtonAuth;