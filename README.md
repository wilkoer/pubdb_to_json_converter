pubdb_to_json_converter (pubdb.js)
=======================

pubdb.js allows you to convert HTML data from the LMU Computer Science publication database to JSON data.

You can find a live example implementation here: http://www.cip.ifi.lmu.de/~schenker/pubdb/
(node server hosted on https://openshift.redhat.com/)

#### pubdb.js 
Javascript library for generating json on client-side

#### converter.js
Proxy server that grabs html from http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all and passes it to client.

#### index.html and main.js 
Example implementation

#### lib/pubdb_module.js (deprecated)
node module for generating json on server-side.
not further developed due to performance issues.. feel free to play with it..!
