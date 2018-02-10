
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "UofA@2017_#",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
	readProducts();

});



// To build an array of product IDs to be used for user input validation
var itemIdArr = [];

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function readProducts() {


	console.log("Selecting all products...");
	var query = connection.query("SELECT * FROM products", function(err, res) {

		if (err) throw err;

		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      // To build an array of product IDs to be used for user input validation
      itemIdArr.push(res[i].item_id);
		}
		console.log("-----------------------------------");
		//connection.end();
	});

	// logs the SQL query being run
	console.log(query.sql);
	// after display products, run the start function to prompt the user
	start();

};

// function which prompts the user for what action they should take
function start() {
	// The app will then prompt users with two messages.
	inquirer
    .prompt({
      name: "buyOrQuit",
      type: "rawlist",
      message: "Would you like to [BUY] a product or [QUIT]?",
      choices: ["BUY", "QUIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the buy function or quit
      if (answer.buyOrQuit.toUpperCase() === "BUY") {
        checkProduct();
      }
      else {
        connection.end();
      	
      }
    });
}

// function to handle buying a product
function checkProduct() {
	// The app will prompt users with two messages.
	// The first should ask them the ID of the product they would like to buy.
	// The second message should ask how many units of the product they would like to buy.

	inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "Please enter the ID of the item you would like to buy?",
        validate: function(value) {
          if (itemIdArr.indexOf(parseInt(value)) >= 0) {
            return true;
          }
          console.log("\nInvalid ID. Please try again!");
          return false;
        }
      },
      {
        name: "itemQuantity",
        type: "input",
        message: "How many would you like?",
        validate: function(value) {
          if (parseInt(value) >= 0) {
            return true;
          }
          console.log("\nInvalid quantity. Please try again!");
          return false;
        }
      }
    ])
    .then(function(answer) {
    // when finished prompting, check if we have enough of the product to meet the customer's request.

    var query = "SELECT stock_quantity, price FROM products WHERE ?";
    connection.query(query,
        {
          item_id: answer.itemId
        },
        function(err, res) {
          if (err) throw err;
          var stockQty = 0;
          var itemPrice = 0;
          for (var i = 0; i < res.length; i++) {
            stockQty = stockQty + res[i].stock_quantity;
            itemPrice = itemPrice + res[i].price;
            console.log("Stock Quantity: " + stockQty);
          }

          if (stockQty - answer.itemQuantity >= 0) {
            console.log("ok to buy");
            var newStockQuantity = stockQty - answer.itemQuantity;
            var totalCost = itemPrice * answer.itemQuantity;
            if (newStockQuantity < stockQty) {
              buyProduct(newStockQuantity, answer.itemId, totalCost);
            } else {
              console.log("No quantity selected!");
              start();
            }
          } else {
            console.log("Insufficient stock quantity");
            start();
          }
        }
      );
    });
}

// If store has enough stock.
// update the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function buyProduct(nsq, ii, ttc) {
  var query = "UPDATE PRODUCTS SET ? WHERE ?";
  connection.query(query, [ {stock_quantity: nsq}, { item_id: ii } ], function(err) {
    if (err) throw err;
    console.log("Stock quantity updated successfully to : " + nsq);
    console.log("Total cost of your products : " + ttc);
    start();
  }
  );
};
