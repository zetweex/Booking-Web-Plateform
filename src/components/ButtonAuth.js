import React from 'react';

const ButtonAuth = (props) => {
    return (
        <button type="button" className="buttonAuth" onClick={props.onClick}>{props.title}</button>
    );
}

export default ButtonAuth;