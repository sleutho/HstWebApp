var Datastore = require('nedb');
var uuid = require('uuid');
var fs = require('fs');
var cmd = require('./cmd');
var path = require('path');


function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var getDataHome = exports.getDataHome = function() {
    var dataHome = path.join(getUserHome(), 'HstWebApp');
    try {
        fs.mkdirSync(dataHome);
    } finally {
        return dataHome;
    }
}

var db = new Datastore({
        filename: path.join(getDataHome(), 'data.db'),
        autoload: true,
        timestampData: true});

exports.getStudyList = function (username, onList) {
    db.find({ username: username }, function (err, docs) {
        onList(err, docs);
    });
};

exports.createStudy = function (username, onCreate) {
    var id = uuid.v4();
    var studyDir = path.join(getDataHome(), id);
    fs.mkdirSync(studyDir)
    
    var doc = {
        study: id,
        username: username,
        directory: studyDir};

    db.insert(doc, function (err, newDoc) {
        if (err)
            return onCreate(err, newDoc); 
        cmd.execHelperDir(studyDir, ['--init'], 
        function (initErr, data) {
            onCreate(initErr, newDoc);
        });
    });
};

function rmDir(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
};

exports.deleteStudy = function (id, onDelete) {
    db.find({ study: id }, function (err, docs) {
        if (err)
            return onDelete(err, null);

        if (docs.length == 1) {
            var studyData = docs[0];
            var studyDir = studyData.directory;

            db.remove({ study: id }, {}, function (err, numRemoved) {
                //fs.rmdirSync(studyDir);
                rmDir(studyDir);
                onDelete(err, null);
            });
        }
    });
};

exports.getStudyDir = function (id, callback) {
    db.find({ study: id }, function (err, docs) {
        if (err)
            return callback(err, null);
        
        var studyData = docs[0]; 
        var studyDir = studyData.directory;
        
        callback(null, studyDir);
    });
};
