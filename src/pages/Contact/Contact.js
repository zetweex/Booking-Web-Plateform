import React, { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IoChevronForward } from "react-icons/io5";

import FAQ from "./FAQ/FAQ";
import CoronavirusFAQ from "./FAQ/Themes/Coronavirus";
import AddTripFAQ from "./FAQ/Themes/AddTrip";
import BookDetailsFAQ from "./FAQ/Themes/BookDetails";
import CancelFAQ from "./FAQ/Themes/Cancel";
import CommunicationFAQ from "./FAQ/Themes/Communication";
import OnlineSecurityFAQ from "./FAQ/Themes/OnlineSecurity";
import PurchaseFAQ from "./FAQ/Themes/Purchase";
import FormSC from "./Form";

import i18n from "../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const ContactUs = () => {

    const [displayFAQ, setDisplayFAQ] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(Object);

    const themeList = {
        "FORM": <FormSC />,
        "COVID": <FAQ component={ <CoronavirusFAQ /> } back={() => setDisplayFAQ(false)} />,
        "CANCEL": <FAQ component={ <CancelFAQ /> } back={() => setDisplayFAQ(false)} />,
        "PURCHASE": <FAQ component={ <PurchaseFAQ /> } back={() => setDisplayFAQ(false)} />,
        "BOOK_DETAILS": <FAQ component={ <BookDetailsFAQ /> } back={() => setDisplayFAQ(false)} />,
        "COMMUNICATION": <FAQ component={ <CommunicationFAQ /> } back={() => setDisplayFAQ(false)} />,
        "ADD_TRIP": <FAQ component={ <AddTripFAQ /> } back={() => setDisplayFAQ(false)} />,
        "ON_SECURITY": <FAQ component={ <OnlineSecurityFAQ /> } back={() => setDisplayFAQ(false)} />
    };

    const handleScreenDisplay = (theme_code) => {
        setDisplayFAQ(true);
        setCurrentTheme(themeList[theme_code]);   
    }

    return (
        <div className="body-page">
            <Navbar />
            <div className="contact-wrap">
                { displayFAQ === false && <Main handleScreenDisplay={handleScreenDisplay} />}
                { displayFAQ && currentTheme }
            </div>
            <Footer />
        </div>
    );
}

const Main = (props) => {
    return (
        <div className="page-content-wrap">
            <section className="help-center-section">
                <div className="help-center__title title">
                    <h1>{i18n.t('contact_hc_title')}</h1>
                </div>
                <section className="help-center__content">
                    <h1>{i18n.t('contact_hc_welcome')}</h1>
                    <p>{i18n.t('contact_hc_availability')}</p>
                    <Button onClick={() => props.handleScreenDisplay("FORM")} id="button" title={i18n.t('contact_hc_button')}/>
                </section>
            </section>
            <section className="faq-section">
                <div className="faq__title title">
                    <h1>{i18n.t('contact_faq_title')}</h1>
                </div>
                <div>
                    <Theme title={i18n.t('contact_th_title_covid')} onClick={() => props.handleScreenDisplay("COVID")} />
                    <Theme title={i18n.t('contact_th_title_cancel')} onClick={() => props.handleScreenDisplay("CANCEL")} />
                    <Theme title={i18n.t('contact_th_title_purchase')} onClick={() => props.handleScreenDisplay("PURCHASE")} />
                    <Theme title={i18n.t('contact_th_title_details')} onClick={() => props.handleScreenDisplay("BOOK_DETAILS")} />
                    <Theme title={i18n.t('contact_th_title_com')} onClick={() => props.handleScreenDisplay("COMMUNICATION")} />
                    <Theme title={i18n.t('contact_th_title_addtrip')} onClick={() => props.handleScreenDisplay("ADD_TRIP")} />
                    <Theme title={i18n.t('contact_th_title_security')} onClick={() => props.handleScreenDisplay("ON_SECURITY")}/>
                </div>
            </section>
        </div>
    );
}

const Theme = (props) => {
    return (
        <div className="theme-container" onClick={props.onClick}>
            <div className="theme__content">
                <h2>{props.title}</h2>
                <IoChevronForward />
            </div>
        </div>
    );
}

export default withTranslation('contact_us')(ContactUs);