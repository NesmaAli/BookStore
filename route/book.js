const express = require('express');
var validate = require('uuid-validate');

var route = express.Router();
const port = process.env.PORT || 3000;
var {
    getAll,
    getBook,
    editBook,
    removeBook,
    addBook,
    validateBook
} = require('../db-Query/book')
var { getcategory } = require('../db-Query/category');
var { getAuthor } = require('../db-Query/auther');
let response = require('../errorObj');
var logger = require("../loggerFile")
const moment = require('moment');





route.post('/', (req, res) => {

    try {
        const all = getAll(req.body.options);
        if (all.length == 0) {
            response = {
                status: 200,
                message: "no data"
            }
            res.send(response);
        }
        response = {
            status: 200,
            message: all
        }
        res.send(response);
    } catch (error) {
        response = {
            status: 404,
            message: error
        }
        logger.log({
            level: 'error',
            message: error,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(404).send(response);
    }




});

route.get('/:id', (req, res) => {
    var id = req.params.id;


    if (!id) {
        return res.status(404).send();
    }
    if (!validate(id)) {
        console.log(validate(id));
        response = {
            status: 400,
            message: 'id not valid'
        }
        logger.log({
            level: 'error',
            message: 'id not valid',
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        res.status(400).send(response);
    }
    try {
        var book = getBook(id);
        if (book == 'The book with the given ID was not found.') {
            response = {
                status: 200,
                message: "no data with this id"
            }
            logger.log({
                level: 'info',
                message: 'The book with the given ID was not found.',
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.send(response);
        }
        response = {
            status: 200,
            message: book
        }
        res.send(response);
    } catch (error) {
        response = {
            status: 404,
            message: error
        }
        logger.log({
            level: 'error',
            message: error,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(404).send(response);

    }



});

route.delete('/book/:title', (req, res) => {
    var title = req.params.title;


    try {
        if (!title) {
            response = { status: 404, message: 'must insert title' }

            return res.status(404).send(response);


        }
        var result = removeBook(title)
        if (result == true) {
            response = { status: 200, message: "book is deleted sucsessfuly" };
            return res.status(200).send(response);


        }

        if (result == 'no book with this name') {
            response = { status: 200, message: "no book with this name" };
            logger.log({
                level: 'info',
                message: "no book with this name",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(200).send(response);

        } else {
            response = { status: 404, message: "book deleted is failed" };
            logger.log({
                level: 'error',
                message: "book deleted is failed",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(400).send(response);
        }


    } catch (error) {
        response = { status: 400, message: "book deleted is failed" };
        logger.log({
            level: 'error',
            message: error,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }




});


route.post('/addBooks', (req, res) => {
    var book = req.body.book;
    const {
        error
    } = validateBook(book);
    if (error) {
        response = { status: 400, Response: error.details, message: "validation error" };
        logger.log({
            level: 'error',
            message: error.details,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });

        return res.status(400).send(response);

    }
    var checkCategory = getcategory(book.category);
    if (checkCategory == 'The category with the given ID was not found.') {
        response = { status: 400, message: "you must add exist category" };
        logger.log({
            level: 'error',
            message: "you must add exist category",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);


    }
    var checkAuther = getAuthor(book.author);
    if (checkAuther == 'The author with the given ID was not found.') {
        response = { status: 400, message: "you must add exist author" };
        logger.log({
            level: 'error',
            message: "you must add exist author",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);


    }
    returnedBook = addBook(book);
    if (returnedBook == "exist book with the same name it's duplicate") {
        response = { status: 200, message: "exist book with the same name it's duplicate" };
        logger.log({
            level: 'info',
            message: "exist book with the same name it's duplicate",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(200).send(response);


    }


    if (!returnedBook) {
        response = { status: 400, message: "book added is failed " };
        logger.log({
            level: 'error',
            message: "book added is failed ",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    if (returnedBook) {

        response = { status: 200, message: " book is added" };

        return res.status(200).send(response);

    }

});

route.patch('/:id', (req, res) => {
    var id = req.params.id;

    if (!validate(id)) {
        response = { status: 400, message: 'id not valid' };
        logger.log({
            level: 'error',
            message: "id not valid",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    if (!id) {
        response = { status: 400, message: 'must insert id' };

        return res.status(400).send(response);

    }
    var body = req.body;

    const {
        error
    } = validateBook(body);
    if (error) {
        response = { status: 400, message: error.details };
        logger.log({
            level: 'error',
            message: error.details,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    var editedBook = editBook(id, body)
    if (!editedBook) {
        response = { status: 404, message: " failed to edit book" };
        logger.log({
            level: 'error',
            message: "book edit is failed ",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(404).send(response);

    }
    if (editedBook == 'The book with the given ID was not found.') {
        response = { status: 200, message: 'The book with the given ID was not found.' };
        logger.log({
            level: 'info',
            message: 'The book with the given ID was not found.',
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(200).send(response);

    }
    response = { status: 200, message: editedBook };

    return res.status(200).send(response);

});

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Started up at port ${port}`);
    });
}


module.exports = {
    route
};