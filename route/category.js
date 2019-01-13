const express = require('express');
var validate = require('uuid-validate');
var route = express.Router();
var {
    getAll,
    getcategory,
    editcategory,
    removecategory,
    addcategory,
    validateCategory,
    getcategoryByname
} = require('../db-Query/category')
let response = require('../errorObj');
var logger = require("../loggerFile")
const moment = require('moment');

route.post('/', (req, res) => {

    const all = getAll(req.body.options);
    if (all.length == 0) {
        response = {
            status: 200,
            message: "no data"
        }
        return res.send(response);
    }
    response = {
        status: 200,
        message: all
    }
    res.send(response);

    try {

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
        return res.status(400).send(response);
    }
    try {
        var category = getcategory(id);
        if (category == 'The category with the given ID was not found.') {
            response = {
                status: 200,
                message: "no data with this id"
            }
            logger.log({
                level: 'info',
                message: "no data with this id",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.send(response);
        }
        response = {
            status: 200,
            message: category
        }
        return res.send(response);
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

route.delete('/category/:name', (req, res) => {
    var name = req.params.name;

    try {
        if (!name) {
            response = {
                status: 404,
                message: 'must insert name'
            }

            return res.status(404).send(response);
        }
        var result = removecategory(name)
        if (result == true) {
            response = {
                status: 200,
                message: "catgory is deleted sucsessfuly"
            }
            return res.status(200).send(response);

        }

        if (result == 'no category with this name') {
            response = {
                status: 200,
                message: "no catgory with this name"
            }
            logger.log({
                level: 'info',
                message: "no catgory with this name",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(200).send(response);

        }
        if (result == "can't delete this category ") {
            response = {
                status: 200,
                message: "can't delete this category "
            }
            logger.log({
                level: 'info',
                message: "can't delete this category ",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(200).send(response);

        } else {
            response = {
                status: 400,
                message: "catgory deleted is failed"
            }
            logger.log({
                level: 'error',
                message: "catgory deleted is failed",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.status(400).send(response);

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
        return res.status(400).send(response);

    }

});


route.post('/addcategory', (req, res) => {
    var category = req.body.category;
    const {
        error
    } = validateCategory(category);
    if (error) {
        response = {
            status: 400,
            Response: error.details,
            message: "validation error"
        }
        logger.log({
            level: 'error',
            message: error.details,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    returnedcategory = addcategory(category);
    if (returnedcategory == "exist category with the same name it's duplicate") {
        response = {
            status: 200,
            message: "exist category with the same name it's duplicate"
        }
        logger.log({
            level: 'info',
            message: "exist category with the same name it's duplicate",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(200).send(response);
    }
    if (!returnedcategory) {
        response = {
            status: 400,
            message: "category added is failed "
        }
        logger.log({
            level: 'error',
            message: "category added is failed ",
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

route.patch('/:id', (req, res) => {
    var id = req.params.id;

    if (!validate(id)) {
        response = {
            status: 400,
            message: 'id not valid'
        }
        logger.log({
            level: 'error',
            message: "in valid id",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    if (!id) {
        response = {
            status: 400,
            message: 'must insert id'
        }
        return res.status(400).send(response);

    }
    var body = req.body;
    const {
        error
    } = validateCategory(body);
    if (error) {
        response = {
            status: 400,
            message: error.details
        }
        logger.log({
            level: 'error',
            message: error.details,
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });
        return res.status(400).send(response);

    }
    var editCategory = editcategory(id, body)
    if (!editCategory) {
        response = {
            status: 404,
            message: "category edit is failed"
        }
        logger.log({
            level: 'error',
            message: "category edit is failed",
            date: moment().format('DD-MM-YYYY HH:mm:ss')
        });

        return res.status(404).send(response).writeHead(statusCode);

    }
    if (editCategory == 'The Category with the given ID was not found.') {
        response = {
            status: 200,
            message: 'The Category with the given ID was not found.'
        }
        return res.status(200).send(response);

    }



    response = {
        status: 200,
        message: editCategory
    }
    return res.status(200).send(response);
});

route.post('/category', (req, res) => {
    var name = req.body.name;
    if (!name) {
        return res.status(404).send();
    }

    try {
        var category = getcategoryByname(name);
        if (category == 'The category with the given name was not found.') {
            response = {
                status: 200,
                message: "no data with this name"
            }
            logger.log({
                level: 'info',
                message: "no data with this name",
                date: moment().format('DD-MM-YYYY HH:mm:ss')
            });
            return res.send(response);
        }
        response = {
            status: 200,
            message: category.id
        }
        return res.send(response);
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