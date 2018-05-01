const request = require('supertest');

const { before } = require('mocha');
const { after } = require('mocha');
const { describe } = require('mocha');
const { it } = require('mocha');

const BillsRouters = require('../routes/bills');
const ClientsRouters = require('../routes/clients');
const ExpensesRouters = require('../routes/expenses');
const ItemsRouters = require('../routes/items');
const SuppliersRouters = require('../routes/suppliers');

const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let TestBillBody;
let TestClientBody;
let TestExpenseBody;
let TestItemBody;
let TestSupplierBody;

before((done) => {
  // Connect to the Database (and create it if it doesn't exist)
  mongoose.connect('mongodb://localhost/erpTestingDB');
  mongoose.Promise = global.Promise;
  mongoose.connection.once('open', () => {
    console.log('MongoTestingDB>  Connection Established');
  }).on('error', (error) => {
    console.log(`MongoTestingDB>  Connection Error: ${error}`);
  });

  // Body-Parser Middleware
  app.use(bodyParser.json());

  // Add routes to Express
  app.use('/api/bills', BillsRouters);
  app.use('/api/clients', ClientsRouters);
  app.use('/api/expenses', ExpensesRouters);
  app.use('/api/items', ItemsRouters);
  app.use('/api/suppliers', SuppliersRouters);

  // Error Handling middleware
  app.use((err, req, res) => {
    console.log(err.message);
    res.status(422).send({ error: err.message });
  });

  // Listen for requests
  app.listen(4000, () => {
    console.log('Express>  App Started on port: 4000');
  });

  setTimeout(() => { done(); }, 1500);
});

after((done) => {
  setTimeout(() => {
    app.close();
  }, 1500);
  done();
});


describe('Bills HTTP REST API Routes', () => {
  it('POST /api/bills', (done) => {
    request(app)
      .post('/api/bills')
      .send({
        description: 'the-bill-description',
        client_name: 'a-client-name',
        total_cost: '12345',
        issuer_id: '1300079',
        issuing_time: '28-04-2018',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestBillBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('GET /api/bills', (done) => {
    request(app)
      .get('/api/bills')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('GET /api/bills/{test}', (done) => {
    request(app)
      .get(`/api/bills/${TestBillBody._id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('PUT /api/bills', (done) => {
    request(app)
      .put(`/api/bills/${TestBillBody._id}`)
      .send({
        description: 'the-updated-bill-description',
        client_name: 'an-updated-client-name',
        total_cost: '12345-6789',
        issuer_id: '13000799',
        issuing_time: '28-05-2018',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestBillBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('DELETE /api/bills/{test}', (done) => {
    request(app)
      .delete(`/api/bills/${TestBillBody._id}`)
      .send({})
      .expect(200, done);
  });
});


describe('Clients HTTP REST API Routes', () => {
  it('POST /api/clients', (done) => {
    request(app)
      .post('/api/clients')
      .send({
        name: 'tester',
        address: 'tester@erp.com',
        telephone: 'test123',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestClientBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('GET /api/clients', (done) => {
    request(app)
      .get('/api/clients')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('GET /api/clients/{test}', (done) => {
    request(app)
      .get(`/api/clients/${TestClientBody._id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('PUT /api/clients', (done) => {
    request(app)
      .put(`/api/clients/${TestClientBody._id}`)
      .send({
        name: 'updatedTester',
        address: 'tester@erp.com',
        telephone: 'test12345',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestClientBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('DELETE /api/clients/{test}', (done) => {
    request(app)
      .delete(`/api/clients/${TestClientBody._id}`)
      .send({})
      .expect(200, done);
  });
});


describe('Expenses HTTP REST API Routes', () => {
  it('POST /api/expenses', (done) => {
    request(app)
      .post('/api/expenses')
      .send({
        description: 'an-expense-description',
        cost: '123',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestExpenseBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('GET /api/expenses', (done) => {
    request(app)
      .get('/api/expenses')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('GET /api/expenses/{test}', (done) => {
    request(app)
      .get(`/api/expenses/${TestExpenseBody._id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('PUT /api/expenses', (done) => {
    request(app)
      .put(`/api/expenses/${TestExpenseBody._id}`)
      .send({
        description: 'an-updated-expense-description',
        cost: '123456',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestExpenseBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('DELETE /api/expenses/{test}', (done) => {
    request(app)
      .delete(`/api/expenses/${TestExpenseBody._id}`)
      .send({})
      .expect(200, done);
  });
});


describe('Items HTTP REST API Routes', () => {
  it('POST /api/items', (done) => {
    request(app)
      .post('/api/items')
      .send({
        name: 'an-item',
        amount: '12345',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestItemBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('GET /api/items', (done) => {
    request(app)
      .get('/api/items')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('GET /api/items/{test}', (done) => {
    request(app)
      .get(`/api/items/${TestItemBody._id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('PUT /api/items', (done) => {
    request(app)
      .put(`/api/items/${TestItemBody._id}`)
      .send({
        name: 'an-updated-item',
        amount: '123456789',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestItemBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('DELETE /api/items/{test}', (done) => {
    request(app)
      .delete(`/api/items/${TestItemBody._id}`)
      .send({})
      .expect(200, done);
  });
});


describe('Suppliers HTTP REST API Routes', () => {
  it('POST /api/suppliers', (done) => {
    request(app)
      .post('/api/suppliers')
      .send({
        name: 'tester',
        address: 'tester@erp.com',
        telephone: 'test123',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestSupplierBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('GET /api/suppliers', (done) => {
    request(app)
      .get('/api/suppliers')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('GET /api/suppliers/{test}', (done) => {
    request(app)
      .get(`/api/suppliers/${TestSupplierBody._id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('PUT /api/suppliers', (done) => {
    request(app)
      .put(`/api/suppliers/${TestSupplierBody._id}`)
      .send({
        name: 'updatedTester',
        address: 'tester@erp.com',
        telephone: 'test12345',
      })
      .expect(200)
      .end((err, res) => {
        if (!err) {
          TestSupplierBody = res.body;
          done();
        } else {
          done(err);
        }
      });
  });

  it('DELETE /api/suppliers/{test}', (done) => {
    request(app)
      .delete(`/api/suppliers/${TestSupplierBody._id}`)
      .send({})
      .expect(200, done);
  });
});

