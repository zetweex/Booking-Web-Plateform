import React, { useState } from "react";
import TextFieldAuth from "../components/TextFieldAuth";
import ButtonAuth from "../components/ButtonAuth";
import LockLogo from "../assets/login-lock-logo.png";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";


const MailSent = ({PasswordCall, handleChange}) => {
    let history = useNavigate();

    return (
        <div className="fp-container" style={{"height": "420px"}}>
            <div className="login-img-container">
                <IoCheckmarkCircleOutline color="#52a82a" size={100}/>
            </div>
            <div className="header-container">
                <h1>Email envoyé avec succès !</h1>
                <p>
                    Un email de modification de mot de passe vous sera envoyé sous peu, si toutefois votre adresse email est correcte ...
                </p>
            </div>
            <div className="clicable-widgets-container">
                <ButtonAuth
                    onClick={() => history('/login')}
                    title="Page de connexion"
                />
            </div>
        </div>
    );
}

const FormFP = ({PasswordCall, handleChange}) => {
    return (
        <div className="fp-container">
            <div className="login-img-container">
                <img className="lock-logo" src={LockLogo} alt="Lock logo"></img>
            </div>
            <div className="header-container">
                <h1>Vous avez oublié votre mot de passe ?</h1>
                <p>
                    Aucun soucis, ce sont des choses qui arrivent
                    <span id="smiley"> 😄 </span>
                    ... Renseignez votre adresse email ci-dessous pour recevoir un mail de modification de votre mot de passe.
                </p>
            </div>
            <div className="input-container">
                <TextFieldAuth
                    title="email"
                    onChange={handleChange}
                    placeholder="Entrer votre Email"
                    type="text"
                />
            </div>
            <div className="clicable-widgets-container">
                <ButtonAuth
                    onClick={PasswordCall}
                    title="Continuer"
                />
            </div>
        </div>
    );
}

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [mailSent, setMailStatus] = useState(false);
    
    const [open, setOpen] = useState(false);

    async function PasswordCall() {

        let body_content = {
            mail: email,
        }

        let result = await fetch("https://fleepi-api.herokuapp.com/forgotPassword", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body_content),
        });

        let rq_response = await result.json();

        console.log(result)

        if (result.status == 200) {
            setMailStatus(true)
        } else {
            setOpen(true);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    const handleChange = (event) => {
        if (event.target.name == "email")
            setEmail(event.target.value);
    }

    return (
        <div className="forgot-password">
            <div className="widget-wrapper">
                {
                    mailSent ?
                    <MailSent handleChange={handleChange} PasswordCall={PasswordCall}/>
                    : <FormFP handleChange={handleChange} PasswordCall={PasswordCall}/>
                }
                
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Communication problem with the API
                </Alert>    
            </Snackbar>
        </div>
    );
}

export default ForgotPassword;