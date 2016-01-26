var execFile = require('child_process').execFile;
var path = require('path');
var studylist = require('./studylist');

exports.getHstPath = function () {
    return path.join(studylist.getDataHome(), 'test.bat');
}

exports.execHelperDir = function (studyDir, args, callback) {
    execFile(exports.getHstPath(), args, {cwd:studyDir}, (error, stdout, stderr) => {
        if (error) {
            return callback(error, null);
        }
        callback(
            stderr.length ? stderr.toString() : null,
            stdout.length ? stdout.toString() : null);
    });
}
