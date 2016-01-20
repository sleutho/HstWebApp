
// Persistent datastore with automatic loading
var Datastore = require('nedb');
var uuid = require('uuid');

var db = new Datastore({
        filename: 'path/to/datafile',
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
    var doc = {
        study: uuid.v4(),
        today: new Date(),
        directory: 'dir'};

    db.insert(doc, function (err, newDoc) {
        
        //create studydir
        //init studydir
        
        var newStudy = {};
        newStudy.name = newDoc.study;
        onCreate(newStudy);
    });
};

exports.deleteStudy = function (id, onDelete) {
    
    db.remove({ study: id }, {}, function (err, numRemoved) {
        if (numRemoved == 1)
            onDelete("Delete study ( " + id + " )")
        else
            onDelete(err)
    });
};
