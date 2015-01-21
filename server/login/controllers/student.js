'use strict';

/**
 * Dependencies
 */
var studentModel = require('../../models/studentModel.js');
var generateUuid = require('../../error_checking/generateUuid.js');

function student() {}

student.prototype.createStudent = function(req, res, next) {
    // http://localhost:3000/student/create POST

    var uuidInput = generateUuid.saveUuid();

    var body = req.body;
    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var emailInput = body.email;
    var campusInput = body.campus;

    studentModel.findOne({
        username: usernameInput
    }, function(err, student) {
        if (student) {
            res.status(400).send('duplicate username');
            next();
        } else {
            studentModel.findOne({
                email: emailInput
            }, function(err, student) {
                if (student) {
                    res.status(400).send('duplicate email');
                    next();
                } else {
                    var newStudent = new studentModel();
                    newStudent.uuid = uuidInput;
                    newStudent.profileType = "student";
                    newStudent.firstName = firstNameInput;
                    newStudent.lastName = lastNameInput;
                    newStudent.username = usernameInput;
                    newStudent.password = passwordInput;
                    newStudent.email = emailInput;
                    newStudent.campus = campusInput;

                    newStudent.save(function(err) {
                        if (err) {
                            res.status(500).send('error saving');
                        } else {
                            res.status(201).send('saved successfully');
                        }
                    });
                    next();
                }
            });
        }
    });
}

student.prototype.retrieveStudent = function(req, res, next) {
    // http://localhost:3000/student/retrieve POST

    var body = req.body;
    var usernameInput = body.username;

    studentModel.findOne({
        username: usernameInput
    }, function(err, student) {
        if (student) {
            res.status(200).send(student);
            next();
        } else {
            res.status(400).send('error');
            next();
        }
    });
}

student.prototype.updateStudent = function(req, res, next) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var emailInput = body.email;
    var campusInput = body.campus;

    studentModel.findOne({
        username: usernameInput
    }, function(err, student) {
        if (!student) {
            res.status(404).send("can't find student");
            next();
        }

        student.firstName = firstNameInput;
        student.lastName = lastNameInput;
        student.username = usernameInput;
        student.password = passwordInput;
        student.email = emailInput;
        student.campus = campusInput;

        student.save(function(err) {
            if (err) {
                res.status(500).send('error saving');
            } else {
                res.status(201).send('saved successfully');
            }
        });
        next();
    });
}

student.prototype.deleteStudent = function(req, res, next) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var usernameInput = body.username;
    var passwordInput = body.password;

    studentModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (!student) {
            res.status(404).send("can't find student");
            next();
        } else if (student.password != passwordInput) {
            res.status(400).send("invalid password");
            next();
        } else if (student.password === passwordInput) {
            student.remove();
            res.send(204);
            next();
        }
    });
}

module.exports = new student();
