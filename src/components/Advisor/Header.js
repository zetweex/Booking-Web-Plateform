import React, { useRef, useState, useEffect } from "react";

import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const Header = ({ setCoordinates }) => {

    const [autoComplete, setAutoComplete] = useState(null);

    const onLoad = (autoc) => {
        setAutoComplete(autoc);
    }

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    }

    return (
        <AppBar position="static" className="advisor_container">
            <Toolbar className="toolbar">
                <Typography variant="h5" className="title">
                    Fleepi Advisor
                </Typography>
                <Box className="box">
                    <Typography variant="h6" className="title">
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className="search">
                            <div className="search__icon">
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search ..." className="search_input"/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;