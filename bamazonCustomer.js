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
      connection.query("Select item_id from products", function(err, res){
    if (err) throw err;
          
  inquire
    .prompt([
      {
      name: "action",
      type: "input",
      message: "What is the product number of the item you would like to purchase?",
        validate: function(item){
          for(var i = 0; i <res.length; i++){
            if(item == res[i].item_id){
                return true;
            }
        }
        
            return "Please select a correct item_id";
        }
      },
      
            {
      name: "amount",
      type: "input",
      message: "How many would you like?",
        validate: function(input){
            if(input % 1 == 0 && input > 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
         ])
    .then(function(answer) {
      var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = " + answer.action;
            val(answer.action, answer.amount);
          });
      })
        }
      function val (selectId, selectQuantity){
         connection.query("Select stock_quantity from products WHERE item_id = " + selectId, function(err, res){
    if (err) throw err;
      
            if(selectQuantity <= res[0].stock_quantity){
                connection.query ("update products set stock_quantity = stock_quantity - " + selectQuantity, function (err, res){
       if (err) throw err;               
                      }) 
                total(selectId, selectQuantity);
            }
             else{
                 console.log ("Unable to fill the order.");
             }
          })
}
function total(selectedItem, SelectedQuantity){
    connection.query ("Select price from products WHERE item_id = " + selectedItem, function (err, res){
        if (err) throw err;
        var totalCost;
        totalCost = res[0].price * SelectedQuantity;
        console.log(totalCost);
        runSearch();
    })
 }