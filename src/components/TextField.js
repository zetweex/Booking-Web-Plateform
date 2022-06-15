import React from 'react';

const TextField = (props) => {
    return (
        <div className="textField">
            <input
                title={props.title}
                onChange={props.onChange}
                type={props.type}
                placeholder={props.placeholder}
                style={{width : props.size}}
            >
            </input>
        </div>
    );
}

export default TextField;