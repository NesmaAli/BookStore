const express = require('express');
var validate = require('uuid-validate');
var logger = require("../loggerFile")
const moment = require('moment');


var route = express.Router();
var {
    getAll,
    getAuthor,
    editAuthor,
    removeAuthor,
    addAuthor,
    validateAuthor,
    getAuthorByname
} = require('../db-Query/auther')
let response = require('../errorObj');





route.post('/', (req, res) => {



    try {
        const allAuther = getAll(req.body.options);

        if (!allAuther) {
            response = {
                status: 200,
                message: "no data"
            }


        }
        response = {
            status: 200,
            message: allAuther
        }
        res.send(response);

    } catch (error) {
        response = {
            status: 404,
            message: error
        }
        logger.log({
            level: 'error',
            message: 'error in get data' + error,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(404).send(response);
    }
});

route.get('/:id', (req, res) => {
    var id = req.params.id;
    if (!id) {
        response = {
            status: 404,
            message: "Must insert id of author"
        }
        logger.log({
            level: 'error',
            message: 'did not insert id',
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        res.send(response);


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
        var author = getAuthor(id);
        if (author == 'The authors with the given ID was not found.') {
            response = {
                status: 200,
                message: "no data with this id"
            }
            logger.log({
                level: 'info',
                message: 'The authors with the given ID was not found.',
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.send(response);

        } else {
            response = {
                status: 200,
                message: author
            }

            return res.send(response);

        }

        console.log(author);


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

route.delete('/author/:name', (req, res) => {
    var name = req.params.name;

    try {
        if (!name) {
            response = {
                status: 404,
                message: 'must insert name'
            }
            return res.status(404).send(response);
        }
        var result = removeAuthor(name);

        if (result == true) {
            response = {
                status: 200,
                message: "author is deleted sucsessfuly"
            }
            return res.status(200).send(response);

        }

        if (result == 'no author with this name') {
            response = {
                status: 200,
                message: "no author with this name"
            }
            logger.log({
                level: 'info',
                message: "no author with this name",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(200).send(response);
        }

        if (result === "can't delete this auther ") {
            response = {
                status: 200,
                message: "can't delete this auther he has abook"
            }
            logger.log({
                level: 'info',
                message: "can't delete this auther he has abook",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(200).send(response);

        } else {
            response = {
                status: 400,
                message: "author deleted is failed"
            }
            logger.log({
                level: 'error',
                message: "author deleted is failed",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(400).send(response);
        }


    } catch (error) {
        response = {
            status: 400,
            message: error
        }
        logger.log({
            level: 'error',
            message: error,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);


    }

});


route.post('/addAuthor', (req, res) => {
    var author = req.body.author;
    const {
        error
    } = validateAuthor(author);
    if (error) {
        response = {
            status: 400,
            message: error.details
        }
        logger.log({
            level: 'error',
            message: error.details
        });
        return res.status(400).send(response);

    }
    returnedauthor = addAuthor(author);
    if (returnedauthor == "exist author with the same name it's duplicate") {
        response = {
            status: 200,
            message: "exist author with the same name it's duplicate"
        }
        logger.log({
            level: 'info',
            message: "exist author with the same name it's duplicate",
            date: moment().format('DD-MM-YYYY HH:mm:ss')


        });
        return res.status(200).send(response);
    }
    if (!returnedauthor) {
        response = {
            status: 400,
            message: "author added is failed "
        }
        logger.log({
            level: 'error',
            message: "author added is failed ",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);
    }
    response = {
        status: 200,
        message: "added sucessfully"
    }
    return res.status(200).send(response);


});

route.patch('/updateAuthor/:id', (req, res) => {
    var id = req.params.id;

    if (!validate(id)) {
        response = {
            status: 400,
            message: 'id not valid'
        }
        logger.log({
            level: 'error',
            message: 'id not valid'
        });
        return res.status(400).send('id not valid');

    }
    if (!id) {
        response = {
            status: 400,
            message: 'must insert id'
        }
        return res.status(400).send('must insert id');

    }
    var body = req.body;
    const {
        error
    } = validateAuthor(body);
    if (error) {
        response = {
            status: 400,
            message: error.details
        }
        logger.log({
            level: 'error',
            message: error.details
        });
        return res.status(400).send(error.details);

    }
    var editedAuthor = editAuthor(id, body)
    if (!editedAuthor) {
        response = {
            status: 200,
            message: "can't edit author"
        };
        logger.log({
            level: 'info',
            message: "can't edit author"
        });
        return res.status(200).send(response);

    }
    if (editedAuthor == 'The Author with the given ID was not found.') {
        response = {
            status: 200,
            message: 'The Author with the given ID was not found.'
        };
        logger.log({
            level: 'info',
            message: 'The Author with the given ID was not found.',
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(200).send(response);

    }
    response = {
        status: 200,
        message: editedAuthor
    }
    return res.status(200).send(response);
});

route.post('/author', (req, res) => {
    //var name = req.params.name;
    var name = req.body.name;

    if (!name) {
        response = {
            status: 404,
            message: "Must insert name of author"
        }
        logger.log({
            level: 'error',
            message: 'did not insert name',
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        res.send(response);


    }

    try {
        var author = getAuthorByname(name);
        if (author == 'The authors with the given name was not found.') {
            response = {
                status: 200,
                message: "no data with this name"
            }
            logger.log({
                level: 'info',
                message: 'The authors with the given name was not found.',
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.send(response);

        } else {
            response = {
                status: 200,
                message: author.id
            }

            return res.send(response);

        }



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
module.exports = {
    route
};