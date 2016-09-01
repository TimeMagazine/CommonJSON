var fs = require("fs");
var csv = require("fast-csv");
var state_abbrs = require("../json/states/abbr_two_letter.json");

var inStream = fs.createReadStream("../raw/national_county.txt");
var outStream = fs.createWriteStream("../csv/counties.csv");
var csvOutStream = csv.createWriteStream({headers: ["fips", "name", "st", "state", "st_fips","name_st","name_state","type"]});

csvOutStream.pipe(outStream);

var csvInStream = csv({
		headers: ["st","st_fips","county_fips","name","type"]
	})
    .on("data", function(county){
    	county.fips = county.st_fips + county.county_fips;
    	delete county.county_fips;
    	county.state = state_abbrs[county.st].name;
    	county.name_st = county.name + ", " + county.st;
    	county.name_state = county.name + ", " + county.state;
    	csvOutStream.write(county);
    	console.log(county);
    })
    .on("end", function(){
    	console.log("Finished writing counties.csv");
        csvOutStream.end();
    });

inStream.pipe(csvInStream);

