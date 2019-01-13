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

var validateCategory = (category) => {
    const schema = {
        name: Joi.string().min(5).required(),

    };

    return Joi.validate(category, schema);
}



// Get all categories
var getAll = (options) => {
    let sortedData = fetchData().categories;
    if(options==null){
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
var getcategory = (id) => {
    var categories = fetchData().categories;

    const category = categories.find(c => c.id === id);
    if (!category) return 'The category with the given ID was not found.';
    else
        return category;

}
// get by name
var getcategoryByname = (name) => {
    var categories = fetchData().categories;

    const category = categories.find(c => c.name === name);
    if (!category) return 'The category with the given name was not found.';
    else
        return category;

}
// add category 
var addcategory = (category) => {
    const {
        error
    } = validateCategory(category);
    if (error) {
        return (error)
    }
    category.id = uuidv4();
    console.log(category.id);
    

    var data = fetchData();
    var isDublicate = checkDublicate(data.categories, category);
    if (isDublicate) {
        return "exist category with the same name it's duplicate";
    }
    data.categories.push(category);
    saveData(data)
    return category;

};

let ckeckcategory = (name) => {
    var data = fetchData();

    const category = data.categories.find(c => c.name === name);
    ////handle error
    if (!category) return ' no category with this name';

    const hasBook = data.books.find(c => c.category === category.id);
    if (!hasBook) {
        return false;
    }

    return true;


}



//delete category

var removecategory = (name) => {
    if (!name) {
        return 'plz insert name to remove Caregory'
    }
    var hasBook = ckeckcategory(name)
    console.log(hasBook);
    if (typeof hasBook === 'string') return 'no category with this name';
    if (hasBook) return "can't delete this category "
    var data = fetchData();
    var filteredcategories = data.categories.filter((category) => category.name !== name);
   var checkLength=data.categories.length;


    if (data.categories.length == filteredcategories.length) {
        return 'no category with this name'
    }
    console.log(data.categories.length);
    console.log(filteredcategories.length);
    data.categories = filteredcategories;
    saveData(data);
    
    return data.categories.length !== checkLength.length;
};

// update category
var editcategory = (id, newcategory) => {
    var data = fetchData();

    const category = data.categories.find(c => c.id === id);
    if (!category) return 'The category with the given ID was not found.';

    const {
        error
    } = validateCategory(newcategory);
    if (error) return error.details[0].message;
    category.name = newcategory.name;


    saveData(data)
    return category;

}

exports.getAll=getAll;
exports.getcategory=getcategory
exports.editcategory=editcategory;
exports.removecategory=removecategory;
exports.addcategory=addcategory;
exports.validateCategory=validateCategory;
exports.getcategoryByname=getcategoryByname;