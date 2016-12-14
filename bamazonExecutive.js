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
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log(connection.threadId)

});

function execInput() {
    inquirer.prompt([
        {
            name: 'start',
            type: 'list',
            message: "Please choose from these options...",
            choices: ['View Product Sales by Department', 'Create New Department', 'Exit']
        }
    ]).then(function (answers) {

        if (answers.start == 'View Product Sales by Department') {
            connection.query('SELECT * FROM department ',
                function (err, results) {
                    for (var i = 0; i < results.length; i++) {

                        var whammy = results[i].big_whammy;
                        var department = results[i].department_name;
                        var product_sales = results[i].product_sales;
                        var overHeadCost = results[i].over_head_cost;

                        var values = [
                            [department, overHeadCost, product_sales, whammy]
                        ];

                        console.table(['Department', "Over Head Cost", "Product Sales", "Whammy"], values)
                    }
                    execInput()
                })
        }

        if (answers.start == 'Create New Department') {
            inquirer.prompt([
                {
                    name: "deptName",
                    type: 'input',
                    message: "What is the name of the new department? "
                },
                {
                    name: "overHead",
                    type: 'input',
                    message: "What will be the over head cost? "
                }
            ]).then(function (answers) {
                var deptName = answers.deptName;
                var overHead = answers.overHead;

                connection.query('INSERT INTO department SET ?', [{
                    department_name: deptName,
                    over_head_costs: overHead
                }

                ],
                    function (err, results) {
                        
                        console.log(" ");
                        console.log(" ");
                        console.log(deptName + " added to the database successfully.");
                        console.log(" ");
                        console.log(" ");
                        execInput()
                    })
            })


        }
        if (answers.start == 'Exit') (
            connection.end()
        )
    })

}
execInput()