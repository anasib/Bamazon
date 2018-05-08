const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log("Failed to connect");

    } else {
        console.log("Connection successfull");
    }
    createTable();
});

var createTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {            
            console.log(res[i].item_id + " | " + res[i].product_name + " | " +
                res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);
    })
}

var promptCustomer = function (res) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What would you like to buy?'
    }]).then(function (answer) {

        console.log("The customer would like to buy: " + answer.choice);

        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: 'input',
                    name: 'quant',
                    message: 'How many would you like to buy?',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    var remainingStock = res[id].stock_quantity - answer.quant;
                    if (remainingStock > 0) {
                        connection.query("UPDATE products SET stock_quantity='" +
                            remainingStock + "' WHERE product_name='" +
                            product + "'",
                            function (err, res2) {
                                console.log("Product Bought!");
                                createTable();
                            })
                    } else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i == res.length && correct == false) {
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    })
}