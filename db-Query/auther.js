const Joi = require('joi');

let{checkDublicate}=require("./Duplication")
var {
    sort,
    filter,
    paging

} = require('./operation');
var {
    fetchData,
    saveData
} = require('../DB/Connect');

const uuidv4 = require('uuid/v4');

var validateAuthor = (author) => {
    const schema = {
        name: Joi.string().min(5).required(),
        jobTitle: Joi.string().min(3).required(),
        bio: Joi.string().min(3).required(),


    };

    return Joi.validate(author, schema);
}



// Get all authors
var getAll = (options) => {

    let sortedData = fetchData().authors;
    if (options == null) {
        return sortedData;
    }
    if (options.sort) {

        sortedData = sort(sortedData, options.sort.type, options.sort.order);

    }
    if (options.filter) {
        sortedData = filter(sortedData, options.filter);
    }
    if (options.page) {
        sortedData = paging(sortedData, options.page.Pnum, options.page.perPage)

    }



    return sortedData;






};
// get by id
var getAuthor = (id) => {
    var authors = fetchData().authors;

    const author = authors.find(c => c.id === id);
    if (!author) return 'The author with the given ID was not found.';
    else
        return author;

}

// get by name
var getAuthorByname = (name) => {
    var authors = fetchData().authors;

    const author = authors.find(c => c.name === name);
    if (!author) return 'The authors with the given name was not found.';
    else
        return author;

}



// add author 
var addAuthor = (author) => {
    const {
        error
    } = validateAuthor(author);
    if (error) {
        return (error)
    }
    author.id = uuidv4();

    var data = fetchData();
    var isDublicate = checkDublicate(data.authors, author);
    if (isDublicate) {
        return "exist author with the same name it's duplicate";
    }
    data.authors.push(author);
    saveData(data)
    return author;

};

let ckeckAuther = (name) => {
    var data = fetchData();

    const author = data.authors.find(c => c.name === name);
    if (!author) return ' no author with this name';
    const hasBook = data.books.find(c => c.author === author.id);
    if (!hasBook) {
        return false;
    }

    return true;


}



//delete author

var removeAuthor = (name) => {
    if (!name) {
        return 'plz insert name to remove auth'
    }
    var hasBook = ckeckAuther(name);
    if (typeof hasBook === 'string') return 'no author with this name';
    if (hasBook) return "can't delete this auther "
    var data = fetchData();
    var filteredauthors = data.authors.filter((author) => author.name !== name);
    var checkLength = data.authors.length;

    if (data.authors.length == filteredauthors.length) {
        return 'no auther with this name'
    }
    data.authors = filteredauthors;
    saveData(data);

    return data.authors.length !== checkLength;
};

// update author
var editAuthor = (id, newauthor) => {
    var data = fetchData();

    const author = data.authors.find(c => c.id === id);
    if (!author) return 'The author with the given ID was not found.';

    const {
        error
    } = validateAuthor(newauthor);
    if (error) return error.details[0].message;
    author.name = newauthor.name;
    author.jobTitle = newauthor.jobTitle;
    author.bio = newauthor.bio;

    saveData(data)
    return author;

}


exports.getAll = getAll;
exports.getAuthor = getAuthor
exports.editAuthor = editAuthor;
exports.removeAuthor = removeAuthor;
exports.addAuthor = addAuthor;
exports.validateAuthor = validateAuthor;
exports.getAuthorByname=getAuthorByname;