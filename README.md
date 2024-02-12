# widatech

``` 
npx sequelize-cli model:generate --name product --attributes name:string,image:string,stock:integer,price:integer

npx sequelize-cli model:generate --name invoice --attributes customer:string,salesperson:string,productsold:integer

npx sequelize-cli model:generate --name invoiceproduct --attributes invoiceId:integer,productId:integer
```