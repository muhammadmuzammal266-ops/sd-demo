const express = require("express");
var app = express();

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './app/views');

const db = require('./services/db');

const { Student } = require("./models/student");
const programmes = require("./models/programmes");

// ROOT
app.get("/", function(req, res) {
    res.render("index");
});

// ALL STUDENTS
app.get("/all-students-formatted", function(req, res) {
    db.query("SELECT * FROM Students").then(results => {
        res.render('all-students', { data: results });
    });
});

// SINGLE STUDENT (MAIN PAGE)
app.get("/student-single/:id", async function (req, res) {
    let student = new Student(req.params.id);

    await student.getStudentDetails();
    await student.getStudentProgramme();
    await student.getStudentModules();

    let allProgrammes = await programmes.getAllProgrammes();

    res.render("student-single", {
        student: student,
        programmes: allProgrammes
    });
});

// ADD NOTE
app.post('/add-note', async function (req, res) {
    let params = req.body;
    let student = new Student(params.id);

    await student.addStudentNote(params.note);

    res.redirect('/student-single/' + params.id);
});

// UPDATE PROGRAMME
app.post('/allocate-programme', async function (req, res) {
    let params = req.body;
    let student = new Student(params.id);

    await student.updateStudentProgramme(params.programme);

    res.redirect('/student-single/' + params.id);
});

// START
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3001/`);
});