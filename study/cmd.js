var execFile = require('child_process').execFile;
var studylist = require('./studylist');
var path = require('path');

function getHstPath() {
    return path.join(studylist.getDataHome(), 'test.bat');
}

exports.init = function (dir, callback) {
    execFile(getHstPath(), ['init'], (error, stdout, stderr) => {
        if (error) {
            return callback(null);
        }
        callback(stderr.length ? stderr.toJSON() : null);
    });
};
