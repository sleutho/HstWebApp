var execFile = require('child_process').execFile;
var path = require('path');
var studylist = require('./studylist');

exports.getHstPath = function () {
    //return path.join(studylist.getDataHome(), 'test.bat');
    return "j:/Software/HstFbEuclid-04_tr_lap352/hst/bin/win64d/hstbatch.exe"
}

exports.execHelperDir = function (studyDir, args, callback) {
    execFile(exports.getHstPath(), args, { cwd: studyDir }, (error, stdout, stderr) => {
        if (error) {
            console.log("EXEC Err" + error);
            return callback(error, null);
        }
        if (stderr.length) {
            console.log("EXEC Err" + stderr.toString());
        }
        console.log("EXEC Dir " + stdout.length ? stdout.toString() : null);
        callback(
            stderr.length ? stderr.toString() : null,
            stdout.length ? stdout.toString() : null);
    });
}
