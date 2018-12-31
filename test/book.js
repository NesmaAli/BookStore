const expect = require('expect');

const {app} = require('../server');

const request = require('supertest');


describe('POST /books/addBooks/', () => {

    it('should not create book with invalid body data', (done) => {


        request(app)
            .post('/books/addBooks/')

            .send({
                "book": {
                    "title": "ne",
                    "author": "mmmmmm",
                    "description": "Mollitia consectetur rerum veniam et. Atque dicta delectus sed. Est ut cum neque suscipit aut asperiores qui.  voluptatibus. Provident aliquam labore dicta impedit esse neque. Aperiam dignissimos voluptatem dolores tenetur.",
                    "isbn": "1Kgggggggggg",
                    "publishYear": 44,
                    "pagesNumber": 4,
                    "image": "https://lorempixel.com/220/300/abstract?id=08779eb5-aba7-4e7c-a01e-5c4b533bdc68",
                    "category": "ab72"
                }
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }


            });
        done();
    });

    it('should create a new book', (done) => {

        request(app)
            .post('/books/addBooks/')
            .send({
                "book": {
                    "title": "Et ab earum sunt dolore2",
                    "author": "edd209df-b6a6-454d-8ac4-0c19f2140752",
                   "description": "Voluptas quibusdam enim nobis veritatis .  Reiciendis tempore nemo esse cumque aut.",
                    "isbn": "11R8EGAU92D19RRKWMHUY877400T61",
                    "publishYear": 2014,
                    "pagesNumber": 239,
                    "image": "https://lorempixel.com/220/300/nature?id=60c4374f-c4d6-4ec5-8f0c-ae3951ac909c",
                    "category": "bca15b9c-3ef2-47a7-8f4d-0ae177c77ee6"
                }
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message.title ).toBe( "Et ab earum sunt dolore2");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }


            });
            done();
    });
// test book with invalid category id
    it('should not create book with invalid category id', (done) => {


        request(app)
            .post('/books/addBooks/')

            .send({
                "book": {
                    "title": "book with invalid category id",
                    "author": "78dc4b57-38fd-46a0-8121-d70453e1de2b",
                    "description": "Mollitia consectetur rerum veniam et. Atque dicta delectus sed. Est ut cum neque suscipit aut asperiores qui.  voluptatibus. Provident aliquam labore dicta impedit esse neque. Aperiam dignissimos voluptatem dolores tenetur.",
                    "isbn": "1Kgggggggggg",
                    "publishYear": 44,
                    "pagesNumber": 4,
                    "image": "https://lorempixel.com/220/300/abstract?id=08779eb5-aba7-4e7c-a01e-5c4b533bdc68",
                    "category": "ab72"
                }
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe( "you must add exist category");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            });
        done();
    });
    it('should not create book with invalid author id', (done) => {


        request(app)
            .post('/books/addBooks/')

            .send({
                "book": {
                    "title": "inforamtion system",
                    "author": "mmmmmmf",
                    "description": "Mollitia consectetur rerum veniam et. Atque dicta delectus sed. Est ut cum neque suscipit aut asperiores qui.  voluptatibus. Provident aliquam labore dicta impedit esse neque. Aperiam dignissimos voluptatem dolores tenetur.",
                    "isbn": "1Kgggggggggg",
                    "publishYear": 44,
                    "pagesNumber": 4,
                    "image": "https://lorempixel.com/220/300/abstract?id=08779eb5-aba7-4e7c-a01e-5c4b533bdc68",
                    "category": "3fa1300a-e186-4d55-91bc-2e1cae13a2f0"
                }
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe( "you must add exist author");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            });
        done();
    });






});
//// get test

