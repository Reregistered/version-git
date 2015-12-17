/*
 */

var hash;
var exec = require('child_process').exec;
exports.version = function(major, minor, cb) {
  if (hash) {
    cb (null, hash);
  } else {
    var child = exec('git rev-parse --short HEAD', {cwd: __dirname} ,
      function (error, stdout, stderr) {
        hash = [major, minor, stdout.replace(/\s/g, '')].join('.');
        cb(error, hash);
      });
  }
};