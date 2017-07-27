var Table = require("console.table");
var prompt = require("prompt");
var inquire = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    
    host: "localhost",
    port: 3306,
    
    user: "root",
    password: "Tr!s07",
    database: "bamazon_db"
    })

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + 
    connection.threadId);
});
    connection.query("Select item_id, product_name, price from products", function(err, res){
    if (err) throw err;
        console.table(res);
      runSearch();      
      
   }); 

function runSearch() {
  inquire
    .prompt([
      {
      name: "action",
      message: "What is the product you would like to purchase?",
   
      },

            ])
};

            
    /*.then(function(answer) {
      var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM bamazon_db WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "item_id: " +
              res[i].id +
              " || product_name: " +
              res[i].product +
              " || department_name: " +
              res[i].department +
              " || price: " +
              res[i].price +
               " || stock_quantity: " +
              res[i].stock             
          );
        }
        runSearch();
      });
    });
      }*/

