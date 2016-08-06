# Common JSON Lookup Tables
Your one-stop shop for common JSON lookup files. Please contribute!

# User Guide
If you just want to use the JSON files, *you do not have to run any code*. Just browse the contents below or look through the [json](json) directory and find what you need. The scripts in this repo are only for generating the JSON lookup files from their source files.

# Contents
+ [states](json/states): Name, FIPS code, two-letter abbreviation, AP abbreviation, Chicago Manual of Style abbreviation

# How to contribute
If you want to add something to this repo--and please do!--then you just need to add two files:
+ A csv file with the source data and a header row, which you place in the `source` directory
+ A schema file that describes the data, where you found it, and which columns you want to generate lookup files for in the `keys` property. For example:
```
{
	"name": "states",
	"description": "States and their abbreviations and FIPS codes",
	"keys": ["fips","abbr_two_letter","name","abbr_ap","abbr_chicago"],
	"sources": [
		"https://www.census.gov/geo/reference/ansi_statetables.html",
		"http://www.apvschicago.com/2011/05/state-abbreviations-use-traditional-or.html"
	]
}
```

Both files should have a unique and identical name that describes the data, like "states" or "counties."

Then just run `node index.js <name>` to generate the JSON lookup files. *All JSON files are generated programmatically.* You should never directly place a file in the `json` directory.
