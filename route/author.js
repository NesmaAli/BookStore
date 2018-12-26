const express = require('express');
const bodyParser = require('body-parser');
var validate = require('uuid-validate');
const port = process.env.PORT || 3000;
var app = express();
var {
    getAll,
    getAuthor,
    editAuthor,
    removeAuthor,
    addAuthor,
    validateAuthor
} = require('../db-Query/auther')
let response = require('../errorObj');



app.use(bodyParser.json());

app.post('/authors', (req, res) => {



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
        return res.status(404).send(response);
    }
});

app.get('/authors/:id', (req, res) => {
    var id = req.params.id;
    if (!id) {
        response = {
            status: 404,
            message: "Must insert id of author"
        }
        res.send(response);


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
        var author = getAuthor(id);
        if (author == 'The authors with the given ID was not found.') {
            response = {
                status: 200,
                message: "no data with this id"
            }
            res.send(response);

        } else {
            response = {
                status: 200,
                message: author
            }
            res.send(response);

        }

        console.log(author);


    } catch (error) {
        response = {
            status: 404,
            message: error
        }
        return res.status(404).send(response);

    }
});

app.delete('/author/:name', (req, res) => {
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

        if (result == true)
        {
            response = {
                status: 200,
                message: "author is deleted sucsessfuly"
            }
            return res.status(200).send(response);

        }

        if (result == 'no author with this name')
        {
            response = {
            status: 200,
            message: "no author with this name"
           }
            return res.status(200).send(response);
        }
            
        if (result === "can't delete this auther ")
        {  
            response = {
                status: 200,
                message: "can't delete this auther he has abook"
            }
            return res.status(200).send(response);

        }
        else{
            response = {
                status: 400,
                message:"author deleted is failed"
            }
                return res.status(400).send(response);
        }
       

    } catch (error) {
        response = {
            status: 400,
            message: error
        }
        return res.status(400).send(response);
       

    }

});


app.post('/addAuthor', (req, res) => {
    var author = req.body.author;
    const {
        error
    } = validateAuthor(author);
    if (error) {
        response = {
            status: 400,
            message: error.details
        }
        return res.status(400).send(response);

    }
    returnedauthor = addAuthor(author);

    if (!returnedauthor) {
        response = {
            status: 400,
            message: "author added is failed "
        }
        return res.status(400).send(response);
    }
    response = {
        status: 200,
        message: returnedauthor
    }
    return res.status(200).send(returnedauthor);


});

app.patch('/updateAuthor/:id', (req, res) => {
    var id = req.params.id;

    if (!validate(id)) {
        response = {
            status: 400,
            message: 'id not valid'
        }
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
        return res.status(400).send(error.details);

    }
    var editedAuthor = editAuthor(id, body)
    if (!editedAuthor) {
        response = {
            status: 200,
            message: "no auther with this id"
        }
        return res.status(404).send(response);

    }
    if (editedAuthor == 'The Author with the given ID was not found.') {
        response = {
            status: 200,
            message: error.details
        }
        return res.status(400).send(response);

    }
    response = {
        status: 200,
        message: editedAuthor
    }
    return res.status(200).send(response);
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};