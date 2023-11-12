// ==UserScript==
// @name         ENT PH
// @namespace    https://hellolife2750.github.io/ent_wtf_2/
// @version      0.1
// @description  Customise ton ENT
// @author       Un étudiant talentueux
// @match        https://moodle.u-bordeaux.fr/*
// @icon         https://hellolife2750.github.io/ent_wtf_2/res/img/ENT_PH/logo.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const STATE_CHECK_TICS = 100;
    const CDN_URL = 'https://hellolife2750.github.io/ent_wtf_2/res/img/ENT_PH/';
    const colors = {
        YELLOW: '#ffa31a',
        BLACK: '#0f0f0f',
        WHITE: '#ffffff'
    }

    const MAIN_BAR = '.ubnavbar.iconset a>span i.fa-';
    const HEADER_BAR_BASE = '.navbar.fixed-top .moremenu>ul>li[data-key="';
    const HEADER_BAR_END = '"]>a::before';

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

    // Modifie la couleur de fond d'un élément passé en référence (querySelector)
    const setBackColor = (elementRef, color) => {
        const element = select(elementRef);
        element && (element.style.setProperty('background-color', color, 'important'));
    }

    // Modifie la couleur d'un élément passé en référence (querySelector)
    const setColor = (elementRef, color) => {
        const element = select(elementRef);
        element && (element.style.setProperty('color', color, 'important'));
    }

    // Modifie les couleurs par défaut
    const changeElementsColors = () => {
        setBackColor('body', colors.BLACK);
        setBackColor('.navbar.fixed-top', colors.BLACK);
        setBackColor('.ubnavbar.iconset>div', colors.BLACK);
        setColor('.ubnavbar.iconset>div ', colors.WHITE);

        document.querySelectorAll('body *').forEach(el => {
            el.style.setProperty('background-color', colors.BLACK, 'important');
        })
        document.querySelectorAll('body *').forEach(el => {
            el.style.setProperty('color', colors.WHITE, 'important');
        })

        const beforeElements = document.querySelectorAll('::before');
        beforeElements.forEach(element => {
            element.remove();
        });
    }

    const getStyleForIcon = (theSrc) => `${MAIN_BAR}${theSrc}:before {content: url(${CDN_URL}${theSrc}.png) !important;}`;

    const getStyleForIcon2 = (theSrc) => `${HEADER_BAR_BASE}${theSrc}${HEADER_BAR_END} {content: url(${CDN_URL}${theSrc}.png) !important;}`;

    // Modifie les images et icônes par défaut
    const changeImgs = () => {
        const homeImg = select('nav.navbar.fixed-top .navbar-brand');
        homeImg.style.setProperty('background-image', `url(${CDN_URL}homeButton.png)`, 'important');
        homeImg.style.setProperty('background-repeat', 'no-repeat', 'important');
        homeImg.style.setProperty('background-position', 'center', 'important');
        select("link[rel*='icon']").href = `${CDN_URL}logo.png`;
        select('head title').innerText = 'Moodle PH';

        let styleTag = document.createElement('style');
        const modifiedSrcs = ['suitcase', 'calendar', 'compass', 'download', 'edit', 'envelope', 'play-circle', 'id-card-o'];
        modifiedSrcs.forEach(src => {
            styleTag.innerHTML += getStyleForIcon(src);
        });
        styleTag.innerHTML += getStyleForIcon2('myhome');
        styleTag.innerHTML += getStyleForIcon2('siteadminnode');
        document.head.appendChild(styleTag);
    }

    //Boucle principale où sont appelés les changements désirés
    const checkDocumentState = () => {
        if (document.readyState !== 'complete') { setTimeout(checkDocumentState, STATE_CHECK_TICS); }
        else {

            changeElementsColors();

            changeImgs();
        }
    }
    checkDocumentState();

})();