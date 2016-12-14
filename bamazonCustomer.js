var mysql = require("mysql");
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('markdown-table');
var chart = require('console.table');

var priceing = [];
var dept = [];
var custID = [];
var itemID = [];
var winner = [];
var numeroID = [];

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

function broken() {
    userInput()
}

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
            numeroID.push(rows[i].id);

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
                // validate: function(values){
                //     console.log(values)
                //     var test = parseInt(numeroID)
                //     console.log(test)
                //             if(values != test){
                //                 console.log("Please Choose from an Item ID on the list")
                //                 userInput()
                //             }
                //             else {
                //                 return true;
                //             }
                //         }
            }
        ]).then(function quantity(answers) {

            var rowData = answers.itemID;
            itemID.push(answers.iemID);

            var quit = "quit";

            if (rowData === quit) {
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
                    var pushOne = rows[i].department_name;
                    var pushThree = rows[i].YeeHaw
                    price = rows[i].price;
                    quantityLeft = rows[i].quantity;
                    var whammy = rows[i].YeeHaw;
                    winner.push(pushThree)
                    dept.push(pushOne)
                    var values = [
                        [numberID, name, department, price, quantityLeft]

                    ];
                    // console.log(winner)
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
                        name: "quantity",
                        // validate: function(values){
                        //     if(values > numberID){
                        //         userinput()
                        //     }
                        // }
                    }
                ]).then(function (answers) {
                    console.log(answers)
                    console.log(answers.quantity)
                    //     console.log(answers.quantity)
                    var infoData = answers.quantity;
                    // console.log(infoData)

                    console.log(infoData)
                    if (infoData > quantityLeft) {
                        console.log("")
                        console.log("")
                        console.log("You must choose less than " + quantityLeft)
                        console.log("")
                        console.log("")
                        userInput();
                    }
                    else {
                         console.log(answers.quantity)
                    //     console.log(answers.quantity)
                    var infoData = answers.quantity;
                        var totalSale = infoData * price;
                        console.log(totalSale)
                        var pushTwo = infoData * price;
                        console.log(pushTwo)
                        priceing.push(pushTwo);
                        console.log(" ");
                        console.log(" ")
                        // console.log(department)
                        poc = parseInt(priceing)
                        console.log(infoData)
                        woc = parseInt(winner)
                        var adding = winner + priceing;
                        var addition = woc  + poc;
                        // console.log(addition)
                        console.log(adding)
                        console.log(adding)
                        // console.log(woc + poc)
                        console.log(rowData)
                        console.log(quantityLeft)
                        console.log(infoData)
                        console.log(quantityLeft - infoData)
                        console.log("Your price is $", totalSale);
                        console.log("");
                        console.log("");
                        console.log("Shop some more!")
                        connection.query('UPDATE products SET ? WHERE ?', [{
                            quantity: quantityLeft - infoData,
                            YeeHaw: addition
                        },
                        {
                            id: rowData
                        }],
                        


                            function (err, result) {

                                console.log("");
                                console.log("");
                                console.log("");
                                console.log("");
                                console.log(err);
                                console.log(result)
                                var adding = 0;
                                
                      
                                updateData()

                            });
                    }
                })
            })
        });
    });
}



function updateData() {

    connection.query('SELECT * FROM department', function (err, rows) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {

            var idPrice = rows[i].product_sales
            var idNumber = rows[i].id;
            var idName = rows[i].product_name;
            var idDepartment = rows[i].department_name;
            custID.push(rows[i].over_head_cost);
            // console.log(idDepartment)
        }

        var won = parseInt(winner);
        var pic = parseInt(priceing)
        console.log(won + pic)
        var together = won + pic;
        console.log(together)
        // var dep = JSON.stringify(dept);
        var cus = parseInt(custID);
        var bus = parseInt(together)
        console.log(dept)
        // console.log(dep);
        console.log(cus - bus);
        console.log(bus - cus)
        // console.log(cus)
        console.log(bus)
        

        connection.query('UPDATE department SET ? WHERE ?', [
            {
                product_sales: bus,
                big_whammy: bus - cus
            },
            {
                department_name: dept[0],
            }

        ],
            function (err, response) {
                console.log(err)
                console.log(response);
   console.log(dept)
priceing.length = 0;
dept.length = 0;
custID.length = 0;
itemID.length = 0;
winner.length = 0;
numeroID.length = 0;

                oneMoreTime()
            });
    })
}
function oneMoreTime(){
    inquirer.prompt([
        {
            name: "pick",
            type: "list",
            message: "Please choose to continue or exit...",
            choices: ["Continue", "Exit"],

        }
    ]).then(function(answers){
        if (answers.pick == "Continue"){
                 userInput()
        }
        else{
            connection.end()
        }
    })
   
}

userInput();