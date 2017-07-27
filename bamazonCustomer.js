
    //variables requiring npm packages//
var Table = require("console.table");
var prompt = require("prompt");
var inquire = require("inquirer");
var mysql = require("mysql");

    //create connection to DB//
var connection = mysql.createConnection({
    
    host: "localhost",
    port: 3306,
    
    user: "root",
    password: "Tr!s07",
    database: "bamazon_db"
    })

    //with the connection if connected give connection id, or throw error if there is one//
connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + 
    connection.threadId);
});
    //get the id, name and price from the products table//
    connection.query("Select item_id, product_name, price from products", function(err, res){
    if (err) throw err;
      console.table(res);
      runSearch();      
      
   }); 

    //ask the user for the id they want to purchase and verify it exsists//
function runSearch() {
      connection.query("Select item_id from products", function(err, res){
    if (err) throw err;
          
  inquire
    .prompt([
      {
      name: "action",
      type: "input",
      message: "What is the Item ID of the item you would like to purchase?",
        validate: function(item){
          for(var i = 0; i <res.length; i++){
            if(item == res[i].item_id){
                return true;
            }
        }
            // If it doesn't exist throw error//
            return "Please select a correct item_id";
        }
      },
            //Ask how many they want to purchase//
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
          
          //select id, name, price and quantity using the id entered by the user//
    .then(function(answer) {
      var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = " + answer.action;
            val(answer.action, answer.amount);
          });
      })
        }
        //validate the quantity selected.//
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
        //show the total price for all items//
function total(selectedItem, SelectedQuantity){
    connection.query ("Select price from products WHERE item_id = " + selectedItem, function (err, res){
        if (err) throw err;
        var totalCost;
        totalCost = res[0].price * SelectedQuantity;
        console.log(totalCost);
        runSearch();
    })
 }