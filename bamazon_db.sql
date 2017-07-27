create database bamazon_db

use bamazon_db

create table Products( 
item_id integer(30) auto_increment not null,
product_name varchar (200) not null,
department_name varchar (200) not null,
price integer (100) not null,
stock_quantity integer (100) not null,
primary key(item_id)
);

insert into Products (product_name, department_name, price, stock_quantity)
values ("Wireless Mouse", "Electronics", 20, 10)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Wireless Keyboard", "Electronics", 25.00, 13)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Headphones", "Electronics", 50.00, 22)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Printer Paper", "Office Supplies", 12.00, 30)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Chair", "Office Furniture", 199.00, 1)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Desk", "Office Furniture", 300.00, 5)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Lamp", "Lighting", 26.00, 6)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Backpack", "School Supplies", 32.00, 14)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Envelopes", "Office Supplies", 8.00, 35)

insert into Products (product_name, department_name, price, stock_quantity)
values ("Pen", "Office Supplies", 2.00, 50)




