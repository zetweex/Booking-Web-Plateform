import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { my_fetch } from "../components/RefreshToken";

import { FaInfoCircle, FaShieldVirus, FaPumpSoap, FaBacteria, FaBriefcaseMedical, FaCheck } from "react-icons/fa";
import PremiumLogo from "../assets/chest.png";
import bgVideo from "../assets/Videos/bg_video_3.mp4";
import FleepiLogo from "../assets/Images/fleepi_logo_txt.png";
import DialogPicture from "../assets/Images/conversation.jpg";

import i18n from "../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const Home = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [bookingCode, setBookingCode] = useState("");

    const myRef = useRef(null);
    
    let history = useNavigate();
    const storage = localStorage;

    function handleChange(text, inputId) {
        if (inputId == "firstname")
            setFirstname(text);
        else if (inputId == "lastname")
            setLastname(text);
        else if (inputId == "bookingCode")
            setBookingCode(text);
    }

    const executeScroll = () => myRef.current.scrollIntoView();

    async function GetCityName() {

        let body_content = {

        }

        let result = await fetch("https://fleepi-api.herokuapp.com/contactUs", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body_content),
        });

    }

    return (
        <div>
            <Navbar activeTab={"/home"}/>
            <div className="homepage-container">
                <div className="main-container">
                    <video className="bg-video" autoPlay loop muted>
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                    <div className="bg-overlay">
                        <div className="logo">
                            <img src={FleepiLogo} alt="Fleepi Logo"></img>
                        </div>
                        <div className="header">
                            <h1>{i18n.t('home_hd_title')}</h1>
                            <span>{i18n.t('home_hd_desc')}</span>
                            <div className="header__store-buttons">
                                <Button id="android" title={i18n.t('home_hd_android')}/>
                                <Button id="apple" title={i18n.t('home_hd_apple')} />
                            </div>
                        </div>
                        <div onClick={executeScroll} className="arrow">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                {/* CODE À NETTOYER/REFONDER */}
                <div className="body-container">
                    <div ref={myRef} className="warning-covid-recommendation">
                        <div className="warning-covid-recommendation-logo">
                            <FaInfoCircle size={40} color={"#e79d72"}/>
                        </div>
                        <div className="warning-covid-recommendation-span">
                            <span>{i18n.t('home_covid_desc')}</span>
                            <a href="/coronavirus-booking-information">{i18n.t('home_covid_link')}</a>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="tool-recommendation" onClick={() => history("/translator")}>
                        <img className="imgg" src={DialogPicture} alt="Two people are talking"></img>
                        <div className="tool-recommendation__overlay">
                            <h1>{i18n.t('home_trad_title')}</h1>
                            <p>{i18n.t('home_trad_desc')}</p>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <FleepiPremiumWidget />
                    <div className="separator"></div>
                    {/* RESTRICTION HYGIENE */}
                    <div className="hygien-restrictions">
                        <div className="hygien-restrictions-title">
                            <h1>{i18n.t('home_hygien_title')}</h1>
                            <span>{i18n.t('home_hygien_desc')}</span>
                        </div>
                        <div className="hygien-restrictions-nodes-container">
                            <HygienMethodNode logo={<FaShieldVirus size={30}/>} title={i18n.t('home_hygien_1_title')} description={i18n.t('home_hygien_1_desc')}/>
                            <HygienMethodNode logo={<FaPumpSoap size={30}/>} title={i18n.t('home_hygien_2_title')} description={i18n.t('home_hygien_2_desc')}/>
                        </div>
                        <div className="hygien-restrictions-nodes-container">
                            <HygienMethodNode logo={<FaBacteria size={30}/>} title={i18n.t('home_hygien_3_title')} description={i18n.t('home_hygien_3_desc')}/>
                            <HygienMethodNode logo={<FaBriefcaseMedical size={30}/>} title={i18n.t('home_hygien_4_title')} description={i18n.t('home_hygien_4_desc')}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

const FleepiPremiumWidget = (props) => {

    return (
        <div className="fleepi-premium">
            <div className="fleepi-premium__logo">
                <img src={PremiumLogo} />
            </div>
            <div className="fleepi-premium__widgets-container">
                <div className="fleepi-premium__title">
                    <h1>{i18n.t('home_premium_title')}</h1>
                </div>
                <div className="fleepi-premium__description">
                    <div className="description-node">
                        <FaCheck />
                        <span>{i18n.t('home_premium_benefit_1')}</span>
                    </div>
                    <div className="description-node">
                        <FaCheck />
                        <span>{i18n.t('home_premium_benefit_2')}</span>
                    </div>
                    <div className="description-node">
                        <FaCheck />
                        <span>{i18n.t('home_premium_benefit_3')}</span>
                    </div>
                </div>
                <div className="fleepi-premium__buttons">
                    <div className="fleepi-premium__comming-soon">
                        <span>{i18n.t('home_premium_soon')}</span>
                    </div>
                    <div className="fleepi-premium__stay-noticed">
                        <span>{i18n.t('home_premium_notif')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const HygienMethodNode = (props) => {
    return (
        <div className="hygien-restrictions-node">
            <div className="hygien-restrictions-node-logo">
                {props.logo}
            </div>
            <div>
                <h1>{props.title}</h1>
                <span>{props.description}</span>
            </div>
        </div>
    );
}

const CityField = (props) => {
    return (
        <div className="city-field">

        </div>
    );
}

export default withTranslation('home')(Home);