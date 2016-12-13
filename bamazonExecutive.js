var mysql = require("mysql");
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('markdown-table');
var chart = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "dali0328",
    database: "bamazonExecutive_db"
});

connection.connect(function (err) {
    if (err) throw err;

});