import React, { useEffect, useState } from "react";
import TextFieldAuth from "../components/TextFieldAuth";
import ButtonAuth from "../components/ButtonAuth";
import LockLogo from "../assets/login-lock-logo.png";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";


const PasswordChanged = () => {
    let history = useNavigate();

    return (
        <div className="fp-container" style={{"height": "420px"}}>
            <div className="login-img-container">
                <IoCheckmarkCircleOutline color="#52a82a" size={100}/>
            </div>
            <div className="header-container">
                <h1>Mot de passe modifier avec succès !</h1>
                <p>
                    Vous pouvez dès à présent utiliser votre nouveau mot de passe pour vous connecter à votre compte Fleepi ! 🙌
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

const FormRP = ({setMdpStatus}) => {

    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    

    const [open, setOpen] = useState(false);

    async function PasswordCall() {

        const queryParams = window.location.href.split("/").pop();

        if (password === passwordConf) {
            let body_content = {
                token: queryParams,
                newPass: password,
                newPassConf: passwordConf
            }
    
            let result = await fetch("https://fleepi-api.herokuapp.com/updatePassword", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(body_content),
            });

            if (result.status == 200) {
                setMdpStatus(true);
            } else {
                setOpen(true);
            }
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    useEffect(() => {
        console.log(password)
    })

    return (
        <div className="fp-container increase-h">
            <div className="login-img-container">
                <img className="lock-logo" src={LockLogo} alt="Lock logo"></img>
            </div>
            <div className="header-container">
                <h1>Rénitialisation du mot de passe</h1>
                <p>
                    Veuillez remplir les champs ci-dessous afin de modifier correctement votre mot de passe. ⚠ Le "mot de passe" et le "mot de passe de confirmation" doivent êtres identiques.
                </p>
            </div>
            <div className="input-container">
                <TextFieldAuth
                    title="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    type="password"
                />
            </div>
            <div className="input-container">
                <TextFieldAuth
                    title="password_conf"
                    onChange={(e) => setPasswordConf(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    type="password"
                />
            </div>
            <div className="clicable-widgets-container">
                <ButtonAuth
                    onClick={PasswordCall}
                    title="Continuer"
                />
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Communication problem with the API
                </Alert>    
            </Snackbar>
        </div>
    );
}

const PasswordReset = () => {

    const [email, setEmail] = useState("");
    const [mdpChanged, setMdpStatus] = useState(false);

    return (
        <div className="forgot-password">
            <div className="widget-wrapper">
                {
                    mdpChanged ?
                    <PasswordChanged />
                    : <FormRP setMdpStatus={setMdpStatus}/>
                }
                
            </div>
        </div>
    );
}

export default PasswordReset;