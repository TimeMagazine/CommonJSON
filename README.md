# Common JSON Lookup Tables
Your one-stop shop for common JSON lookup files. Please contribute!

# User Guide
If you just want to use the JSON files, *you do not have to run any code*. Just browse the contents below or look through the [json](json) directory and find what you need. The scripts in this repo are only for generating the JSON lookup files from their source files.

# Contents
+ [states](json/states): Name, FIPS code, two-letter abbreviation, AP abbreviation, Chicago Manual of Style abbreviation
+ [counties](json/counties): Name, FIPS code, state, state abbreviation, name with state, name with state abbreviation, type

# How to contribute
If you want to add something to this repo--and please do!--then you just need to add two files:
+ The raw file unmodified from the source, which you place in the `raw` directory
+ A csv file with the source data and a header row, which you place in the `csv` directory. This may require running some transformations. If so, place that script in the `scripts` directory.
+ A schema file that describes the data, where you found it, and which columns you want to generate lookup files for in the `keys` property. For example:
```
{
	"name": "counties",
	"description": "Counties and their states and FIPS codes",
	"keys": ["fips","name_st","name_state"],
	"sources": [
		"https://www.census.gov/geo/reference/codes/cou.html"
	],
	"script": "scripts/counties.js"
}
```

Both files should have a unique and identical name that describes the data, like "states" or "counties."

Then just run `npm install` (once) and `node index.js <name>` to generate the JSON lookup files. *All JSON files are generated programmatically.* You should never directly place a file in the `json` directory.

All suggestions for additions welcome: wilson@mechanicalscribe.com.

## Contributors
+ Chris Wilson (@wilson428)
