import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import { my_fetch } from "../../components/RefreshToken";

const AccountDeletion_M = (props) => {

    let history = useNavigate();
    const dispatch = useDispatch();

    async function deleteAccount() {

        let body_content = {
            userId: localStorage.getItem("id"),
        }

        // let result = await fetch("https://fleepi-api.herokuapp.com/delUser", {
        //     method: 'POST',
        //     headers: {
        //         "id": localStorage.getItem("id"),
        //         "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MjI5NWQ3MDZmMTRkMDI0ZjEzOWVlZDkiLCJpYXQiOjE2NDcyMzM2NTN9.Ovl7uekNwDQjinIKzd53gNAHUibR88nAJ-jwtfXCvuo",
        //     },
        //     body: JSON.stringify(body_content),
        //     redirect: "follow"
        // })
        // .then(res => {
        //     dispatch({ type: "SET_IS_LOGGED", payload: false });
        //     console.log(res)
        //     localStorage.clear();
        //     history('/login');
        // })
        // .catch(err => console.log('error', err));
    }

    return (
        <div className="account-deletion-container">
            <div className="bg-overlay">
                <div className="account-deletion__modal">
                    <header className="modal__header">
                        <div className="modal__header-button-close">
                            <FaTimes size={20} id="button-close" onClick={props.CloseTab}/>
                        </div>
                        <div className="modal__header-title">
                            <span>Supprimer votre compte</span>
                        </div>
                    </header>
                    <div id="header-separator"></div>
                    <div className="modal__description">
                        <p>• En cliquant sur le button ci-dessous, vous confirmez vouloir supprimer définitivement votre compte chez Fleepi.com</p>
                        <p>• La suppression de votre compte sera irréversible</p>
                        <p>• Plus aucune publicité Fleepi ne vous sera envoyé par mail</p>
                    </div>
                    <div className="modal__select-button">
                        <Button onClick={() => deleteAccount()} title="Supprimer définitivement"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDeletion_M;