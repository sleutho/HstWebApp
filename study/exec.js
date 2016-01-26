var execFile = require('child_process').execFile;
var path = require('path');
var studylist = require('./studylist');
var cmd = require('./cmd');

function getStudyDir(study, callback) {
    studylist.getStudyDir(study, callback);
}

module.exports = function (res) {
    return {
        eval: function (study, args) {
            getStudyDir(study, function (err, studyDir) {
                if (err) {
                    return res.status(400).json(err);
                }
                execFile(cmd.getHstPath(), args, {cwd:studyDir},(error, stdout, stderr) => {
                    if (error) {
                        return res.status(400).json(error);
                    }
                    if (stderr.length) {
                        return res.status(400).json(stderr.toString());
                    }
                    res.status(200).json(stdout.length ? stdout.toString() : null);
                });
            });
        }
    };
}
