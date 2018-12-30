const expect = require('expect');
const request = require('supertest');

const {app} = require('../route/author');

describe('POST /addAuthor/', () => {

  it('should not create author with invalid body data', (done) => {
    var author2 = { "author":
    {
       
        "name": "A",
        "jobTitle": "International Applications Orchestrator",
        "bio": "Esse nulla et. Tempora voluptates alias rerum ad velit. Accusamus eveniet ut quisquam dolore et unde ea nostrum. Qui quae eaque omnis error laudantium et enim et occaecati. Ullam porro et rerum et aut. Quia occaecati doloremque quo consequatur perferendis aspernatur."
    }
  };
    request(app)
      .post('/addAuthor/')
      .send(author2)
      .send({
        "author":{
        "name": "oy",
        "jobTitle": "Dynamic Branding Analyst",
        "bio": "Earum quo porro voluptas dignissimos aliquid animi totam."
      }})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        
      });
      done();
  });

    it('should create a new author', (done) => {
     
      request(app)
        .post('/addAuthor/')
        .send({ "author":
        {
            "name": "Anaaaaaaatest10",
            "jobTitle": "International Applications Orchestrator",
            "bio": " Quia occaecati doloremque quo consequatur perferendis aspernatur."
        }
      })
        .expect(200)
       /* .expect((res) => {
          expect(res.body.message.name).toBe("Anaaaaaaatest10");
        })*/
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          
        });
        done();
    });






    
    
  });
  //// get test

  describe('POST /authors', () => {
    it('should get all books', (done) => {
      request(app)
        .post('/authors')
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBeGreaterThan(0);
        })
        .end(done);
    });

    it('should get all books by order desc', (done) => {
      var order={
        "options":{
          "sort":{
            "type":"name",
            "order":"desc"
          }
        }
      }
      request(app)
        .post('/authors')
        .send(order)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBeGreaterThan(0);
        })
        .end(done);
    });
    it('should get all book filter by name', (done) => {
      var filter={
        "options":{
          "filter":{
            "name": "Keyshawn Heller"
          }
        }
      }
      request(app)
        .post('/authors')
        .send(filter)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBe(1);
        })
        .end(done);
    });
  });
  //// test get by id

  describe('GET /authors/:id', () => {
    it('should return author ', (done) => {
      request(app)
        .get(`/authors/8a52636c-080e-4181-9980-9b31d0206cf7`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.name).toBe("Miss Marge Shields");
          
        })
        .end(done);
    });
  
    it('should return 200 if author not found', (done) => {
  
      request(app)
        .get(`/authors/9a52636c-080e-4181-9980-9b31d0206cf5`)
        .expect(200) 
        .expect((res) => {
          expect(res.body.message).toBe('The author with the given ID was not found.');
         
          
        })   
        .end(done);
    });
  
    it('should return 400 for non-valid ids', (done) => {
      request(app)
        .get(`/authors/hhhhh`)
        .expect(400)
        .end(done);
    });
  });

  // delete TEST

  describe('DELETE /author/:name', () => {
    it('should remove a author', (done) => {
  
      request(app)
        .delete(`/author/Anaaaaaaatest3`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message ).toBe("author is deleted sucsessfuly");
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          
        });
    });
  
    it(' no author with this name ', (done) => {
  
      request(app)
        .delete(`/author/mmmm`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.message).toBe("no author with this name");
        })
        .end(done);
    });
  
    it("should return can't delete this auther ", (done) => {
      request(app)
        .delete('/author/Ahmad Stanton')
        .expect(200)
        .expect((res)=>{
          expect(res.body.message).toBe("can't delete this auther he has abook");
        })
        .end(done);
    });
  });
  
  describe('PATCH /updateAuthor/:id', () => {
    it('should update the AUTHOR', (done) => {
  
      request(app)
        .patch(`/updateAuthor/8dec0840-5ab5-4e07-8452-a0c787fa8805`)
        .send({
          "name": "UPDATE Conroy",
          "jobTitle": "Dynamic Branding Analyst",
          "bio": "Earum quo porro voluptas dignissimos aliquid animi totam. Occaecati eligendi officiis blanditiis quo enim harum quia consequatur voluptatum. Quaerat omnis at esse voluptatibus. Ut repellat nulla alias odio maiores. Cum voluptas cum sed nihil. Quae distinctio aliquid molestiae delectus veritatis quis qui vero."
      })
        .expect(200)
        .expect((res) => {
          expect(res.body.message.name).toBe("UPDATE Conroy");
         
        })
        .end(done);
    });
  
    it('should RETURN 400 if body of message not valid', (done) => {
     
  
      request(app)
        .patch(`/updateAuthor/8dec0840-5ab5-4e07-8452-a0c787fa8805`)
        .send({
          "name": "oy",
          "jobTitle": "Dynamic Branding Analyst",
          "bio": "Earum quo porro voluptas dignissimos aliquid animi totam."
        })
        .expect(400)
        
        .end(done);
    });
  });
  
  
  