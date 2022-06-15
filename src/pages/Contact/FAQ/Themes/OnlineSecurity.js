import React, { useState } from "react";

import i18n from "../../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const OnlineSecurityFAQ = () => {
    return (
        <div className="theme-answer">
            <h1>{i18n.t('faq_security_title')}</h1>
            <div className="theme-answer__desc">
                <p>{i18n.t('faq_security_p1')}</p>
                <p>{i18n.t('faq_security_p2')}</p>
                <p>{i18n.t('faq_security_p3')}</p>
                <p>{i18n.t('faq_security_p4')}</p>
                <p>{i18n.t('faq_security_p5')}</p>
            </div>
        </div>
    );
}

export default withTranslation('online_security_faq')(OnlineSecurityFAQ);