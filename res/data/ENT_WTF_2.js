// ==UserScript==
// @name         New ENT WTF
// @namespace    https://hellolife2750.github.io/ent_wtf_2/
// @version      0.1
// @description  Customise ton ENT
// @author       Un étudiant talentueux
// @match        https://moodle.u-bordeaux.fr/*
// @match        https://idp-ubx.u-bordeaux.fr/*
// @match        https://cas.u-bordeaux.fr/cas/login*
// @match        https://ent.u-bordeaux.fr/uPortal/*
// @match        https://notes.iut.u-bordeaux.fr/*
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

    // Renvoie Vrai ou Faux si on est sur un sous-domaine de l'url passée en argument
    const isOnPage = (url) => window.location.href.indexOf(url) !== -1

    // Supprime un élément de la page, à partir de sa référence (querySelector) passée en argument
    const removeElem = (elementRef) => { select(elementRef)?.remove(); }

    // Supprime les éléments de la page contenu dans le tableau de références passé en argument
    const removeAllElem = (elementsRefs) => {
        elementsRefs.forEach(el => {
            removeElem(el);
        });
    }

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

    // Ajuste les éléments à afficher sur la page d'accueil de moodle
    const customMoodleHome = () => {
        if (isOnPage('https://moodle.u-bordeaux.fr/')) {
            removeAllElem(['footer', '#topofscroll .drawer-toggler>.btn', '#nav-notification-popover-container', '[id*="message-drawer-toggle"]', '#topofscroll button.btn']);
            select('body').style.overflow = "hidden";
        }
    }

    // Quand on se connecte à l'ENT, être redirigé directement vers Zimbra.
    const goToZimbra = () => {
        const zimbraBtn = select("#uPfname_mailBx a");
        zimbraBtn && goTo(zimbraBtn.href);
    }

    const showAverageMark = () => {
        const averageSection = select('.releve>section:nth-child(3)');
        console.log(averageSection);
        averageSection && (averageSection.style.display = 'block');

        /*let styles = document.createElement('style');
        styles.innerText = `.releve>section:nth-child(3) {
    display: block;

}`;
        document.body.appendChild(styles);*/

        document.head.insertAdjacentHTML("beforeend", `<style>.releve>section:nth-child(3){display:block !important;}</style>`);

    }

    const checkDocumentState = () => {
        if (document.readyState !== 'complete') { setTimeout(checkDocumentState, STATE_CHECK_TICS); }
        else {
            logInToMoodle();

            choseSchool();

            goToMoodleHome();

            customMoodleHome();

            goToZimbra();

            showAverageMark();
        }
    }
    checkDocumentState();

})();