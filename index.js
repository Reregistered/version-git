/*
 */

var githash;
var exec = require('child_process').exec;

/**
 * Generate the formatted key given the major, minor and hash versions.
 * @param {number|string} major
 * @param {number|string} minor
 * @param {string} githash
 *
 * @param {string} the version key
 */ 
var _makeKey = function (major, minor, githash) {
  return [major, minor, githash.replace(/\s/g, '')].join('.');
};

/**
 * Generate a version number that encodes the git hash.
 *
 * @param {number|string} major
 * @param {number|string} minor
 * @param {function (error, string)} cb - callback with the result
 * @param {boolean=false} force - force the recomputation of the git hash
 */
exports.version = function(major, minor, cb, force) {
  if (githash && force !== true) {
    cb(null, _makeKey(major, minor, githash));
  } else {
    var child = exec('git rev-parse --short HEAD', {cwd: __dirname},
      function (error, stdout, stderr) {
        cb(error, _makeKey(major, minor, stdout));
      }
    );
  }
};
