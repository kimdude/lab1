//Creating app
const express = require("express");
const bodyParser = require("body-parser"); //Package to read form-data
const app = express();
const port = 3000; //Choosing port

app.set("view engine", "ejs"); //View engine
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const courseList = [];

//Create routing
app.get("/", (req, res) => {
    connection.query("SELECT * FROM courses;", (error, rows) => {
        if(error) {
            console.error(error.message);
        }

        res.render("index", {
            error: "",
            rows: rows
        });
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/addCourse", (req, res) => {
    res.render("addCourse", {
        errors: [],
        newCourse: "",
        courseCode: "",
        link: "",
        progress: "notSelected"
    });
});

app.post("/addCourse", (req, res) => {
    
    let newCourse = req.body.course;
    let courseCode = req.body.code;
    let link = req.body.link;
    let progress = req.body.progression;
    let errors = [];
    
    if(newCourse === "") {
         errors.push("kursnamn.");

    } 
    
    if(courseCode === "") {
        errors.push("kurskod.");

    } 
    
    if(link === "") {
        errors.push("länk till kurssidan.");

    } 

    if(progress === "notSelected") {
        errors.push("progression.");
    }

    console.log(progress)

    if(errors.length <= 0) {
        connection.query("INSERT INTO courses(CourseName, CourseCode, Syllabus, Progression)VALUES(?, ?, ?, ?)", [newCourse, courseCode, link, progress], (error,results) => {
            if(error) throw error;
        });

        newCourse = "";
        courseCode = "";
        link = "";
        progress = "notSelected";

        res.redirect("/");
    } else {
        res.render("addCourse", {
            errors: errors,
            newCourse: newCourse,
            courseCode: courseCode,
            link: link,
            progress: progress
        });
    }
});

//Starting server
app.listen(port, () => {
    console.log("Server started on port:" + port);
});

//Fetching mysql package
const mysql = require("mysql");

//Connecting to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "courses"
});

//Console logging error och connection
connection.connect((error) => {
    if(error) {
        console.log("Connection failed: " + error);
        return;
    }

    console.log("Connected to MySQL!");
});