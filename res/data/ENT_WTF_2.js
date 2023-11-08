// ==UserScript==
// @name         New ENT WTF
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Customise ton ENT
// @author       Un étudiant talentueux
// @match        https://moodle.u-bordeaux.fr/*
// @match        https://idp-ubx.u-bordeaux.fr/*
// @match        https://cas.u-bordeaux.fr/cas/login*
// @match        https://ent.u-bordeaux.fr/uPortal/*
// @icon         https://hellolife2750.github.io/ent_wtf_2/res/img/LogoIUT.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const STATE_CHECK_TICS = 100;
    const SCHOOL_NAME = 'Université de Bordeaux';

    // Sélectionne un élément
    const select = (elem) => document.querySelector(elem);

    // Permet d'aller à l'url spécifiée
    const goTo = (url) => { window.location.href = url; }

    // On arrive sur la page de moodle en étant déconnecté, la procédure de connexion est lancée automatiquement
    const logInToMoodle = () => select('.login.pl-2 a')?.click();

    // On arrive sur la page nous demandant de renseigner notre établissement, il est renseigné automatiquement
    const choseSchool = () => {
        const rememberCheckbox = select('#rememberForSession');
        rememberCheckbox && (rememberCheckbox.checked = true);

        const schoolInput = select('#userIdPSelection_iddtext');
        schoolInput && (schoolInput.value = SCHOOL_NAME) && (select('input[type="submit"]')?.click())
    }

    // Une fois connecté, on arrive sur une page de présentation, rediriger vers l'accueil de moodle.
    const goToMoodleHome = () => {
        (window.location.href.indexOf("https://moodle.u-bordeaux.fr/?redirect=") !== -1) && goTo('https://moodle.u-bordeaux.fr/');
    }

    // Quand on se connecte à l'ENT, être redirigé directement vers Zimbra.
    const goToZimbra = () => {
        const zimbraBtn = select("#uPfname_mailBx a");
        zimbraBtn && goTo(zimbraBtn.href);
    }

    const checkDocumentState = () => {
        if (document.readyState !== 'complete') { setTimeout(checkDocumentState, STATE_CHECK_TICS); }
        else {
            logInToMoodle();

            choseSchool();

            goToMoodleHome();

            goToZimbra();
        }


    }
    checkDocumentState();

})();