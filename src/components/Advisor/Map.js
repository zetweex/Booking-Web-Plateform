import React, { useRef, useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from '@material-ui/lab/Rating';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className="map_container">
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyAmMYAi_5FUMx9lGfMqHC1lH_DHFyRAE2E'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={0}
                options={''}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
            {places.length && places.map((place, i) => (
            <div
                className="marker_container"
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
            >
                {!isDesktop
                ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                : (
                    <Paper elevation={3} className="marker_content">
                        <Typography className="typo" variant="subtitle2" gutterBottom> {place.name}</Typography>
                        <img
                            className="img"
                            src={place.photo ? place.photo.images.large.url : 'https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2016/04/ouvrir-un-restaurant-1.png'}
                        />
                        <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                )}
            </div>
            ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map;