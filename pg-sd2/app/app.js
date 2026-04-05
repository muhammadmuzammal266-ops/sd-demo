// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use PUG
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get DB
const db = require('./services/db');

// ROOT
app.get("/", function(req, res) {
    res.send("Hello world!");
});

// DB TEST
app.get("/db_test", function(req, res) {
    let sql = 'select * from test_table';
    db.query(sql).then(results => {
        res.send(results);
    });
});

// GOODBYE
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// JSON STUDENTS
app.get("/students", async function(req, res) {
    const rows = await db.query("SELECT * FROM Students");
    res.json(rows);
});

// STUDENTS PUG LIST
app.get("/all-students-formatted", function(req, res) {
    let sql = 'select * from Students';
    db.query(sql).then(results => {
        res.render('all-students', { data: results });
    });
});

// SINGLE STUDENT
app.get("/student-single/:id", function(req, res) {
    let id = req.params.id;

    let sql = `
    SELECT Students.name AS student, Programmes.name AS programme
    FROM Students
    JOIN Student_Programme ON Students.id = Student_Programme.id
    JOIN Programmes ON Student_Programme.programme = Programmes.id
    WHERE Students.id = ?`;

    db.query(sql, [id]).then(result => {
        res.render('student-single', { data: result[0] });
    });
});

// PROGRAMMES LIST
app.get("/programmes", function(req, res) {
    db.query("SELECT * FROM Programmes").then(results => {
        res.render('programmes', { data: results });
    });
});

// SINGLE PROGRAMME
app.get("/programme-single/:id", function(req, res) {
    let id = req.params.id;

    let sql = `
    SELECT Modules.name AS module
    FROM Programme_Modules
    JOIN Modules ON Programme_Modules.module = Modules.code
    WHERE Programme_Modules.programme = ?`;

    db.query(sql, [id]).then(results => {
        res.render('programme-single', { data: results, id: id });
    });
});

// MODULES LIST
app.get("/modules", function(req, res) {
    db.query("SELECT * FROM Modules").then(results => {
        res.render('modules', { data: results });
    });
});

// SINGLE MODULE
app.get("/module-single/:code", function(req, res) {
    let code = req.params.code;

    let sql = `
    SELECT Students.name AS student
    FROM Students
    JOIN Student_Programme ON Students.id = Student_Programme.id
    JOIN Programme_Modules ON Student_Programme.programme = Programme_Modules.programme
    WHERE Programme_Modules.module = ?`;

    db.query(sql, [code]).then(results => {
        res.render('module-single', { data: results, code: code });
    });
});

// HELLO
app.get("/hello/:name", function(req, res) {
    res.send("Hello " + req.params.name);
});

// START SERVER
app.listen(3000, function() {
    console.log(`Server running at http://127.0.0.1:3001/`);
});