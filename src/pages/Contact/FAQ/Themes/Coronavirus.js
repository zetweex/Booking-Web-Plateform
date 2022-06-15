import React, { useState } from "react";

import i18n from "../../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const CoronavirusFAQ = () => {
    return (
        <div className="theme-answer">
            <h1>{i18n.t('faq_covid_title')}</h1>
            <div className="theme-answer__desc">
                <p>{i18n.t('faq_covid_p1')}</p>
                <p>{i18n.t('faq_covid_p2')}</p>
                <p>{i18n.t('faq_covid_p3')}</p>
            </div>
        </div>
    );
}

export default withTranslation("coronavirus_faq")(CoronavirusFAQ);