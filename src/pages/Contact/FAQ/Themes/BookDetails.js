import React, { useState } from "react";

import i18n from "../../../../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const BookDetailsFAQ = () => {
    return (
        <div className="theme-answer">
            <h1>{i18n.t('faq_details_title')}</h1>
            <div className="theme-answer__desc">
                <p>{i18n.t('faq_details_p1')}</p>
                <p>{i18n.t('faq_details_p2')}</p>
                <p>{i18n.t('faq_details_p3')}</p>
            </div>
        </div>
    );
}

export default withTranslation("book_details_faq")(BookDetailsFAQ);