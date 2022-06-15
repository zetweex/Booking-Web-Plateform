import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import i18n from "../../assets/Translation/i18n";

import Button from "../../components/Button";
import FlagFr from "../../assets/fr_flag.png";
import FlagEn from "../../assets/en_flag.png";
import FlagEs from "../../assets/es_flag.png";


const SelectLanguage = (props) => {

    const [currentCountry, setCurrentCountry] = useState(i18n.language);
    const [selectedCountry, setSelectedCountry] = useState(currentCountry);

    let unselectedCounties = [];

    const languagesDatas = {
        'fr': {
            'country_name': 'Français',
            'flag': FlagFr,
        },
        'en-US': {
            'country_name': 'Anglais',
            'flag': FlagEn,
        },
        'es': {
            'country_name': 'Espagnol',
            'flag': FlagEs,
        }
    }

    function setUnselectedCountries() {
        console.log(currentCountry)
        for (const [key, value] of Object.entries(languagesDatas)) {
            
            if (key != currentCountry) {
                unselectedCounties.push([key, value]);
            }
        }
    }

    function changeLanguage() {
        setCurrentCountry(selectedCountry);
        i18n.changeLanguage(selectedCountry);
        props.CloseTab();
    }

    setUnselectedCountries();

    return (
        <div className="select-lang-container">
            <div className="bg-overlay">
                <div className="lang-selection__modal">
                    <header className="modal__header">
                        <div className="modal__header-button-close">
                            <FaTimes size={20} id="button-close" onClick={props.CloseTab}/>
                        </div>
                        <div className="modal__header-title">
                            <span>{i18n.t('lang_sel_title')}</span>
                        </div>
                    </header>
                    <div id="header-separator"></div>
                    <section className="modal__flg-list">
                        <Flag selected_country={selectedCountry} flag={languagesDatas[currentCountry].flag} country_name={languagesDatas[currentCountry].country_name} country_id={currentCountry} setSelectedCountry={setSelectedCountry}/>
                        <div id="section-separator"></div>
                        <div>
                            {unselectedCounties.map((value) => {
                                return (
                                    <>
                                        <Flag selected_country={selectedCountry} flag={value[1].flag} country_name={value[1].country_name} country_id={value[0]} setSelectedCountry={setSelectedCountry}/>
                                    </>
                                )})
                            }
                        </div>
                    </section>
                    <div className="modal__select-button">
                        <Button onClick={changeLanguage} title="Changer de langue"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Flag = (props) => {
    const checked = props.selected_country === props.country_id;
    console.log("1", props.country_id, props.selected_country)

    return (
        <div className="flg-item" id={checked ? "selected" : "empty"}>
            <input type="checkbox" checked={checked} onChange={(e) => {
                props.setSelectedCountry(props.country_id);
                console.log(props.country_id, props.selected_country)
                }}/>
            <div className="flg-item__country">
                <img id="flag" src={props.flag} />
                <label>{props.country_name}</label>
            </div>
        </div>
    );
}

export default SelectLanguage;