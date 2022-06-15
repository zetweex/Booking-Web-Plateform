import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldAuth = (props) => {
    return (
        <TextField
            className='textFieldAuth'
            name={props.title}
            onChange={props.onChange}
            margin="dense"
            label={props.placeholder}
            type={props.type}
            variant="filled"
            fullWidth

        />
    );
}

export default TextFieldAuth;