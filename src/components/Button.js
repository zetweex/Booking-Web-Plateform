import React from 'react';

const Button = (props) => {
    return (
        <button type="button" className="button" onClick={props.onClick} id={props.id}>
            {props.title}
        </button>
    );
}

export default Button;