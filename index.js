var fs = require("fs");
var mkdirp = require("mkdirp");
var csv = require("fast-csv");
var args = require('minimist')(process.argv.slice(2));

if (!args._[0]) {
	console.log("Please pass the name of the key of the file you want to generate.");
	return;
}

var key = args._[0];

// make sure we have the files we need
if (!fs.existsSync(__dirname + "/schema/" + key + ".json")) {
	console.log("I couldn't find", key + ".json", "in the schema directory. (See README).")
	return;
}

if (!fs.existsSync(__dirname + "/source/" + key + ".csv")) {
	console.log("I couldn't find", key + ".csv", "in the source directory. (See README).")
	return;
}

var schema = require(__dirname + "/schema/" + key + ".json");

// create the json directory if need be
mkdirp(__dirname + "/json/" + key, function(err) {
	if (err) {
		console.error("Error creating the folder in the json directory");
		console.error(err);
		return;
	}

	// read the csv
	var data = [];

	var stream = fs.createReadStream(__dirname + "/source/" + key + ".csv");

	var csvStream = csv({ headers: true })
	    .on("data", function(datum){
	    	data.push(datum);
	    })
	    .on("end", function(){
	    	if (!schema.hasOwnProperty("keys")) {
	    		schema.keys = Object.keys(data[0]);
	    		console.log("You should define which keys you want as lookup items in the schema. Defaulting to all of them.");
	    	}
	    	schema.keys.forEach(function(property) {
	    		var json = {};
	    		data.forEach(function(datum) {
	    			json[datum[property]] = datum;
	    		});
	    		fs.writeFileSync(__dirname + "/json/" + key + "/" + property.toLowerCase().replace(/\s+/g, "_") + ".json", JSON.stringify(json, null, 2));
	    		console.log("Wrote", __dirname + "/json/" + key + "/" + property.toLowerCase().replace(/\s+/g, "_") + ".json");
	    	});
	    });

	stream.pipe(csvStream);
});



