require('./style.sass');

 const content = {
    'home': {
        'title': 'PRIVATE MONEY',
        'subtitle': 'A modern way to pay worldwide with the lowest fees'
    },
    'about': {
        'title': 'WHAT IS KLARO?',
        'subtitle': 'Read about our philosophy and vision of future'
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
import animationPlanets from './lottie/planets.json';
import Engine from 'fullpage.js/dist/fullpage';
new Engine('#fullpage', {
    verticalCentered: false,
    slidesNavigation: true,
    fadingEffect: 'slides',
    anchors: Object.keys(content),
    scrollHorizontally: true,
    fixedElements: '#bar',
    recordHistory: false,
    afterRender: function () {
        const planets = document.getElementById("lottie-planets");
        let svgPlanets = Lottie.loadAnimation({
            container: planets,
            loop: true,
            autoplay: true,
            animationData: animationPlanets,
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
        $('#titles .title').text(data.title);
        $('#titles .subtitle').text(data.subtitle);
    }
});