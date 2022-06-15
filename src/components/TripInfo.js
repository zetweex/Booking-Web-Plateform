import React, { useState } from "react";
import TextFieldAuth from "./TextFieldAuth";
import Button from "./Button";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const InfoTrip = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [picture, setPicture] = useState("");

    let history = useNavigate();

    const storage = localStorage;

    return (
        <div className="show-info-container">
            <div className="edit-page-container">
                <div className="title-container">
                    <h1>Vérifiez vos détails de réservation</h1>
                </div>
                <div className="show-datas-container">
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Numéro de réservation</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>3685.171.252</p>
                        </div>
                    </div>
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Détails de la réservation</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>7 nuits, 3 chambres</p>
                        </div>
                    </div>
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Vous avez réservé pour</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>2 adultes, 3 enfants</p>
                        </div>
                    </div>
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Arrivée</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>LUX, Jeudi 6 août 2021 (à partir de 14h00)</p>
                        </div>
                    </div>
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Départ</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>MYK, Jeudi 13 août 2021 (à partir de 00h00)</p>
                        </div>
                    </div>
                    <div className="node-datas-container">
                        <div className="datas-titles-container">
                            <h2>Compagnie aérienne</h2>
                        </div>
                        <div className="datas-content-container">
                            <p>Ryanair</p>
                        </div>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn-validation-style" onClick={props.callback}>Tout est correct !</button>
                    <button className="btn-cancelation-style" onClick={() => history("/contact")}>Une erreur dans votre réservation ?</button>
                </div>
            </div>
        </div>
    );
}

export default InfoTrip;