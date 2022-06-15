import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import Button from "../../components/Button";
import { my_fetch } from "../../components/RefreshToken";

export default function UploadFile_M({CloseTab}){
    let history = useNavigate();

    async function deleteAccount() {

        let body_content = {
            username: localStorage.getItem("username"),
        }

        let result = await fetch("https://fleepi-api.herokuapp.com/deleteUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body_content),
        });

        let rq_response = await result.status;

        console.log(result);

        // if (rq_response === 200) {
        //     localStorage.clear();
        //     history.push('/login');
        // }
    }

    return (
        <div className="account-deletion-container">
            <div className="bg-overlay">
                <div className="account-deletion__modal">
                    <header className="modal__header">
                        <div className="modal__header-button-close">
                            <FaTimes size={20} id="button-close" onClick={CloseTab}/>
                        </div>
                        <div className="modal__header-title">
                            <span>Supprimer votre compte</span>
                        </div>
                    </header>
                    <div id="header-separator"></div>
                    <div className="modal__description">
                        <p>• En cliquant sur le button ci-dessous, vous confirmez vouloir supprimer définitivement votre compte chez Fleepi.com</p>
                        <p>• La suppression de votre compte sera irréversible</p>
                        <p>• Plus aucune publicité Fleepi ne vou sera envoyé par mail</p>
                    </div>
                    <div className="modal__select-button">
                        <Button onClick={() => deleteAccount()} title="Supprimer définitivement"/>
                    </div>
                </div>
            </div>
        </div>
    );
}