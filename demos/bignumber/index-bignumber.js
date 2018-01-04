var express = require('express');
var app = express();
var http = require('http').Server(app);
var base_instance = require('./lib/jiff-server').make_jiff(http, { logs: true });
var jiff_instance = require('./modules/jiff-server-bignumber').make_jiff(base_instance);

// Define a computation with id '1' with a maximum of 3 participants
jiff_instance.totalparty_map['1'] = 3;

jiff_instance.compute('1', function(computation_instance) {
  // Perform server side computation
  console.log("HELLO");
});

// Server static files
app.use("/apps", express.static("apps"));
app.use("/lib", express.static("lib"));
app.use("/modules", express.static("modules"));
app.use("/tests", express.static("tests/positive"));
app.use("/bignumber.js", express.static("node_modules/bignumber.js"));
http.listen(3000, function() {
  console.log('listening on *:3000');
});