describe('POST /books/', () => {
    it('should get all books', (done) => {
        request(app)
            .post('/books/')
            .expect(200)
            .expect((res) => {
                expect(res.body.message.length).toBeGreaterThan(0);
            })
            .end(done);
    });

    it('should get all books by order desc', (done) => {
        var order = {
            "options": {
                "sort": {
                    "type": "title",
                    "order": "desc"
                }
            }
        }
        request(app)
            .post('/books/')
            .send(order)
            .expect(200)
            .expect((res) => {
                expect(res.body.message.length).toBeGreaterThan(0);
            })
            .end(done);
    });
    it('should get all book filter by title', (done) => {
        var filter = {
            "options": {
                "filter": {
                    "title": "Quasi possimus aut minima maiores adipisci ratione"
                }
            }
        }
        request(app)
            .post('/books/')
            .send(filter)
            .expect(200)
            .expect((res) => {
                expect(res.body.message.length).toBe(1);
            })
            .end(done);
    });
});
//// test get by id

describe('GET /books/:id', () => {
    it('should return book ', (done) => {
        request(app)
            .get(`/books/08779eb5-aba7-4e7c-a01e-5c4b533bdc68`)
            .expect(200)
            .expect((res) => {
                expect(res.body.message.title).toBe("Quasi possimus aut minima maiores adipisci ratione");

            })
            .end(done);
    });

    it('should return 200 if book not found', (done) => {

        request(app)
            .get(`/books/08779eb5-aba7-4e7c-a01e-5c4b533bdc48`)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe('no data with this id');


            })
            .end(done);
    });

    it('should return 400 for non-valid ids', (done) => {
        request(app)
            .get(`/books/hhhhh`)
            .expect(400)
            .end(done);
    });
});

// delete TEST

describe('DELETE /books/book/:title', () => {
    it('should remove a book', (done) => {

        request(app)
            .delete(`/books/book/Et ab earum sunt dolore2`)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("book is deleted sucsessfuly");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }


            });
        done();
    });

    it(' no book with this name ', (done) => {

        request(app)
            .delete(`/books/book/mmmm`)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("no book with this name");
            })
            .end(done);
    });


});

