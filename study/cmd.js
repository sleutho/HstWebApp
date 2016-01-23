var execFile = require('child_process').execFile;
var studylist = require('./studylist');
var path = require('path');

function getHstPath() {
    return path.join(studylist.getDataHome(), 'test.bat');
}

function getStudyDir(study, callback) {
    studylist.getStudyDir(study, callback);
}

function execHelperDir(studyDir, args, callback) {
    execFile(getHstPath(), args, (error, stdout, stderr) => {
        if (error) {
            return callback(error, null);
        }
        callback(
            stderr.length ? stderr.toString() : null, 
            stdout.length ? stdout.toString() : null);
    });
}

function execHelperStudy(study, args, callback) {
    getStudyDir(study, function (err, studyDir) {
        if (err) {
            return callback(err, null);
        }
        execHelperDir(studyDir, args, callback);
    });
}

exports.init = function (dir, callback) {
    execHelperDir(dir, ['init'], callback);
};

exports.getStudy = function (study, callback) {
    execHelperStudy(study, ['get', 'study'], callback);
};

exports.setStudy = function (study, attr, value, callback) {
    execHelperStudy(study, ['change', 'study', attr, value], callback);
};

exports.getVariables = function (study, callback) {
    execHelperStudy(study, ['get', 'variable'], callback);
};

exports.getVariable = function (study, variable, callback) {
    execHelperStudy(study, ['get', 'variable', variable], callback);
};

exports.addVariable = function (study, callback) {
    execHelperStudy(study, ['add', 'variable'], callback);
};

exports.setVariable = function (study, variable, attr, value, callback) {
    execHelperStudy(study, ['change', variable, attr, value], callback);
};

exports.removeVariable = function (study, variable, callback) {
    execHelperStudy(study, ['remove', 'variable', variable], callback);
};
