import React, { useRef, useState, useEffect } from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { my_fetch } from "../components/RefreshToken";
import datas from '../assets/WordsLearning/words_tolearn.json';

import { IoLanguageSharp } from "react-icons/io5";
import ToolWordsImg from "../assets/Images/tool_words.jpg";

import i18n from "../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';
import axios from 'axios';

const Translator = () => {

    const [sourceText, setSourceText] = useState('');
    const [resultText, setResultText] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('');
    const [languagesList, setLanguagesList] = useState([]);
    const [detectLanguageKey, setdetectedLanguageKey] = useState('');

    const langagesToLearn = {
        "en": "English",
        "es": "Español",
        "de": "Deutsch"
    }
    const [selectedLangageToLearn, setSelectedLangageToLearn] = useState("en");

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: sourceText
        })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language)
        })
        .catch((err) => {
            if (err.response.statuscode == 400) {
                console.log(err);
            } else {
              console.log("Another error occured");
              console.log(err);
            }
        });
    }

    const translateText = async () => {
        setResultText(sourceText)

        getLanguageSource();

        let data = {
            q : sourceText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }

        let result = await fetch("https://libretranslate.de/translate", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .catch((err) => {
            if (err.response.statuscode == 400) {
                console.log(err);
            } else {
              console.log("Another error occured");
              console.log(err);
            }
        });

        let response = await result.json();

        setResultText(response.translatedText);
    }

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
         setLanguagesList(response.data)
        })
        .catch((err) => {
            if (err.response.statuscode == 400) {
                console.log(err);
            } else {
              console.log("Another error occured");
              console.log(err);
            }
        });
 
        getLanguageSource()
     }, [sourceText])

    return (
        <div>
            <Navbar />
            <div className="translator">
                <header className="title-container">
                    <h1>{i18n.t('translate_translator_hd_title')}</h1>
                    <span>{i18n.t('translate_translator_hd_subtitle')}</span>
                </header>
                <div className="translator-wrapper">
                    <div className="translation-zone">
                        <div className="textarea-container">
                            <textarea className="textarea" placeholder={i18n.t('translate_translator_textarea_1')} onChange={(e) => setSourceText(e.target.value)}>
                            </textarea>
                        </div>
                        <div style={{margin: "15px"}}></div>
                        <div className="textarea-container">
                            <header className="header-container">
                                <select className="language-select" onChange={languageKey}>
                                    <option>{i18n.t('translate_translator_select')}</option>
                                    {languagesList.map((language) => {
                                        return (
                                            <option value={language.code}>
                                                {language.name}
                                            </option>
                                        )
                                    })}
                                </select>

                                <button onClick={() => translateText()}>
                                    <IoLanguageSharp size={35}/>
                                    {i18n.t('translate_translator_button')}
                                </button>
                            </header>
                            <textarea readOnly={true} className="textarea" placeholder={i18n.t('translate_translator_textarea_2')} value={resultText}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="word-tl-wrapper">
                    <header className="header-container">
                        <h1>{i18n.t('translate_keywords_hd_title')}</h1>
                        <span>{i18n.t('translate_keywords_hd_subtitle')}</span>
                        <img src={ToolWordsImg} alt="Image représentant un château en haut d'une coline boisée" />
                        <div className="langage_selection">
                            <h2>{i18n.t('translate_keywords_hd_lang_select')}</h2>
                            <select onChange={(e) => setSelectedLangageToLearn(e.target.value)}>
                                {
                                    Object.entries(langagesToLearn)
                                    .map(([key, value]) => <option value={key}>{value}</option>)
                                }
                            </select>
                        </div>
                    </header>
                    <div className="word-tl__vocatable-container">
                        <div className="vocatable">
                            <h2>{i18n.t('translate_keywords_basical_title')}</h2>
                            <table>
                                <tr>
                                    <th className="tdh-left">{i18n.t('translate_keywords_my_langage')}</th>
                                    <th className="tdh-right">{langagesToLearn[selectedLangageToLearn]}</th>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w1')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["hello"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w2')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["how-are-you"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w3')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["well-and-you"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w4')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["speak-french"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w5')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["understand"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w6')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["sorry"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w7')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["bye"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w8')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["welcome"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w9')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["thanks"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w10')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["excuse-me"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w11')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["im-french"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w12')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["my-name-is"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w13')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["no-thanks"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w14')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["yes-no"]}</td>
                                </tr>
                                <tr>
                                    <td className="tdh-left">{i18n.t('translate_keywords_basical_w15')}</td>
                                    <td className="tdh-right">{datas[selectedLangageToLearn]["youre-welcome"]}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withTranslation('translator')(Translator);