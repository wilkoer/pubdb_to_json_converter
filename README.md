pubdb_to_json_converter
=======================

Converts HTML data from LMU Computer Science publication database to json

#### lib/pubdb_module.js 
node module for generating json on server-side

#### pubdb.js 
Javascript library for generating json on client-side

#### converter.js
Proxy server that pulls html from http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all and passes it to client, either as plain text/html or as json.

#### index.html and main.js 
Example implementation
