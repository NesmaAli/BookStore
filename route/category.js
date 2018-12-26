const express = require('express');
const bodyParser = require('body-parser');
var validate = require('uuid-validate');
const port = process.env.PORT || 3000;
var app = express();
var {
    getAll,
    getcategory,
    editcategory,
    removecategory,
    addcategory,
    validateCategory
} = require('../db-Query/category')
let response = require('../errorObj');



app.use(bodyParser.json());

app.post('/categories', (req, res) => {

    const all = getAll(req.body.options);
    if (all.length==0) {
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
    
    try {

    } catch (error) {
        response = {
            status: 404,
            message: error
        }

        return res.status(404).send(response);
    }
});

app.get('/categories/:id', (req, res) => {
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
        res.send(response);
    }
    try {
        var category = getcategory(id);
        if (category == 'The category with the given ID was not found.') {
            response = {
                status: 200,
                message: "no data with this id"
            }
            return res.send(response);
        }
        response = {
            status: 200,
            message:category 
        }
        res.send(response);
    } catch (error) {
        response = {
            status: 404,
            message:error
        }
        return res.status(404).send(response);

    }
});

app.delete('/category/:name', (req, res) => {
    var name = req.params.name;

    try {
        if (!name) {
            response = {
                status: 404,
                message:'must insert name'
            }
            return res.status(404).send(response);
        }
        var result = removecategory(name)
        if (result == true)
        {
            response = {
                status: 200,
                message:"catgory is deleted sucsessfuly"
            }
            return res.status(200).send(response);

        }

        if (result == 'no category with this name')
        {
            response = {
                status: 200,
                message:"no catgory with this name"
            }
            return res.status(200).send(response);

        }
        else
        {
            response = {
                status: 400,
                message:"catgory deleted is failed"
            }
            return res.status(400).send(response);

        }

    } catch (error) {
        response = {
            status: 404,
            message:error
        }
        return res.status(400).send(response);

    }

});


app.post('/addcategory', (req, res) => {
    var category = req.body.category;
    const {
        error
    } = validateCategory(category);
    if (error) {
        response = {
            status: 400,
            message:error.details
        }
        return res.status(400).send(response);

    }
    returnedcategory = addcategory(category);

    if (!returnedcategory)
    {
        response = {
            status: 400,
            message:"category added is failed "
        }
        return res.status(400).send(response);

    }
        response = {
            status: 200,
            message:returnedcategory
        }
    return res.status(200).send(response);


});

app.patch('/updateCategory/:id', (req, res) => {
    var id = req.params.id;

    if (!validate(id)) {
        response = {
            status: 400,
            message:'id not valid'
        }
        return res.status(400).send(response);

    }
    if (!id) {
        response = {
            status: 400,
            message:'must insert id'
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
            message:error.details
        }
        return res.status(400).send(response);

    }
    var editCategory = editcategory(id, body)
    if (!editCategory) {
        response = {
            status: 404,
            message:"category edit is failed"
        }
        return res.status(404).send(response);

    }
    if (editCategory == 'The Category with the given ID was not found.')
    {
        response = {
            status: 200,
            message:'The Category with the given ID was not found.'
        }
        return res.status(200).send(response);

    }
        response = {
            status: 200,
            message:editCategory
        }
    return res.status(200).send(response);
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};