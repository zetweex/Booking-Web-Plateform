import React from 'react';
import i18n from "../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

const Footer = () => {

    return (
        <footer className="footer">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
            <div class="container">
                <div class="row">
                    <div class="footer-col">
                        <h4>{i18n.t('footer_compagny')}</h4>
                        <ul>
                            <li><a href="https://fleepi.netlify.app/">{i18n.t('footer_about_us')}</a></li>
                            <li><a href="#">{i18n.t('footer_team')}</a></li>
                            <li><a href="#">{i18n.t('footer_privacy_policy')}</a></li>
                            <li><a href="https://www.youtube.com/watch?v=mxcP0IyFcso">{i18n.t('footer_youtube')}</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>{i18n.t('footer_get_help')}</h4>
                        <ul>
                            <li><a href="#">{i18n.t('footer_faq')}</a></li>
                            <li><a href="#">{i18n.t('footer_contact')}</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>{i18n.t('footer_travel')}</h4>
                        <ul>
                            <li><a href="#">{i18n.t('footer_add_trip')}</a></li>
                            <li><a href="/trips">{i18n.t('footer_my_trip')}</a></li>
                            <li><a href="/me">{i18n.t('footer_my_profil')}</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>{i18n.t('footer_follow_us')}</h4>
                        <div class="social-links">
                            <a href="https://www.facebook.com/Fleepi-112674830572824/"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/FleepiApp?t=6yQx3nfpqXV_tLh6KaZnVg&s=09"><i class="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/fleepiapp/?hl=fr"><i class="fab fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/company/68512273/admin/"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );

};

export default withTranslation('Footer')(Footer);