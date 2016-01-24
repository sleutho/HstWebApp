var execFile = require('child_process').execFile;
var studylist = require('./studylist');
var path = require('path');

function getHstPath() {
    return path.join(studylist.getDataHome(), 'test.bat');
}

function getStudyDir(study, callback) {
    studylist.getStudyDir(study, callback);
}

exports.execHelperDir = function (studyDir, args, callback) {
    execFile(getHstPath(), args, (error, stdout, stderr) => {
        if (error) {
            return callback(error, null);
        }
        callback(
            stderr.length ? stderr.toString() : null, 
            stdout.length ? stdout.toString() : null);
    });
}

exports.execHelperStudy = function (study, args, callback) {
    getStudyDir(study, function (err, studyDir) {
        if (err) {
            return callback(err, null);
        }
        exports.execHelperDir(studyDir, args, callback);
    });
}
