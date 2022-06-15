import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useDispatch } from "react-redux";

import { getNewToken, refreshTokenValidity } from '../RefreshToken';
import FlagshipDestination from './FlagshipDestination';
import SelectLanguage from '../../pages/Modals/SelectLanguage';


import i18n from '../../assets/Translation/i18n';
import { withTranslation } from 'react-i18next';

import FlagFr from "../../assets/fr_flag.png";
import FlagEn from "../../assets/en_flag.png";
import FlagEs from "../../assets/es_flag.png";


const Navbar = (props) => {

    const activeButtonColor = "red";
    const inactiveButtonColor = "transparent";

    const flagsPath = {
        "fr": FlagFr,
        "en": FlagEn,
        "es": FlagEs,
    };

    const [currentFlag, setCurrentFlag] = useState(FlagFr);
    const [displayFlagshipDest, setDisplayFlagshipDest] = useState(false);
    const [displayLangSelection, setDisplayLangSelection] = useState(false);

    let history = useNavigate();
    const dispatch = useDispatch();

    const handleHistory = (event) => {
        if (event.target.value == "/login") {
            dispatch({ type: "SET_IS_LOGGED", payload: false });
            localStorage.clear();
            history(event.target.value);
        } else {
            history(event.target.value);
        }
    }

    useEffect(() => {
        console.log(props.activeTab)
        // buttonColors.current[props.activeTab] = activeButtonColor;
    }, [])

    return (
        <div className="navbar">
            <nav className="navbar-top">
                <div className="navbar-top-nodes-container">
                    <div className="vertical-separator"></div>
                    <div className="navbar-top-node" onClick={() => {setDisplayFlagshipDest(true)}}>
                        <span>{i18n.t("navbar_top_fcd")}</span>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="navbar-top-node">
                        <span>{i18n.t("navbar_top_com")}</span>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="navbar-top-node">
                        <span>{i18n.t("navbar_top_help")}</span>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="navbar-top-node" onClick={() => {setDisplayLangSelection(true)}}>
                        <div className="navbar-flag-container">
                            <img className="current-flag" src={currentFlag} />
                        </div>
                    </div>
                    <div className="vertical-separator"></div>
                </div>
            </nav>
            <nav className="navbar-main">
                <div className="navbar-main-nodes-container">
                    <span onClick={() => history("/home")}>Fleepi.com</span>
                    <div className="navbar-btn-container">
                        <button value="/home" onClick={handleHistory}>
                            {i18n.t("navbar_main_lobby")}
                        </button>
                        <button value="/trips" onClick={handleHistory}>
                            {i18n.t("navbar_main_trips")}
                        </button>
                        <button value="/advisor" onClick={handleHistory}>
                            {i18n.t("navbar_main_advisor")}
                        </button>
                        <button value="/translator" onClick={handleHistory}>
                            {i18n.t("navbar_main_translate")}
                        </button>
                        <button value="/documents" onClick={handleHistory}>
                            {i18n.t("navbar_main_documents")}
                        </button>
                        <button value="/contact" onClick={handleHistory}>
                            {i18n.t("navbar_main_contact")}
                        </button>
                        <button value="/me" onClick={handleHistory}>
                            {i18n.t("navbar_main_profil")}
                        </button>
                        <button value="/login" onClick={handleHistory}>
                            {i18n.t("navbar_main_logout")}
                        </button>
                    </div>
                </div>
            </nav>
            {displayFlagshipDest && <FlagshipDestination CloseTab={() => setDisplayFlagshipDest(false)} />}
            {displayLangSelection && <SelectLanguage CloseTab={() => setDisplayLangSelection(false)}/>}
        </div>
    );
};

export default withTranslation("navbar")(Navbar);