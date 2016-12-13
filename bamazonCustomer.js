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
    // console.log("connected as id " + connection.threadId);

});

function userInput() {

    connection.query('SELECT * FROM products', function (err, rows) {
        if (err) throw err;

        console.log('Items for Sale');  
              
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

        inquirer.prompt([
            {
                type: "input",
                message: "Give the ID number of the item you would like to purchase(type 'quit' anytime to exit) ",
                name: "itemID",
                //         validate:(function(input){
                //         if (typeof input !== 'number') {
                //             console.log(" ---------Must be a number less than " + idLength)
                //   }

                //         })
            }
        ]).then(function quantity(answers) {
            var rowData = answers.itemID;
            var quit = "quit";

            if(rowData === quit){
                console.log(rowData)
                
                connection.end()
            }
           
            if (rowData > idLength) {
                console.log('Not a valid selection, please pick an item number less than ' + idLength)
                userInput();

            }

            connection.query('SELECT * FROM products WHERE id= ?', rowData, function (err, rows) {
                if (err) throw err;

                for (var i = 0; i < rows.length; i++) {
                numberID = rows[i].id;
                name = rows[i].product_name;
                department = rows[i].department_name;
                price = rows[i].price;
                quantityLeft = rows[i].quantity;
            
                var values = [
                    [numberID, name, department, price, quantityLeft]

                ];
                
                console.log("");
                console.log("");
                console.log("");
                console.log("");
                console.table(['ID#', 'Item Name', 'Department', 'Price', 'Quantity'], values);
                console.log("");
                console.log("");
                console.log("");
                console.log("");                
                }
                inquirer.prompt([
                    {
                        type: "input",
                        message: "How many " + name + "(s)" + " would you like to purchase? ",
                        name: "quantity"
                    }
                ]).then(function (answers) {
                    
                    var infoData = answers.quantity;

                    if (infoData > quantityLeft) {
                        console.log("")
                        console.log("")
                        console.log("You must choose less than " + quantityLeft)
                        console.log("")
                        console.log("")
                        userInput();
                    }
                    else {

                        console.log("");
                        console.log("")
                        console.log("Your price is $", infoData * price);
                        console.log("");
                        console.log("");
                        console.log("Shop some more!")
                        connection.query('UPDATE products SET ? WHERE ?', [{
                            quantity: quantityLeft - infoData
                        },
                        {
                            id: rowData
                        }],

                            function outPut(err, result) {
                            
                                console.log("");
                                console.log("");
                                console.log("");
                                console.log("");
                                userInput();
                            });
                    }
                })
            })
        });
    });  
}

userInput()
