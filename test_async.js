var async = require("async");

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 10000);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 1000);
    }
}, function(err, results) {
    console.log(results);
});

console.log('end 666');
//
/*async.series([
        function(callback) {
            // do some stuff ...
            callback(null, 'one');
        },
        function(callback) {
            // do some more stuff ...
            callback(null, 'two');
        }
    ],
// optional callback
    function(err, results) {
        // results is now equal to ['one', 'two']
    });*/
