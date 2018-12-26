const Joi = require('joi');
  var validateBook = (book) => {
    const schema = {
      title: Joi.string().min(5).required(),
      author: Joi.string().min(3).required(),
      category: Joi.string().min(3).required(),
      description: Joi.string(),
      isbn: Joi.string().min(3),
      publishYear: Joi.number().min(3),
      pagesNumber: Joi.number().min(3),
      image: Joi.string().min(3)
    };
  
  
    return Joi.validate(book, schema);
  }
  var o={title: "MMMM",
  author: "50687497-5845-4f93-b1e8-0648eb1fc012",
  description: "Mollitia consectetur rerum veniam et. Atque dicta delectus sed. Est ut cum neque suscipit aut asperiores qui. Explicabo quasi consequatur mollitia perspiciatis dignissimos exercitationem ut consequatur. Quia et est. Aliquam excepturi est qui eos. Ullam ex autem laboriosam. Beatae unde rerum dolores rem ut est corporis. Quibusdam sit nostrum nam aliquam officiis. Accusamus in voluptate praesentium odit harum sit sunt delectus corrupti. Dolore repellat omnis deserunt ad eos harum deserunt. Accusamus blanditiis quia beatae et perspiciatis fugiat labore esse dolorem. Quos commodi voluptatibus. Provident aliquam labore dicta impedit esse neque. Aperiam dignissimos voluptatem dolores tenetur.",
  isbn: "1KKVQTD3VGJALIN6W7UE0MNFOGD1T5KN",
  publishYear: 1988,
  pagesNumber: 439,
  image: "https://lorempixel.com/220/300/abstract?id=08779eb5-aba7-4e7c-a01e-5c4b533bdc68",
  category: "af38e08e-1e47-473b-aaa3-4e9b6bde6b72"
}
  //console.log(validateBook(o))
  exports.validateBook={validateBook}