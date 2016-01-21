
// Persistent datastore with automatic loading
var Datastore = require('nedb');
var uuid = require('uuid');
var fs = require('fs');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getDataHome() {
    var dataHome = getUserHome() + '/HstWebApp';
    try {
        fs.mkdirSync(dataHome);
    } finally {
        return dataHome;
    }
}

var db = new Datastore({
        filename: getDataHome() + '/data.db',
        autoload: true,
        timestampData: true});

exports.getStudyList = function (onList) {
    db.find({}, function (err, docs) {
        
        var studyArray = [];
        
        for (var index = 0; index < docs.length; index++) {
            var doc = docs[index];
            studyArray.push(doc.study);
        }
        
        var studyList = {'studies': studyArray};
        
        onList(studyList);
    });
};

exports.createStudy = function (onCreate) {
    var id = uuid.v4();
    var studyDir = getDataHome() + '/' + id;
    fs.mkdirSync(studyDir)
    
    var doc = {
        study: id,
        today: new Date(),
        directory: studyDir};

    db.insert(doc, function (err, newDoc) {
        
        //init studydir
        
        var newStudy = {};
        newStudy.name = newDoc.study;
        onCreate(newStudy);
    });
};

exports.deleteStudy = function (id, onDelete) {
    
    db.find({ study: id }, function (err, docs) {
        var studyData = docs[0]; 
        var studyDir = studyData.directory;
        
        db.remove({ study: id }, {}, function (err, numRemoved) {
            
            fs.rmdirSync(studyDir);
            if (numRemoved == 1)
                onDelete("Delete study ( " + id + " )")
            else
                onDelete(err)
        });
    });
};