describe('PATCH /books/:id', () => {
    it('should update the book', (done) => {

        request(app)
            .patch(`/books/73ff176c-5ffc-4c00-aa72-901c5f6fb446`)
            .send({
                "title": "updated debitis voluptas",
                "author": "8dec0840-5ab5-4e07-8452-a0c787fa8805",
                "description": "Quisquam consectetur sint debitis. Nemo quia molestiae autem consequatur suscipit necessitatibus. Consequuntur dolore pariatur dolores sunt aperiam cupiditate. Eaque sed vitae ducimus est dolor expedita nostrum non. Dignissimos consequatur voluptate aspernatur aliquam. Doloribus vero blanditiis veritatis iusto fuga est soluta exercitationem. Laborum molestiae corrupti. Iste non dolor aut consequuntur quos perferendis consequatur omnis. Ipsa molestias debitis esse saepe. Quisquam iusto eaque modi voluptas sed dolorem. In aut dolor magni et saepe officiis ipsa saepe. Molestias sunt beatae sint quae quia. Dolor et et repudiandae. Magni odio possimus exercitationem harum iste doloremque. Quo pariatur laborum eaque et.",
                "isbn": "1MVGOI7602HX3BH4Y4N9540C73R",
                "publishYear": 1961,
                "pagesNumber": 775,
                "image": "https://lorempixel.com/220/300/abstract?id=73ff176c-5ffc-4c00-aa72-901c5f6fb446",
                "category": "d86b9b4f-165a-49e9-a7e6-86a2ad10ea00"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message.title).toBe("updated debitis voluptas");

            })
            .end(done);
    });

    it('should RETURN 400 if body of message not valid', (done) => {


        request(app)
            .patch(`/books/73ff176c-5ffc-4c00-aa72-901c5f6fb446`)
            .send({
                "title": "up",
                "author": "8dec0840-5ab5-4e07-8452-a0c787fa8805",
                "description": "Quisquam consectetur sint debitis. Nemo quia molestiae autem consequatur suscipit necessitatibus. Consequuntur dolore pariatur dolores sunt aperiam cupiditate. Eaque sed vitae ducimus est dolor expedita nostrum non. Dignissimos consequatur voluptate aspernatur aliquam. Doloribus vero blanditiis veritatis iusto fuga est soluta exercitationem. Laborum molestiae corrupti. Iste non dolor aut consequuntur quos perferendis consequatur omnis. Ipsa molestias debitis esse saepe. Quisquam iusto eaque modi voluptas sed dolorem. In aut dolor magni et saepe officiis ipsa saepe. Molestias sunt beatae sint quae quia. Dolor et et repudiandae. Magni odio possimus exercitationem harum iste doloremque. Quo pariatur laborum eaque et.",
                "isbn": "1MVGOI7602HX3BH4Y4N9540C73R",
                "publishYear": 1961,
                "pagesNumber": 775,
                "image": "https://lorempixel.com/220/300/abstract?id=73ff176c-5ffc-4c00-aa72-901c5f6fb446",
                "category": "d86b9b4f-165a-49e9-a7e6-86a2ad10ea00"
            })
            .expect(400)

            .end(done);
    });
    it('should RETURN 400 if id not valid', (done) => {


        request(app)
            .patch(`/books/73ff176c-5ffc-4c00`)
            .send({
                "title": "up",
                "author": "8dec0840-5ab5-4e07-8452-a0c787fa8805",
                "description": "Quisquam consectetur sint debitis. Nemo quia molestiae autem consequatur suscipit necessitatibus. Consequuntur dolore pariatur dolores sunt aperiam cupiditate. Eaque sed vitae ducimus est dolor expedita nostrum non. Dignissimos consequatur voluptate aspernatur aliquam. Doloribus vero blanditiis veritatis iusto fuga est soluta exercitationem. Laborum molestiae corrupti. Iste non dolor aut consequuntur quos perferendis consequatur omnis. Ipsa molestias debitis esse saepe. Quisquam iusto eaque modi voluptas sed dolorem. In aut dolor magni et saepe officiis ipsa saepe. Molestias sunt beatae sint quae quia. Dolor et et repudiandae. Magni odio possimus exercitationem harum iste doloremque. Quo pariatur laborum eaque et.",
                "isbn": "1MVGOI7602HX3BH4Y4N9540C73R",
                "publishYear": 1961,
                "pagesNumber": 775,
                "image": "https://lorempixel.com/220/300/abstract?id=73ff176c-5ffc-4c00-aa72-901c5f6fb446",
                "category": "d86b9b4f-165a-49e9-a7e6-86a2ad10ea00"
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe('id not valid');

            })
            .end(done);
    });
    it('should RETURN 400 if id not valid', (done) => {


        request(app)
            .patch(`/books/752`)
            .send({
                "title": "updated2",
                "author": "8dec0840-5ab5-4e07-8452-a0c787fa8805",
                "description": "Quisquam consectetur sint debitis. Nemo quia molestiae autem consequatur suscipit necessitatibus. Consequuntur dolore pariatur dolores sunt aperiam cupiditate. Eaque sed vitae ducimus est dolor expedita nostrum non. Dignissimos consequatur voluptate aspernatur aliquam. Doloribus vero blanditiis veritatis iusto fuga est soluta exercitationem. Laborum molestiae corrupti. Iste non dolor aut consequuntur quos perferendis consequatur omnis. Ipsa molestias debitis esse saepe. Quisquam iusto eaque modi voluptas sed dolorem. In aut dolor magni et saepe officiis ipsa saepe. Molestias sunt beatae sint quae quia. Dolor et et repudiandae. Magni odio possimus exercitationem harum iste doloremque. Quo pariatur laborum eaque et.",
                "isbn": "1MVGOI7602HX3BH4Y4N9540C73R",
                "publishYear": 1961,
                "pagesNumber": 775,
                "image": "https://lorempixel.com/220/300/abstract?id=73ff176c-5ffc-4c00-aa72-901c5f6fb446",
                "category": "d86b9b4f-165a-49e9-a7e6-86a2ad10ea00"
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe('id not valid');

            })
            .end(done);
    });
});