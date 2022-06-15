import React, { useState } from "react";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

import { IoChevronDown, IoChevronUp} from "react-icons/io5";

import i18n from "../assets/Translation/i18n";
import { withTranslation } from "react-i18next";

const InfosCovid = () => {

    return (
        <div>
            <Navbar />
            <div className="infos-covid">
                <section className="title">
                    <h1>{i18n.t("icovid_title")}</h1>
                    <p>{i18n.t("icovid_desc")}</p>
                </section>
                <RuleSection title={i18n.t("icovid_1_title")} rule_content={i18n.t("icovid_1_desc")}/>
                <RuleSection title={i18n.t("icovid_2_title")} rule_content={i18n.t("icovid_2_desc")}/>
                <RuleSection title={i18n.t("icovid_3_title")} rule_content={i18n.t("icovid_3_desc")}/>
                <RuleSection title={i18n.t("icovid_4_title")} rule_content={i18n.t("icovid_4_desc")}/>
                <RuleSection title={i18n.t("icovid_5_title")} rule_content={i18n.t("icovid_5_desc")}/>
                <RuleSection title={i18n.t("icovid_6_title")} rule_content={i18n.t("icovid_6_desc")}/>
            </div>
            <Footer />
        </div>
    );
}

const RuleSection = (props) => {

    const [hide, setHide] = useState(true);

    return (
        <section className="infos-covid-section">
            <div className="infos-covid-section__title" onClick={() => hide ? setHide(false) : setHide(true)}>
                { 
                    hide ? 
                    <IoChevronDown className="info-covid-section__title-arrow" /> : 
                    <IoChevronUp className="info-covid-section__title-arrow" />
                }
                <h2>{props.title}</h2>
            </div>
            {
                hide === false &&
                <div className="infos-covid-section__content">
                    <p>{props.rule_content}</p>
                </div>
            }
        </section>
    );
}

export default withTranslation('infos_covid')(InfosCovid);