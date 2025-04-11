// Fetching postgre package
const { Client } = require("pg");

// Fetching env-file
require("dotenv").config();

// Connect to database
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

// Creating table with sql
client.query(`
    DROP TABLE IF EXISTS Courses;
    CREATE TABLE Courses (
        PostID SERIAL PRIMARY KEY,
        CourseName VARCHAR(60), 
        CourseCode VARCHAR(8),
        Syllabus VARCHAR(90),
        Progression VARCHAR(1))
`);