require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql.");
    connection.query("DROP DATABASE IF EXISTS ecommerce_db", function (err, result) {
        if (err) throw err;
        console.log("Database dropped if existed.");

        connection.query("CREATE DATABASE ecommerce_db", function (err, result) {
            if(err) throw err;
            console.log("Database created.");
            process.exit(0);
        })
    })
})

