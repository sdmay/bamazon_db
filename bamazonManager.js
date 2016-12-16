var mysql = require("mysql");
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('markdown-table');
var chart = require('console.table');
var test = [];
var addItem = [];

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

});

function managerInput() {
    connection.query('SELECT * FROM products', function (err, rows) {
        for (var i = 0; i < rows.length; i++) {

            var idPrice = rows[i].price;
            var idNumber = rows[i].id;
            var idName = rows[i].product_name;
            var idDepartment = rows[i].department_name;
            var idQuantity = rows[i].quantity;
            var idLength = rows.length;

            var values = [
                [idNumber, idName, idDepartment, idPrice, idQuantity]

            ];
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'info',
                message: 'Choose from these menu options...',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
            }
        ]).then(function (answers) {
            console.log(JSON.stringify(answers.info, null, '  '));
            if (answers.info == 'Exit') {
                connection.end();
            }
            if (answers.info == 'View Products for Sale') {
                connection.query('SELECT * FROM products ORDER BY department_name', function (err, rows) {
                    if (err) throw err;
                    for (var i = 0; i < rows.length; i++) {

                        var idPrice = rows[i].price;
                        var idNumber = rows[i].id;
                        var idName = rows[i].product_name;
                        var idDepartment = rows[i].department_name;
                        var idQuantity = rows[i].quantity;
                        var idLength = rows.length;

                        var values = [
                            [idNumber, idName, idDepartment, idPrice, idQuantity]

                        ];
                        console.table(['ID#', 'Item Name', 'Department', 'Price', 'Quantity'], values);
                    }
                    managerInput();
                })
            }
            if (answers.info == 'View Low Inventory') {
                connection.query('SELECT * FROM products WHERE quantity <= 5 ORDER BY quantity', function (err, rows) {
                    for (var i = 0; i < rows.length; i++) {

                        var idPrice = rows[i].price;
                        var idNumber = rows[i].id;
                        var idName = rows[i].product_name;
                        var idDepartment = rows[i].department_name;
                        var idQuantity = rows[i].quantity;
                        var idLength = rows.length;

                        var values = [
                            [idNumber, idName, idDepartment, idPrice, idQuantity]

                        ];
                        console.table(['ID#', 'Item Name', 'Department', 'Price', 'Quantity'], values);
                    }
                    managerInput();
                })

            }

            if (answers.info == 'Add to Inventory') {
                connection.query('SELECT * FROM products ORDER BY quantity', function (err, rows) {

                    for (var i = 0; i < rows.length; i++) {

                        var idPrice = rows[i].price;
                        var idNumber = rows[i].id;
                        var idName = [rows[i].product_name];
                        test.push(rows[i].product_name);
                        var idDepartment = rows[i].department_name;
                        var idQuantity = rows[i].quantity;
                        var idLength = rows.length;

                        var values = [
                            [idNumber, idName, idDepartment, idPrice, idQuantity]

                        ];

                    }
                    // console.log(idQuantity)
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'info',
                            message: 'What Item would you like to add to their quantity? ',
                            choices: test
                        }
                    ]).then(function (choices) {
                        var answer = choices.info;
                        // console.log(choices)
                        // console.log(answer)

                        connection.query('SELECT * FROM products WHERE product_name = ?', answer, function (err, rows) {

                            for (var i = 0; i < rows.length; i++) {
                                // console.log(rows)
                                var idPrice = rows[i].price;
                                var idNumber = rows[i].id;
                                var idName = [rows[i].product_name];
                                var idDepartment = rows[i].department_name;
                                var idQuantity = rows[i].quantity;
                                var idLength = rows.length;

                                var values = [
                                    [idNumber, idName, idDepartment, idPrice, idQuantity]

                                ];
                                // console.log(idQuantity)
                            }


                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'quantity',
                                    message: 'You have ' + idQuantity + " " + answer + "(s), " + " " + "How many more would you like to order?"
                                }

                            ]).then(function (answers) {

                                var add = parseInt(answers.quantity);
                                var words = idQuantity + add;
                                // console.log(words)
                                // console.log(add)
                                // console.log(idQuantity)
                                connection.query('UPDATE products SET ? WHERE ?', [{
                                    quantity: words
                                },
                                {
                                    product_name: answer
                                }],

                                    function outPut(err, result) {
                                        console.log("");
                                        console.log("");
                                        console.log("");
                                        console.log("You have added " + add + ' to ' + answer)
                                        console.log("For a total of " + words);
                                        console.log("");
                                        console.log("");
                                        console.log("");
                                        managerInput()

                                    })

                            })

                        })
                    })
                })

            }

            if (answers.info == 'Add New Product') {
                connection.query('SELECT * FROM department', function (err, rows) {
                    for (var i = 0; i < rows.length; i++) {

                        var idPrice = rows[i].price;
                        var idNumber = rows[i].id;
                        var idName = rows[i].product_name;
                        var idDepartment = rows[i].department_name;
                        addItem.push(rows[i].department_name)
                        var idQuantity = rows[i].quantity;
                        var idLength = rows.length;

                        var values = [
                            [idNumber, idName, idDepartment, idPrice, idQuantity]

                        ];
                    }
                    // console.log(addItem)
                    inquirer.prompt([

                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is the products item name? '
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'What department does this item belong? ',
                            choices: addItem
                        },
                        {
                            type: 'input',
                            name: 'price',
                            message: 'What is the products price? '
                        },
                        {
                            type: 'input',
                            name: 'quantity',
                            message: 'How many are available? '
                        },

                    ]).then(function (answers) {

                        var name = answers.name;
                        var price = answers.price;
                        var dept = answers.department;
                        var quan = answers.quantity;
                        // console.log(dept)

                        connection.query('INSERT INTO products SET ?',
                            [
                                {
                                    product_name: name,
                                    department_name: dept,
                                    price: price,
                                    quantity: quan,
                                }

                            ], function (err, result) {

                                console.log(" ")
                                console.log(" ")
                                console.log(" ")
                                console.log(" ")
                                console.log("Added " + name + " to database")
                                console.log(" ")
                                console.log(" ")
                                managerInput()

                            })

                    })

                })
            }

        })

    })
}

managerInput();
