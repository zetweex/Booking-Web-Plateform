import React, { useRef, useState, useEffect, createRef } from "react";
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Input} from "@material-ui/core";

import PlaceDetails from "./PlaceDetails";

const List = ({places, childClicked, isLoading, setType, setRating, type, rating}) => {

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places])

    return (
        <div className="list_container">
            
            {isLoading ? (
                    <div className="loading">
                        <CircularProgress size="5rem" />
                    </div>
            ) : (
                <>
                    <FormControl className="form_control" style={{marginRight: '15px'}}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form_control">
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid spacing={3} className="result_listing">
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List;