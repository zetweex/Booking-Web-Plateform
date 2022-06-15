import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Async from 'react-async';
import Moment from 'react-moment';
import moment from 'moment';

import breadcrumb2 from "../assets/breadcrumb-img2.png";
import breadcrumb3 from "../assets/breadcrumb-img3.png";
import sampleTrip from "../assets/sampleTrip.png";

import i18n from "../assets/Translation/i18n";
import { withTranslation } from "react-i18next";

const Trips = () => {
    const [openModal, setModalOpen] = React.useState(false);
    const [openSuccess, setSuccessOpen] = React.useState(false);
    const [openError, setErrorOpen] = React.useState(false);
    var tripName;

    const toogleModal = () => {
        setModalOpen(!openModal);
      };
    
    const addTrip = () => {
        addTripRequest();
        setModalOpen(false);
    };

    const closeSuccess = () => {
        setSuccessOpen(false);
      };

    const closeError = () => {
        setErrorOpen(false);
    };

    const setTextValue = (event) => {
        tripName = event.target.value;
    }

    async function addTripRequest() {
        let body_content = {
            name: tripName
        }
        let result = await fetch("https://fleepi-api.herokuapp.com/trip", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "id": localStorage.getItem("id"),
                "Authorization": localStorage.getItem("access_token")
            },
            body: JSON.stringify(body_content),
        });

        let rq_response = await result.status;
        if (rq_response === 200) {
            setSuccessOpen(true);
        } else {
            setErrorOpen(true);
        }
    }

    const loadTrips = () =>
        fetch("https://fleepi-api.herokuapp.com/trips", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "id": localStorage.getItem("id"),
                "Authorization": localStorage.getItem("access_token")
            },
        }).then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())
        .then(res => res.status.data.trips.sort(function(a,b){
            return new Date(b.departureDateTime) - new Date(a.departureDateTime);
          }))
    return (
        <div>
            <Navbar />
            <section id="page-breadcrumb">
                <div class="common-overlay"></div>
                <div class="breadcrumb-menu">
                    <h3>{i18n.t("trips_title")}</h3>
                    <ol class="breadcrumb d-flex justify-content-center">
                        <li>
                            <a href="/">{i18n.t("trips_hd_lobby")}&nbsp;/&nbsp;</a>
                        </li>
                        <li class="active">{i18n.t("trips_hd_mytrips")}</li>
                    </ol>
                </div>
                <img src={breadcrumb2} class="breadcrumb-img2" alt="breadcrumb-img2"/>
                <img src={breadcrumb3} class="breadcrumb-img3" alt="breadcrumb-img2"/>
            </section>
            <div class="container">
                <div class="add-btn text-center">
                    <a onClick={toogleModal}>{i18n.t("trips_add_trip")}</a>
                </div>
                <div class="book-content row d-flex ">
                    <div class="col-md-6 col-lg-3 col-sm-12">
                        <div class="book-view">
                            <label for="formControlSelect1">{i18n.t("trips_dest")}</label>
                            <select class="form-control book-item" id="formControlSelect1">
                            <option>{i18n.t("trips_select_dest")}</option>
                            <option>New York</option>
                            <option>Denmark</option>
                            <option>Miami</option>
                            <option>Los Angeles</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="book-view">
                            <label for="formControlSelect1">{i18n.t("trips_departure")}</label>
                            <select class="form-control book-item" id="formControlSelect2">
                            <option>{i18n.t("trips_select_departure")}</option>
                            <option>02 july-08 july</option>
                            <option>07 july-14 july</option>
                            <option>12 july-18 july</option>
                            <option>20 july-29 july</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="book-view">
                            <label for="formControlSelect1">{i18n.t("trips_transport")}</label>
                            <select class="form-control book-item" id="formControlSelect3">
                            <option>{i18n.t("trips_select_transport")}</option>
                            <option>{i18n.t("trips_transport_plane")}</option>
                            <option>{i18n.t("trips_transport_bus")}</option>
                            <option>{i18n.t("trips_transport_train")}</option>
                            <option>{i18n.t("trips_transport_boat")}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="book-view">
                            <label for="formControlSelect1">{i18n.t("trips_ppl_nbr")}</label>
                            <select class="form-control book-item" id="formControlSelect4">
                            <option>{i18n.t("trips_select_ppl_nbr")}</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <section id="hotel-section">
            <div class="container">
                    <Async promiseFn={loadTrips}>
                    {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading..."
                    if (err) return `Something went wrong: ${err.message}`

                    if (data)
                        return (
                            <div class="row">
                            {data.map(trip => (
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="hotel_image">
                                        <img src={trip.destinationImg === 'unknown' || !trip.destinationImg ? sampleTrip : trip.destinationImg} alt="Image"/>
                                        <div class="hotel_content">
                                            <div class="span_btwn">
                                                <ul class="d-flex justify-content-between">
                                                {(moment(trip.departureDateTime) > moment()) &&
                                                    <li key="bla">Démarre dans {moment(trip.departureDateTime).diff(moment(), 'days')} jours</li>
                                                }
                                                {(moment(trip.departureDateTime) < moment()) &&
                                                    <li key="bla">Se termine dans {moment(trip.arrivalDateTime).diff(moment(), 'days')} jours</li>
                                                }
                                                </ul>
                                            </div>
                                            <h5 class="text-center">{trip.name}</h5>
                                            {(trip.departureDateTime != 'unknown') &&
                                                <p class="text-center"><Moment format="DD/MM/YYYY">{trip.departureDateTime}</Moment> - <Moment format="DD/MM/YYYY">{trip.arrivalDateTime}</Moment></p>
                                            }
                                            <ul class="d-flex justify-content-around hotel-text">
                                                <li key="bla" class="">{trip.numberFlight ? trip.numberFlight : 0} vol(s)</li>
                                                <li key="bla" class="">{trip.numberTrain ? trip.numberTrain : 0} train(s)</li>
                                            </ul>
                                            <div class="book-btn text-center">
                                                <a href={"/trips/" + trip._id}>Accéder</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )
                    }}
                    </Async>
            </div>
            </section>
            <Snackbar open={openSuccess} onClose={closeSuccess} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                {i18n.t("trips_success_created")}
            </Alert>
            </Snackbar>
            <Snackbar open={openError} onClose={closeError} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: '100%' }}>
                {i18n.t("trips_error_created")}
            </Alert>
            </Snackbar>
            <Dialog open={openModal} onClose={toogleModal}>
                <DialogTitle>{i18n.t("trips_new_trip")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18n.t("trips_new_adventure")}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        onChange={setTextValue}
                        margin="dense"
                        id="tripName"
                        label={i18n.t("trips_form_tname")}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toogleModal}>{i18n.t("trips_cancel")}</Button>
                    <Button onClick={addTrip}>{i18n.t("trips_create")}</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
}

export default withTranslation("trips")(Trips);