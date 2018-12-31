const express = require('express');
const bodyParser = require('body-parser');
var validate = require('uuid-validate');
const port = process.env.PORT || 3000;
var app = express();
let categoryRoute=require('./route/category');
let bookRoute=require('./route/book');
let authorRoute=require('./route/author')

app.use(bodyParser.json());

app.use("/categories", categoryRoute.route);
app.use("/books", bookRoute.route);
app.use("/authors", authorRoute.route);




app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
module.exports={app};