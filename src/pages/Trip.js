import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { matchCompany } from "../utils/matchCompany";

import Moment from 'react-moment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Async from 'react-async';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlightIcon from '@mui/icons-material/FlightTakeoff';
import TrainIcon from '@mui/icons-material/Train';
import Typography from '@mui/material/Typography';

import breadcrumb2 from "../assets/breadcrumb-img2.png";
import breadcrumb3 from "../assets/breadcrumb-img3.png";
import { useParams } from 'react-router-dom';

const Trip = () => {
    const [openModal, setModalOpen] = React.useState(false);
    const [openSuccess, setSuccessOpen] = React.useState(false);
    const [openError, setErrorOpen] = React.useState(false);
    const {tripID} = useParams();
    var firstName;
    var lastName;
    var bookingCode;
    var company;

    const toogleModal = () => {
        setModalOpen(!openModal);
      };

    const addTicket = () => {
        addTicketRequest();
        setModalOpen(false);
    };

    const closeSuccess = () => {
        setSuccessOpen(false);
      };

    const closeError = () => {
        setErrorOpen(false);
    };

    const setTextValue = (event) => {
        if (event.target.name === 'company'){
            company = event.target.value;
        }
        switch (event.target.id){
            case 'firstName':
               firstName = event.target.value;
            case 'lastName':
               lastName = event.target.value;
            case 'bookingCode':
               bookingCode = event.target.value;
        }
    }
    async function addTicketRequest() {
        let body_content = {
            firstName: firstName,
            lastName: lastName,
            bookingCode: bookingCode,
            company: company,
            tripID: tripID
        }
        let result = await fetch("https://fleepi-api.herokuapp.com/retrieveFlight", {
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

    const loadTickets = () =>
        fetch("https://fleepi-api.herokuapp.com/tickets/" + tripID, {
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
    return (
        <div>
            <Navbar />
            <section id="page-breadcrumb">
                <div class="common-overlay"></div>
                <div class="breadcrumb-menu">
                    <h3>TICKETS</h3>
                    <ol class="breadcrumb d-flex justify-content-center">
                        <li>
                            <a href="/trips">Mes voyages&nbsp;/&nbsp;</a>
                        </li>
                        <li class="active">Tickets</li>
                    </ol>
                </div>
                <img src={breadcrumb2} class="breadcrumb-img2" alt="breadcrumb-img2"/>
                <img src={breadcrumb3} class="breadcrumb-img3" alt="breadcrumb-img2"/>
            </section>
            <div class="container">
                <div class="add-btn text-center">
                    <a onClick={toogleModal}>Ajouter un ticket</a>
                </div>
            <section id="hotel-section">
            <div class="container">
                    <Async promiseFn={loadTickets}>
                    {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading..."
                    if (err) return `Something went wrong: ${err.message}`
                    if (data)
                        return (
                            <Timeline position="alternate">
                            {data.map(ticket => (
                                <div>
                                {(ticket.data !== 'unknown' && ticket.data.type === 'train' && !ticket.data.trips[0].isRoundTrip) &&
                                    <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        <Moment format="DD/MM/YYYY HH:mm">{ticket.data.trips[0].departureDateTime}</Moment> - <Moment format="DD/MM/YYYY HH:mm">{ticket.data.trips[0].arrivalDateTime}</Moment>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot>
                                            <TrainIcon />
                                        </TimelineDot>
                                        <TimelineConnector/>
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                {ticket.data.trips[0].originName} - {ticket.data.trips[0].destinationCityName}
                                            </Typography>
                                            <Typography>{matchCompany(ticket.company)}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                }
                                {(ticket.data !== 'unknown' && ticket.data.type === 'train' && ticket.data.trips[0].isRoundTrip) &&
                                    <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        <Moment format="DD/MM/YYYY HH:mm">{ticket.data.trips[0].departureDateTime}</Moment> - <Moment format="DD/MM/YYYY HH:mm">{ticket.data.trips[0].arrivalDateTime}</Moment>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot>
                                            <TrainIcon />
                                        </TimelineDot>
                                        <TimelineConnector/>
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                {ticket.data.trips[0].destinationCityName} - {ticket.data.trips[0].originName}
                                            </Typography>
                                            <Typography>{matchCompany(ticket.company)}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                               }
                               {(ticket.data !== 'unknown' && ticket.data.type === 'flight') && ticket.data.trips.map(flight => (
                                    <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        <Moment format="DD/MM/YYYY HH:mm">{flight.departureDateTime}</Moment> - <Moment format="DD/MM/YYYY HH:mm">{flight.arrivalDateTime}</Moment>
                                        <br></br>
                                        {flight.isCancelled ? 'Annulé' : 'A l\'heure'}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color={flight.isCancelled ? 'warning' : 'success'}>
                                            <FlightIcon/>
                                        </TimelineDot>
                                        <TimelineConnector/>
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                {flight.originName} - {flight.destinationCityName}
                                            </Typography>
                                            <Typography>{matchCompany(ticket.company)}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                               ))}
                                </div>
                            ))}
                            </Timeline>
                        )
                    }}
                    </Async>
            </div>
            </section>
            <Snackbar open={openSuccess} onClose={closeSuccess} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                Ticket ajouté avec succès
            </Alert>
            </Snackbar>
            <Snackbar open={openError} onClose={closeError} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: '100%' }}>
                Votre ticket n'a pas pu etre ajouté
            </Alert>
            </Snackbar>
            <Dialog open={openModal} onClose={toogleModal}>
            <DialogTitle>Ajouter un ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ajoutez votre billet de train ou d'avion par son code de réservation et sa compagnie
                </DialogContentText>
                <TextField
                autoFocus
                onChange={setTextValue}
                margin="dense"
                id="firstName"
                label="Prénom"
                type="text"
                fullWidth
                variant="standard"
                />
                <TextField
                autoFocus
                onChange={setTextValue}
                margin="dense"
                id="lastName"
                label="Nom de famille"
                type="text"
                fullWidth
                variant="standard"
                />
                <TextField
                autoFocus
                onChange={setTextValue}
                margin="dense"
                id="bookingCode"
                label="Numéro de reservation"
                type="text"
                fullWidth
                variant="standard"
                />
                <Select
                onChange={setTextValue}
                id="company"
                margin="dense"
                name="company"
                defaultValue={'airfrance'}
                label="Compagnie"
                value={company}
                type="text"
                fullWidth
                variant="standard"
                >
                    <MenuItem value={'airfrance'}>Air France</MenuItem>
                    <MenuItem value={'sncf'}>SNCF</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={toogleModal}>Annuler</Button>
                <Button onClick={addTicket}>Créer</Button>
            </DialogActions>
            </Dialog>
            <Footer />
        </div></div>
    );
}

export default Trip;