var https = require('https');
var fs = require("fs");

var options = {
	host: 'a2fwqsvztqp1jm-ats.iot.us-west-2.amazonaws.com',
	port: 8443,
	path: '/greengrass/discover/thing/Moisture',
	method: 'GET',
	key: fs.readFileSync("./Moisture.private.key"),
	cert: fs.readFileSync("./Moisture.cert.pem"),
	ca: fs.readFileSync("root-CA.crt")
};

var req = https.request(options, function(res) {
	res.on('data', function(d) {
		var jsonObject = JSON.parse(d);
		console.log(jsonObject.GGGroups[0].CAs)
		fs.writeFile("gg-CA.crt", jsonObject.GGGroups[0].CAs[0]);
  	});
});

req.end();

req.on('error',function(e) {
	console.error(e);
});
