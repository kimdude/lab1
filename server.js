// Fetching packages
const { Client } = require("pg");
const express = require("express");
require("dotenv").config();

// Creating app
const app = express();
app.set("view engine", "ejs"); //View engine
app.use(express.static("public"));

const bodyParser = require("body-parser"); //Package to read form-data
app.use(bodyParser.urlencoded({extended: true}));


// Connecting to database
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
})

client.connect((error) => {
    if(error) {
        console.log("fel vid anslutning: " + error);
    } else {
        console.log("Ansluten till databasen...");
    }
})


const courseList = [];

//Create routing
app.get("/", async(req, res) => {
    client.query("SELECT * FROM courses;", (error, result) => {
        if(error) {
            console.error(error.message);
        }

        res.render("index", {
            error: "",
            rows: result.rows
        });
    });
});

app.get("/about", async(req, res) => {
    res.render("about");
});

app.get("/addCourse", async(req, res) => {
    res.render("addCourse", {
        errors: [],
        newCourse: "",
        courseCode: "",
        link: "",
        progress: "notSelected"
    });
});

app.post("/addCourse", async(req, res) => {
    
    let newCourse = req.body.course;
    let courseCode = req.body.code;
    let link = req.body.link;
    let progress = req.body.progression;
    let errors = [];
    
    if(newCourse === "") {
         errors.push("kursnamn");

    } 
    
    if(courseCode === "") {
        errors.push("kurskod");

    } 
    
    if(link === "") {
        errors.push("länk till kurssidan");

    } 

    if(progress === "notSelected") {
        errors.push("progression");
    }

    if(errors.length <= 0) {
        client.query("INSERT INTO courses(CourseName, CourseCode, Syllabus, Progression)VALUES($1, $2, $3, $4)", 
        [newCourse, courseCode, link, progress], 
        (error,results) => {
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
app.listen(process.env.PORT, () => {
    console.log("Server started on port:" + process.env.PORT);
});