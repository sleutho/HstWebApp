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

exports.getStudyList = function (onList) {
    db.find({}, function (err, docs) {
        onList(err, docs);
    });
};

exports.createStudy = function (onCreate) {
    var id = uuid.v4();
    var studyDir = path.join(getDataHome(), id);
    fs.mkdirSync(studyDir)
    
    var doc = {
        study: id,
        directory: studyDir};

    db.insert(doc, function (err, newDoc) {
        if (err)
            return onCreate(err, newDoc); 
        cmd.execHelperDir(studyDir, ['init'], 
        function (initErr, data) {
            onCreate(initErr, newDoc);
        });
    });
};

exports.deleteStudy = function (id, onDelete) {
    db.find({ study: id }, function (err, docs) {
        if (err)
            return onDelete(err, null);
        
        var studyData = docs[0]; 
        var studyDir = studyData.directory;
        
        db.remove({ study: id }, {}, function (err, numRemoved) {
            fs.rmdirSync(studyDir);
            onDelete(err, null);
        });
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
