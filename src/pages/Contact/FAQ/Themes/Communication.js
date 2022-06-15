import React, { useState } from "react";

import i18n from "../../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const CommunicationFAQ = () => {
    return (
        <div className="theme-answer">
            <h1>{i18n.t('faq_com_title')}</h1>
            <div className="theme-answer__desc">
                <p>{i18n.t('faq_com_p1')}<a href="/contact">{i18n.t('faq_com_p1_link')}</a></p>
                <p>{i18n.t('faq_com_p2')}</p>
            </div>
        </div>
    );
}

export default withTranslation("communication_faq")(CommunicationFAQ);