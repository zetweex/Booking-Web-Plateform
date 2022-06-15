import React, { useState } from "react";

import i18n from "../../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const CancelFAQ = () => {
    return (
        <div className="theme-answer">
            <h1>{i18n.t('faq_cancel_title')}</h1>
            <div className="theme-answer__desc">
                <p>{i18n.t('faq_cancel_p1')}</p>
            </div>
        </div>
    );
}

export default withTranslation("cancel_faq")(CancelFAQ);