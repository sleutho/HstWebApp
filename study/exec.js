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
                execFile(cmd.getHstPath(), args, {cwd:studyDir} ,(error, stdout, stderr) => {
                    if (error) {
                        console.log("EXEC Err" + error);
                        return res.status(400).json(error);
                    }
                    if (stderr.length) {
                        console.log("EXEC Err" + stderr.toString());
                        return res.status(400).json(stderr.toString());
                    }
                    console.log("EXEC " + stdout.length ? stdout.toString() : null);
                    res.status(stdout.length ? 200 : 204).send(stdout.length ? stdout.toString() : null);
                });
            });
        }
    };
}
