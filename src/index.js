import 'bulma';
import './style.sass';

const content = {
    'home': {
        'title': 'PRIVATE MONEY',
        'subtitle': 'A modern way to pay worldwide with the lowest fees'
    },
    'about': {
        'title': 'WHAT IS KLARO?',
        'subtitle': 'A CryptoNote based cryptocurrency with the Sun in mind'
    },
    'download': {
        'title': 'QUICK START',
        'subtitle': 'All you need to start using KLARO'
    },
    'contact': {
        'title': 'STAY CONNECT',
        'subtitle': 'Join our community on any platform you like'
    },
};

import $ from 'jquery';
import Lottie from 'lottie-web';
import Engine from '../node_modules/fullpage.js/dist/fullpage';
new Engine('#fullpage', {
    verticalCentered: false,
    anchors: Object.keys(content),
    scrollHorizontally: true,
    fixedElements: '#bar',
    afterRender: function () {
        var planets = document.getElementById("lottie-planets");
        var svgPlanets = Lottie.loadAnimation({
            container: planets,
            loop: true,
            autoplay: true,
            path: 'https://assets8.lottiefiles.com/private_files/lf30_aaO2Wk.json',
            rendererSettings: {
                progressiveLoad: true,
                preserveAspectRatio: 'xMidYMid slice',
                filterSize: {
                    width: '200%',
                    height: '200%',
                    x: '-50%',
                    y: '-50%',
                }
            }
        });
    },
    onLeave: function (origin, destination, direction) {
        let data = content[destination.anchor];
        // $(destination.item).find('.hero-head').css({
        //     height: '100px'
        // });
        $('#titles .title').text(data.title);
        $('#titles .subtitle').text(data.subtitle);
        console.log(destination.item);
    }
});
