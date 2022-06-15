import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const FlagshipDestination = (props) => {

    return (
        <div className="flagship-dest">
            <div className="flagship-dest__container">
                <div className="flagship-dest__titles-container">
                    <div className="flagship-dest__titles">
                        <h1>Des destinations qu'on adore</h1>
                        <h2>Quelques selections de destinations internationnales qui nous ont marquées !</h2>
                    </div>
                    <FaTimes className="flagship-dest__closetab" onClick={props.CloseTab}/>
                </div>
                <div className="separator"></div>
                <div className="flagship-dest__nodes">
                    <FlagshipDestNode recommendation={"La Réunion"} description={"350 établissements"}/>
                    <FlagshipDestNode recommendation={"Bali"} description={"12 678 établissements"}/>
                    <FlagshipDestNode recommendation={"Ile de Ré"} description={"438 établissements"}/>
                    <FlagshipDestNode recommendation={"Koh Samui"} description={"2 211 établissements"}/>
                    <FlagshipDestNode recommendation={"Gorges du Verdon"} description={"397 établissements"}/>
                </div>
                <div className="flagship-dest__nodes">
                    <FlagshipDestNode recommendation={"Belle-Ile-en-mer"} description={"187 établissements"}/>
                    <FlagshipDestNode recommendation={"Bora-Bora"} description={"59 établissements"}/>
                    <FlagshipDestNode recommendation={"Zanzibar"} description={"834 établissements"}/>
                    <FlagshipDestNode recommendation={"Tahiti"} description={"367 établissements"}/>
                    <FlagshipDestNode recommendation={"Corse"} description={"4 939 établissements"}/>
                </div>
                <div className="flagship-dest__nodes">
                    <FlagshipDestNode recommendation={"Ile-de-France"} description={"1 219 établissements"}/>
                    <FlagshipDestNode recommendation={"Santorin"} description={"1 762 établissements"}/>
                    <FlagshipDestNode recommendation={"Lac Léman"} description={"1 564 établissements"}/>
                    <FlagshipDestNode recommendation={"Caton du Tessin"} description={"1 683 établissements"}/>
                    <FlagshipDestNode recommendation={"Grisons"} description={"2 982 établissements"}/>
                </div>
                <div className="flagship-dest__nodes">
                    <FlagshipDestNode recommendation={"État de New York"} description={"5 384 établissements"}/>
                    <FlagshipDestNode recommendation={"Province de Phuket"} description={"2 462 établissements"}/>
                    <FlagshipDestNode recommendation={"Ile d'Oléron"} description={"1 645 établissements"}/>
                    <FlagshipDestNode recommendation={"Lac d'Annecy"} description={"1 102 établissements"}/>
                    <FlagshipDestNode recommendation={"Lubéron"} description={"3 765 établissements"}/>
                </div>
            </div>
        </div>
    );
}

const FlagshipDestNode = (props) => {
    return (
        <div className="flagship-dest-node">
            <h1>{props.recommendation}</h1>
            <span>{props.description}</span>
        </div>
    );
}

export default FlagshipDestination;