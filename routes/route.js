var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');

var route = {"length": 0};
var browser, page;

(async ()=>{

    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();

    const htmlWrapPath = path.join(path.dirname(__dirname), 'html_wrap');

    await page.goto('file:///' + path.join(htmlWrapPath, 'apiWrap.html'));

})();



router.get('/', function (req, res, next) {

        page.evaluate(

            //Будет выполнено в контексте страницы+
            () => {

                var routeLength;

                document.getElementById('map').innerHTML = "";

                var myMap = new ymaps.Map("map", {
                    center: [55.76, 37.64],
                    zoom: 7
                });

                ymaps.route([
                    'Королёв',
                    { type: 'viaPoint', point: 'Мытищи' },
                    'Химки',
                    { type: 'wayPoint', point: [55.811511, 37.312518] }
                ], {
                    mapStateAutoApply: true
                }).then(function (route) {
                    route.getPaths().options.set({
                        balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                        strokeColor: '0000ffff',
                        opacity: 0.9
                    });

                    //
                    //routeLength = route.getLength();
                    //document.getElementById('outputValue').innerHTML = route.getLength();

                    routeLength =route.getLength();

                    console.log(routeLength);

                    //
                    myMap.geoObjects.add(route);

                    return routeLength;
                });

                return routeLength;

            }
            //Будет выполнено в контексте страницы-
        ).then((routeLengthPromise)=>{
            route['length']= routeLengthPromise;
            res.send(route);
        });
})


module.exports = router;