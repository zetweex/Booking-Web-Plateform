import React, { useState } from "react";
import TextFieldAuth from "../components/TextFieldAuth";
import ButtonAuth from "../components/ButtonAuth";
import { useNavigate } from "react-router-dom";
import GoogleButtonAuth from "../components/GoogleButtonAuth";
import { useDispatch } from "react-redux";

import FleepiLogo from "../assets/Images/fleepi_logo.png";
import { IoAlertCircleOutline } from "react-icons/io5";
import GoogleLogin from "react-google-login";

import FacebookLogin from 'react-facebook-login';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Error variables
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    let history = useNavigate();
    const storage = localStorage;
    const dispatch = useDispatch();

    // async function responseFacebook(response) {

    //     if (!response) {
    //         console.log(response);
    //         return
    //     }

    //     const access_token = response.accessToken;

    //     const body_content = {
    //         accessToken: access_token,
    //     }

    //     let registerResult = await fetch("https://fleepi-api.herokuapp.com/facebookRegister", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify(body_content),
    //     });

    //     if (registerResult.status != 200) {
    //         let loginResult = await fetch("https://fleepi-api.herokuapp.com/facebookLogin", {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //             },
    //             body: JSON.stringify(body_content),
    //         });
    //     }

    //     // let data = await loginResult.json();

    //     console.log(registerResult);

    // }

    async function responseGoogle(response){
        if (!response || !response.profileObj) {
            console.log(response)
            return
        }
        console.log(response.profileObj)
    
        const firstname = response.profileObj.givenName
        const lastname = response.profileObj.familyName
        const email = response.profileObj.email
        const id = response.profileObj.googleId
        let registerResult = await fetch("https://fleepi-api.herokuapp.com/googleRegister", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({email:email,firstname:firstname,lastname:lastname,id:id}),
        })
        let loginResult = await fetch("https://fleepi-api.herokuapp.com/googleLogin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({email:email,firstname:firstname,lastname:lastname,id:id}),
        })
        let data = await loginResult.json()
        console.log('status' in data && data['status'].type == 'Success')
        
        if ('status' in data && data['status'].type == 'Success') {
            let rq_response = data
            console.log(rq_response.data.access_token);
            storage.setItem("access_token", rq_response.data.access_token);
            storage.setItem("refresh_token", rq_response.data.refresh_token);
            storage.setItem("id", rq_response.data.user.id);
            storage.setItem("firstname", rq_response.data.user.firstname);
            storage.setItem("lastname", rq_response.data.user.lastname);
            storage.setItem("address", rq_response.data.user.address);
            storage.setItem("mail", rq_response.data.user.mail);
            console.table(storage)
            history.push("/me");
        }
    }

    async function loginFacebook() {


            let body_content = {
                mail: "arthur.mariet51@gmail.com",
                password: "password",
            }

            let result = await fetch("https://fleepi-api.herokuapp.com/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(body_content),
            });

            let rq_response = await result.json();
            
            if (rq_response.status.code == 200) {
                
                dispatch({ type: "SET_IS_LOGGED", payload: true });

                storage.setItem("access_token", rq_response.data.access_token);
                storage.setItem("refresh_token", rq_response.data.refresh_token);
                storage.setItem("id", rq_response.data.user.id);
                storage.setItem("firstname", rq_response.data.user.firstname);
                storage.setItem("lastname", rq_response.data.user.lastname);
                storage.setItem("address", rq_response.data.user.address);
                storage.setItem("mail", rq_response.data.user.mail);
                storage.setItem("username", rq_response.data.user.username);
                storage.setItem("picture", rq_response.data.user.picture);
                
                history("/home");
            } else {
                setErrorStatus(true);
                setErrorMSG("Vos identifiants semblent êtres incorrects");
            }
    }

    async function login() {

        if (mailIsValid()) {

            let body_content = {
                mail: email,
                password: password,
            }

            let result = await fetch("https://fleepi-api.herokuapp.com/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(body_content),
            });

            let rq_response = await result.json();
            
            if (rq_response.status.code == 200) {
                
                dispatch({ type: "SET_IS_LOGGED", payload: true });

                storage.setItem("access_token", rq_response.data.access_token);
                storage.setItem("refresh_token", rq_response.data.refresh_token);
                storage.setItem("id", rq_response.data.user.id);
                storage.setItem("firstname", rq_response.data.user.firstname);
                storage.setItem("lastname", rq_response.data.user.lastname);
                storage.setItem("address", rq_response.data.user.address);
                storage.setItem("mail", rq_response.data.user.mail);
                storage.setItem("username", rq_response.data.user.username);
                storage.setItem("picture", rq_response.data.user.picture);
                
                history("/home");
            } else {
                setErrorStatus(true);
                setErrorMSG("Vos identifiants semblent êtres incorrects");
            }
        }
    }

    const handleChange = (event) => {
        if (event.target.name == "email")
            setEmail(event.target.value);
        else if (event.target.name == "password")
            setPassword(event.target.value);
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

    return (
        <div className="auth">
            <div className="auth-wrapper">
                <div className="login-container">
                    <div className="login-img-container">
                        <img src={FleepiLogo} alt="Fleepi Logo"></img>
                    </div>

                    <h1 className="main-title">Hey, ravis de vous revoir !</h1>
                    
                    <div className="oauth-container">
                        <GoogleLogin
                            clientId="194708668077-6rv0oad543rg8srtrnu7cu5nrnlil9ak.apps.googleusercontent.com"
                            buttonText="Google"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className="fa fa-google" disabled={renderProps.disabled}></button>
                              )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        {/* <FacebookLogin
                            appId="3296278887284559"
                            autoLoad={true}
                            fields="id,name,email"
                            textButton="Facebook"
                            onClick={() => loginFacebook()}
                            icon="fa-facebook"
                        /> */}
                        <button onClick={() => loginFacebook()} class="fa fa-facebook"></button>
                        
                    </div>


                    <div className="separator-auth-methods-container">
                        <hr></hr>
                        <span>OU</span>
                        <hr></hr>
                    </div>

                    <div className="input-1">
                        <TextFieldAuth
                            title="email"
                            onChange={handleChange}
                            placeholder="Adresse email"
                            type="text"
                        />
                    </div>

                    <div className="input-2">
                        <TextFieldAuth
                            title="password"
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            type="password"
                        />
                    </div>

                    {/* TODO */}

                    {/* <div className="remember-container">
                        <input type="checkbox" />
                        <label>Se souvenir de moi</label>
                    </div> */}

                    {
                        errorStatus &&
                        <div className="error-message">
                            <IoAlertCircleOutline color={"red"}/>
                            <span>{errorMSG}</span>
                        </div>
                    }

                    <div className="clicable-widgets">
                        <ButtonAuth onClick={login} title="Connexion" />
                        <div className="clicable-widgets__links">
                            <a href="/forgot-password">Mot de passe oublié ?</a>
                            <a href="/register">Je n'ai pas encore de compte</a>
                        </div>
                    </div>
                </div>
                <div className="bg-img">
                    <div className="bg-img__overlay">
                        <section className="bg-img__desc">
                            <h1>Connecte toi</h1>
                            <span>Et commence ton voyage avec Fleepi en toute simplicité en profitant de ses nombreux avantages.</span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Login;