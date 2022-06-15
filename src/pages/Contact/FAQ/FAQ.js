import React, { useState } from "react";
import Button from "../../../components/Button";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

import i18n from "../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const FAQ = (props) => {
    return (
        <div className="page-content-wrap">
            <section className="help-center-section fit-height">
                <div className="help-center__title title">
                    <IoChevronBack id="back-icon" onClick={props.back}/>
                    <h1>{i18n.t('faq_hc_title')}</h1>
                </div>
                <section className="help-center__content">
                    {props.component}
                </section>
            </section>
            <section className="more-help-section">
                <h1>{i18n.t('faq_mh_title')}</h1>
                <a href="/contact">{i18n.t('faq_mh_link')}</a>
            </section>
        </div>
    );
}

export default withTranslation("faq")(FAQ);