var request = require('request');
var fs = require('fs');
var output = "";
var topic = 'javascript';
var key = '7f4c231b1577732d1137264d4a63';
var someurl = 'https://api.meetup.com/2/open_events?&sign=true&photo-host=public&lat=48.836452&topic=' + topic + '&city=Paris&category=34&lon=2.413619&radius=100&page=20&time=,1w&key=' + key;

request(someurl, function (err, res, body) {
    var events = (JSON.parse(body))["results"];
    var day = 86400000;
    var start_date = (new Date()).setHours(0, 0, 0, 0) + 43200000;

    output = output + "<style type='text/css'> body{font-size:16px; font-family:Arial;} h3{display:inline;} div{margin-bottom:10px;}</style>";
    output = output + "<h1 style='text-align:center;'>List of IT events from " + (new Date(start_date)).toDateString() +" to "+ (new Date(start_date+day*7)).toDateString() +"</div>";
    output = output + "<h1 style='text-align:center;'>" + topic + " events ";

    for (var j = 0; j < 7; j++) {
        output = output + " ";
        output = output + "<h3> Date: "+ (new Date(start_date)).toDateString() + "</h3><br><br>";
        for (var i in events) {
            var event_date = new Date((events[i])["time"]);
            if (event_date > start_date && event_date < start_date + day) {
                output = output + "<div><h3> Group name: </h3>" + ((events[i])["group"])["name"] + "</div>";
                output = output + "<div><h3> Event Name: </h3>" + (events[i])["name"] + "</div>" ;
                output = output + "<div><h3> Time: </h3>" + (event_date.toTimeString()).substring(0,5) + "</div>";
                output = output +  "<div><h3> Address: </h3>" + ((events[i])["venue"])["address_1"] + "</div>";
                if ("description" in events[i]) {
                    output = output + "<div><h3> Description: </h3>" + (events[i])["description"] + "</div>";
                }
                output = output + "<div style='height: 75px;'>*   *   *   *   *</div><br>";
            }
        }
        start_date = start_date + day;
    }

    fs.writeFile("events.html", output, function(err) {
        if (err) console.log(err);
    });
});
