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

//Empty array to store courses from form
const courseList = [];

//Create routing
app.get("/", async(req, res) => {
    //Sql to fetch courses from database
    client.query("SELECT * FROM courses;", (error, result) => {
        if(error) {
            console.error(error.message);
        }

        //Sending courses to index
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
    //Reseting form inputs
    res.render("addCourse", {
        errors: [],
        newCourse: "",
        courseCode: "",
        link: "",
        progress: "notSelected"
    });
});

//Fetching values from form inputs
app.post("/addCourse", async(req, res) => {
    
    //Variables for values
    let newCourse = req.body.course;
    let courseCode = req.body.code;
    let link = req.body.link;
    let progress = req.body.progression;
    let errors = [];
    
    //Adding errors for empty inputs and adding to array
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

    //Adding course values to database if error-array is empty
    if(errors.length <= 0) {
        client.query("INSERT INTO courses(CourseName, CourseCode, Syllabus, Progression)VALUES($1, $2, $3, $4)", 
        [newCourse, courseCode, link, progress], 
        (error,results) => {
            if(error) throw error;
        });

        //Reseting form inputs
        newCourse = "";
        courseCode = "";
        link = "";
        progress = "notSelected";

        //Redirecting to index
        res.redirect("/");

    } else {
        //Sending array of errors if array is not empty
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