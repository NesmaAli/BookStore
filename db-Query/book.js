//var validateBook =require('../models/book')
const Joi = require('joi');
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

var validateBook = (book) => {
  const schema = {
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    description: Joi.string(),
    isbn: Joi.string().min(3),
    publishYear: Joi.number(),
    pagesNumber: Joi.number(),
    image: Joi.string().min(3),
    

  };

  return Joi.validate(book, schema);
}



// Get all books
var getAll = (options) => {
  let sortedData = fetchData().books;
  console.log(options);
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
var getBook = (id) => {
  var books = fetchData().books;
  
 

  const book = books.find(c => c.id === id);
  //console.log(books.find(c => c.id === id));
  if (!book) return 'The book with the given ID was not found.';
 
  return book;

}


// add book 
var addBook = (book) => {
  const {
    error
  } = validateBook(book);
  if (error) {
    return ('validation error',error)
  }
  book.id = uuidv4();

  var data = fetchData();
  
 
  data.books.push(book);
  saveData(data);
  console.log(book);
  return book;
  

};



//delete book
var removeBook = (title) => {
  
  var books = fetchData().books;
  var data = fetchData();

  var filteredBooks = books.filter((book) => book.title !== title);
  if (books.length == filteredBooks.length) {
    return 'no book with this name';
  }
  data.books = filteredBooks;
  saveData(data);
 console.log(books.length);
 console.log(filteredBooks.length);

  return books.length !== filteredBooks.length;
};



// update book
var editBook = (id, newbook) => {
  var data = fetchData();

  const book = data.books.find(c => c.id === id);
  if (!book) return 'The book with the given ID was not found.';

  const {
    error
  } = validateBook(newbook);
  if (error) return error.details[0].message;
  book.title = newbook.title;
  book.author = newbook.author;
  book.category = newbook.category;
  book.description=newbook.description;
  book.isbn = newbook.isbn;
  book.publishYear = newbook.publishYear;
  book.pagesNumber = newbook.pagesNumber;
  book.image = newbook.image;


  saveData(data);
  return book;

}

var o={
  sort:{
    "title":"'desc'"
  }
}
var ol={title: "MMMMdddd",
  author: "50687497-5845-4f93-b1e8-0648eb1fc012",
  description: "Mollitia consectetur rerum veniam et. Atque dicta delectus sed. Est ut cum neque suscipit aut asperiores qui. Explicabo quasi consequatur mollitia perspiciatis dignissimos exercitationem ut consequatur. Quia et est. Aliquam excepturi est qui eos. Ullam ex autem laboriosam. Beatae unde rerum dolores rem ut est corporis. Quibusdam sit nostrum nam aliquam officiis. Accusamus in voluptate praesentium odit harum sit sunt delectus corrupti. Dolore repellat omnis deserunt ad eos harum deserunt. Accusamus blanditiis quia beatae et perspiciatis fugiat labore esse dolorem. Quos commodi voluptatibus. Provident aliquam labore dicta impedit esse neque. Aperiam dignissimos voluptatem dolores tenetur.",
  isbn: "1KKVQTD3VGJALIN6W7UE0MNFOGD1T5KN",
  publishYear: 1988,
  pagesNumber: 439,
  image: "https://lorempixel.com/220/300/abstract?id=08779eb5-aba7-4e7c-a01e-5c4b533bdc68",
  category: "af38e08e-1e47-473b-aaa3-4e9b6bde6b72"
}
//console.log(addBook(ol))
exports.getAll=getAll;
exports.getBook=getBook;
exports.editBook=editBook;
exports.removeBook=removeBook;
exports.addBook=addBook;
exports.validateBook=validateBook;