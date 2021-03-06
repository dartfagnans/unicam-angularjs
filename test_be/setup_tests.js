var async = require("async");
var dbConfig = require("../config/db.js");
var mongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var student_db;
var STUDENTS_COLLECTION = "students";
var STUDENTS = [
  {
    'name': 'Saverio',
    'imgUrl': 'img/avatar.jpg',
    'surname': 'Tosi',
    'studentID': '0x0311',
    'email': 'example@example.it',
    'phone': '123456789',
    'media': 18,
    'CFU': 20
  },
  {
    'name': 'Lorenzo',
    'imgUrl': 'img/avatar.jpg',
    'surname': 'Pomili',
    'studentID': '0x0311',
    'email': 'example@example.it',
    'phone': '123456789',
    'media': 20,
    'CFU': 25
  },
  {
    'name': 'Antonio',
    'imgUrl': 'img/avatar.jpg',
    'surname': 'Dell\'ava',
    'studentID': '0x0311',
    'email': 'example@example.it',
    'phone': '123456789',
    'media': 22,
    'CFU': 15
  },
  {
    'name': 'Mario',
    'imgUrl': 'img/avatar.jpg',
    'surname': 'Rossi',
    'studentID': '0x0311',
    'email': 'example@example.it',
    'phone': '123456789',
    'media': 24,
    'CFU': 7
  },
  {
    'name': 'Vittorio',
    'imgUrl': 'img/avatar.jpg',
    'surname': 'Verdi',
    'studentID': '0x0311',
    'email': 'example@example.it',
    'phone': '123456789',
    'media': 27,
    'CFU': 0
  }];

function connectDB(callback) {
  mongoClient.connect(dbConfig.url, function (err, db) {
    assert.equal(null, err);
    student_db = db;
    console.log("Connesso al server");
    callback(0);
  });
}

function dropStudentCollection(callback) {
  console.log("dropStudentCollection");
  var student = student_db.collection(STUDENTS_COLLECTION);
  if (undefined != student) {
    student.drop(function (err, reply) {
      console.log('student collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function insertStudentsInStudentCollection(callback) {
  console.log("insertStudentsInStudentCollection");
  var n = 0;
  var student = student_db.collection(STUDENTS_COLLECTION);
  if (undefined != student) {
    STUDENTS.forEach(function (s) {
      student.insertOne(s, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the students collection");
        n++;
        if(n === STUDENTS.length) {
          callback(0);
        }
      });
    })
  } else {
    callback(0);
  }
}

function closeDB(callback) {
  student_db.close();
}

async.series([
  connectDB,
  dropStudentCollection,
  insertStudentsInStudentCollection,
  closeDB]);
