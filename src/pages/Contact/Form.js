import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import ProgressBar from 'react-bootstrap/ProgressBar';

import { IoChevronForward } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import i18n from "../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const FormSC = (props) => {

    const [usrRequest, setUsrRequest] = useState("");
    const [msgSend, setMsgSend] = useState(false);

    const storage = localStorage;

    async function ContactFleepiAssistance() {

        let body_content = {
            firstname: storage.getItem("firstname"),
            lastname: storage.getItem("lastname"),
            message: usrRequest,
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

    const sendRequest = () => {
        setMsgSend(true);
        ContactFleepiAssistance();
    }

    const handleChange = (event) => {
        setUsrRequest(event.target.value);
    }

    return (
        <div className="page-content-wrap">
            <section className="help-center-section fit-height" style={{marginBottom: "300px"}}>
                <div className="help-center__title title">
                    <h1>{i18n.t('contact_form_title')}</h1>
                </div>
                {msgSend === false && <TextArea sendRequest={sendRequest} handleChange={handleChange} />}
                {msgSend && <MessageSent />}
            </section>
        </div>
    );
}

const TextArea = (props) => {
    return (
        <section className="help-center__content">
            <h1>{i18n.t('contact_form_box_title')}</h1>
            <div className="help-center__content-textarea">
                <h2>{i18n.t('contact_form_your_msg')}</h2>
                <textarea rows="3" cols="50" placeholder={i18n.t('contact_form_textarea')} onChange={props.handleChange}></textarea>
            </div>
            <div className="help-center__content-sendmsg">
                <span id="span__mail-title">{i18n.t('contact_form_your_mail')}</span>
                <span id="span__mail">{localStorage.getItem("mail")}</span>
                <Button onClick={props.sendRequest} id="button" title={i18n.t('contact_form_button')}/>
            </div>
        </section>
    );
}

const MessageSent = (props) => {
    let history = useNavigate();

    return (
        <section className="help-center__sentmsg">
            <IoCheckmarkCircleOutline color="#52a82a" size={70}/>
            <h1>{i18n.t('contact_form_msg_sent')}</h1>
            <span>{i18n.t('contact_form_msg_sent_desc')}</span>
            <Button onClick={() => history("/home")} id="button" title={i18n.t('contact_form_msg_sent_btn')} />
        </section>
    );
}

export default withTranslation("form_sc")(FormSC);