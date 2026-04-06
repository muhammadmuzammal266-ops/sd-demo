const express = require("express");
var app = express();

app.use(express.static("static"));

app.set('view engine', 'pug');
app.set('views', './app/views');

const db = require('./services/db');

const { Student } = require("./models/student");
const { Programme } = require("./models/programme");
const { Module } = require("./models/module");

// ROOT
app.get("/", function(req, res) {
    res.render("index");
});

// STUDENTS LIST (CLICKABLE)
app.get("/all-students-formatted", function(req, res) {
    db.query("SELECT * FROM Students").then(results => {
        res.render('all-students', { data: results });
    });
});

// SINGLE STUDENT (MVC)
app.get("/student-single/:id", async function (req, res) {
    let student = new Student(req.params.id);
    await student.load();
    res.render("student-single", { student: student });
});

// PROGRAMMES LIST (CLICKABLE)
app.get("/programmes", function(req, res) {
    db.query("SELECT * FROM Programmes").then(results => {
        res.render('programmes', { data: results });
    });
});

// SINGLE PROGRAMME (MVC)
app.get("/programme-single/:id", async function (req, res) {
    let programme = new Programme(req.params.id);
    await programme.load();
    res.render("programme-single", { programme: programme });
});

// MODULES LIST (CLICKABLE)
app.get("/modules", function(req, res) {
    db.query("SELECT * FROM Modules").then(results => {
        res.render('modules', { data: results });
    });
});

// SINGLE MODULE (MVC)
app.get("/module-single/:code", async function(req, res) {
    let module = new Module(req.params.code);
    await module.load();
    res.render("module-single", { module: module });
});

// START
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3001/`);
});