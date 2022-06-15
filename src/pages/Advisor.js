import React, { useRef, useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import { Typography, Box } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { shadows } from '@mui/system';

import { getPlacesData } from "../components/Advisor/api";
import List from "../components/Advisor/List";
import Map from "../components/Advisor/Map";
import PlaceDetails from "../components/Advisor/PlaceDetails";
import Header from "../components/Advisor/Header";

import i18n from "../assets/Translation/i18n";
import { withTranslation } from "react-i18next";

const Advisor = (props) => {

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({lat: 52.52, lng: 13.40});
    const [bounds, setBounds] = useState(null);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('0');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
          });
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating])

    useEffect(() => {
        if (bounds) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data)
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
    }, [type, coordinates, bounds]);

    return (
        <>
            <Navbar />
            <Header setCoordinates={setCoordinates} />
            <div style={{ margin: '15px', width: '70%', fontFamily: 'Poppins, sans-serif' }}>
                <h1>{i18n.t("advisor_title")}</h1>
                <span style={{ fontWeight: '300', fontSize: '22px' }}>{i18n.t("advisor_subtitle")}</span>
            </div>
            <Box boxShadow={5} style={{ margin: "15px" }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={4} >
                        <List
                            places={filteredPlaces.length ? filteredPlaces : places}
                            childClicked={childClicked}
                            isLoading={isLoading}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    )
}

export default withTranslation("advisor")(Advisor);