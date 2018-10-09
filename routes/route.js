var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
var async = require('async');

var route = {"length": 0};
var outputValue = '0';
var browser, page;

(async ()=>{

    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    const htmlWrapPath = path.join(path.dirname(__dirname), 'html_wrap');
    await page.goto('file:///' + path.join(htmlWrapPath, 'apiWrap.html'));

})();

router.get('/', function (req, res, next) {
    pointParam = JSON.stringify(req.query.waypoints);
    page.evaluate(
        //Будет выполнено в контексте страницы+
        toPoint => {
            document.getElementById('map').innerHTML = "";
            document.getElementById('outputValue').innerHTML = '0';

            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });

            var waypoints = [];
            waypoints[0] = toPoint;
            waypoints[1] = 'Москва';

            ymaps.route(waypoints, {
                mapStateAutoApply: true,
                routingMode : 'auto'
            }).then(function (route) {
                route.getPaths().options.set({
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                    strokeColor: '0000ffff',
                    opacity: 0.9
                });

                document.getElementById('outputValue').innerHTML = route.getLength();
                myMap.geoObjects.add(route);
            });
        }, pointParam
        //Будет выполнено в контексте страницы-
    );

    async.whilst(
        function() { return outputValue === '0';
        },
        function(callback) {

            setTimeout(function() {

                page.evaluate(
                    ()=>{return document.getElementById('outputValue').innerHTML}
                ).then((returnedValue)=>{outputValue = returnedValue;});

                callback(null, 'stub');

            }, 100);
        },
        function (err, stub) {
            route['length']= outputValue;
            res.send(route);
        }
    );

});


module.exports = router;