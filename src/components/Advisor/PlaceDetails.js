import React, { useRef, useState, useEffect } from "react";
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {

    if (selected)
        refProp?.current?.scrollIntoView({behavior: "smooth", block: 'start'});

    return (
        <Card elevation={6} className="places_dt_container">
            <CardMedia
                style={{height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2016/04/ouvrir-un-restaurant-1.png'}
                title={place.name}
            />
            <CardContent className="card_content">
                <Typography gutterBottom variant="h5"> {place.name} </Typography>
                <Box className="box">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1"> {place.price_level} </Typography>
                </Box>
                <Box className="box">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1"> {place.ranking} </Typography>
                </Box>

                {place?.awards?.map((award) => (
                    <Box my={1} className="box al-center">
                        <img src={award.images.small}  alt={award.display_name} />
                        <Typography variant="subtitle2" colosr="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}

                {place?.cuisine?.map(({ name }) => (
                <Chip key={name} size="small" label={name} className="chip" />
                ))}

                {place.address && (
                <Typography gutterBottom variant="body2" color="textSecondary" className="subtitle">
                    <LocationOnIcon />{place.address}
                </Typography>
                )}

                {place.phone && (
                <Typography variant="body2" color="textSecondary" className="spacing">
                    <PhoneIcon /> {place.phone}
                </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    )
}

export default PlaceDetails;