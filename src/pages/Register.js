import React, { useState } from "react";
import TextFieldAuth from "../components/TextFieldAuth";
import ButtonAuth from "../components/ButtonAuth";
import { useNavigate } from "react-router-dom";

import FleepiLogo from "../assets/Images/fleepi_logo.png";
import { IoAlertCircleOutline } from "react-icons/io5";

const Register = () => {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    //Error variables
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    let history = useNavigate();

    async function register() {

        if (emptyField() && mailIsValid()) {

            let body_content = {
                firstname: firstName,
                lastname: lastName,
                username: username,
                mail: email,
                password: password,
            }

            let result = await fetch("https://fleepi-api.herokuapp.com/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body_content),
            });

            let value = await result.json();
            
            if (value.status.code == 200) {
                history("/login");
            } else {
                setErrorStatus(true);
                setErrorMSG("Une erreur est survenue, veuillez vérifier vos informations")
            }
        }
    }

    const handleChange = (event) => {
        if (event.target.name == "username")
            setUsername(event.target.value)
        else if (event.target.name == "firstname")
            setFirstName(event.target.value)
        else if (event.target.name == "lastname")
            setLastName(event.target.value)
        else if (event.target.name == "email")
            setEmail(event.target.value)
        else if (event.target.name == "password")
            setPassword(event.target.value)
        else if (event.target.name == "c_password")
            setConfPassword(event.target.value)
    }

    const mailIsValid = () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(email) === false) {
            setErrorStatus(true);
            setErrorMSG("Adresse email invalide")
            return false;
        } else
            return true;
    }

    const emptyField = () => {
        if (email === "" || username === "" || firstName === "" || lastName === "" || password === "" || confPassword === "") {
            console.log(email, username, firstName, lastName, password, confPassword)
            setErrorStatus(true);
            setErrorMSG("Tous les champs doivent êtres complétés")
            return false; 
        } else {
            return true;
        }
    }

    return (
        <div className="auth">
            <div className="auth-wrapper">
                <div className="bg-img">
                    <div className="bg-img__overlay">
                        <section className="bg-img__desc">
                            <h1>Inscris toi</h1>
                            <span>Et profitez des nombreux avantages que votre nouveau compagnon pourrait vous proposer.</span>
                        </section>
                    </div>
                </div>
                <div className="register-container">
                    <div className="login-img-container">
                        <img className="lock-logo" src={FleepiLogo} alt="Fleepi Logo"></img>
                    </div>
                    <h1 className="main-title">Créer votre compte</h1>

                    <div className="input-container">
                        <div className="input-1">
                            <TextFieldAuth
                                title="username"
                                onChange={handleChange}
                                placeholder="Nom d'utilisateur"
                                type="text"
                            />
                        </div>
                        <div className="input-2">
                            <TextFieldAuth
                                title="firstname"
                                onChange={handleChange}
                                placeholder="Prénom"
                                type="text"
                            />
                        </div>
                        <div className="input-3">
                            <TextFieldAuth
                                title="lastname"
                                onChange={handleChange}
                                placeholder="Nom"
                                type="text"
                            />
                        </div>
                        <div className="input-4">
                            <TextFieldAuth
                                title="email"
                                onChange={handleChange}
                                placeholder="Adresse email"
                                type="text"
                            />
                        </div>
                        <div className="input-5">
                            <TextFieldAuth
                                title="password"
                                onChange={handleChange}
                                placeholder="Mot de passe"
                                type="password"
                            />
                        </div>
                        <div className="input-6">
                            <TextFieldAuth
                                title="c_password"
                                onChange={handleChange}
                                placeholder="Confirmation mot de passe"
                                type="password"
                            />
                        </div>
                    </div>

                    {
                        errorStatus &&
                        <div className="error-message">
                            <IoAlertCircleOutline color={"red"}/>
                            <span>{errorMSG}</span>
                        </div>
                    }

                    <div className="clicable-widgets">
                        <ButtonAuth onClick={register} title="Créer mon compte" />
                        <div className="clicable-widgets__links">
                            <a href="#" onClick={() => history('/login')}>Vous avez déjà un compte ? Se connecter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Register;