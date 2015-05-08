/**
 * loopback automigrate all build-in models tables
 *
 * run `node automigrate.js´
 *
 */

var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

// count tables so we can disconnect when all is finished.
var count;

startAutomigrate('db');

function startAutomigrate(db) {
  console.log('Environment: '+process.env.NODE_ENV);
  // loopback build-in tables.
  var buildinTables = ['User','AccessToken','ACL','RoleMapping','Role'];
  // user define tables.
  var customTables = ['Device'];
  // merged tables
  var tables = buildinTables.concat(customTables);
  // count tables to create.
  count = tables.length;
  // select datasources
  var ds = app.dataSources[db];
  // create all table in array.
  for (var table in tables) {
    console.log('Creating '+tables[table]);
    automigrate(ds, tables[table]);
  }
}

// disconnect when all tables has been created.
function disconnect(ds) {
  count--;
  if (count === 0) {
    setTimeout(function() {
      console.log('Automigrate Done!');
      ds.disconnect();
    },1000);
  }
}

// run automigrate of all tables in array.
function automigrate(ds, table) {
  ds.automigrate(table, function(err) {
    if (!err) {
      console.log('Table '+table+' was created!');
    } else {
      console.log('Table' +table+' failed to create!');
    }
    disconnect(ds);
  });
}
