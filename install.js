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

//Creating table
connection.query("DROP TABLE IF EXISTS Courses;", (error, results) => {
    if(error) throw error;

    console.log("Table Courses dropped");
});
connection.query(`CREATE TABLE Courses (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(40), 
    CourseCode VARCHAR(8),
    Syllabus VARCHAR(90),
    Progression VARCHAR(1))`, (error, results) => {
    if(error) throw error;

    console.log("Table Courses created: " + results);
});