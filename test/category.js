const expect = require('expect');

const request = require('supertest');
const {app} = require('../server.js');



describe('POST /categories/addcategory/', () => {

  it('should not create category with invalid body data', (done) => {
   
   
    request(app)
      .post('/categories/addcategory/')
     
      .send({
        "category":
        {
            "name": "cs"                  
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

    it('should create a new category', (done) => {
     
      request(app)
        .post('/categories/addcategory/')
        .send({ "category":
        {
            "name": "computer sc"
        }
      })
        .expect(200)
        .expect((res) => {
          expect(res.body.message.name).toBe("computer sc");
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

  describe('POST /categories/', () => {
    it('should get all categories', (done) => {
      request(app)
        .post('/categories/')
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBeGreaterThan(0);
        })
        .end(done);
    });

    it('should get all categories by order desc', (done) => {
      var order={
        "options":{
          "sort":{
            "type":"name",
            "order":"desc"
          }
        }
      }
      request(app)
        .post('/categories/')
        .send(order)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBeGreaterThan(0);
        })
        .end(done);
    });
    it('should get all categories filter by name', (done) => {
      var filter={
        "options":{
          "filter":{
            "name": "Ari Harvey"
          }
        }
      }
      request(app)
        .post('/categories/')
        .send(filter)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.length).toBe(1);
        })
        .end(done);
    });
  });
  //// test get by id

  describe('GET /categories/:id', () => {
    it('should return category ', (done) => {
      request(app)
        .get(`/categories/88b92bc4-a7a3-4749-9911-87c48b6bb74c`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message.name).toBe("Lilly Quitzon");
          
        })
        .end(done);
    });
  
    it('should return 200 if category not found', (done) => {
  
      request(app)
        .get(`/categories/88b92bc4-a7a3-4749-9911-87c48b6bb75c`)
        .expect(200) 
        .expect((res) => {
          expect(res.body.message).toBe('no data with this id');
         
          
        })   
        .end(done);
    });
  
    it('should return 400 for non-valid ids', (done) => {
      request(app)
        .get(`/categories/hhhhh`)
        .expect(400)
        .end(done);
    });
  });

  // delete TEST

  describe('DELETE /categories/category/:name', () => {
    it('should remove a category', (done) => {
  
      request(app)
        .delete(`/categories/category/computer sc`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message ).toBe("catgory is deleted sucsessfuly");
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          
        });
        done();
    });
  
    it(' no category with this name ', (done) => {
  
      request(app)
        .delete(`/categories/category/mmmm`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.message).toBe('no catgory with this name');
        })
        .end(done);
    });
  
    it("should return can't delete this category ", (done) => {
      request(app)
        .delete('/categories/category/Joyce Bruen')
        .expect(200)
        .expect((res)=>{
          expect(res.body.message).toBe("can't delete this category ");
        })
        .end(done);
    });
  });
  
  describe('PATCH /categories/:id', () => {
    it('should update the Category', (done) => {
  
      request(app)
        .patch(`/categories/93a51118-8d8e-410e-8afb-ba3bd1c5e910`)
        .send({
          "name": "UPDATE Category",
      })
        .expect(200)
        .expect((res) => {
          expect(res.body.message.name).toBe("UPDATE Category");
         
        })
        .end(done);
    });
  
    it('should RETURN 400 if body of message not valid', (done) => {
     
  
      request(app)
        .patch(`/categories/4964327c-028a-469d-b432-d3b857a10f0d`)
        .send({
          "name": "oy",
         
        })
        .expect(400)
        
        .end(done);
    });
    it('should RETURN 400 if id  not valid', (done) => {
     
  
        request(app)
          .patch(`/categories/4964327c-028ad`)
          .send({
            "name": "uudated by id notvali",
           
          })
          .expect(400)
          .expect((res) => {
            
            expect(res.body.message).toBe('id not valid');
           
          })
          
          .end(done);
      });
  });
  
  
  