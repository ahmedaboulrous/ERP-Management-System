const mocha = require('mocha');
const { assert } = require('chai');

const { before } = require('mocha');
const { after } = require('mocha');
const { describe } = require('mocha');
const { it } = require('mocha');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const BillModel = require('../models/bill');
const ClientModel = require('../models/client');
const ExpenseModel = require('../models/expense');
const ItemModel = require('../models/item');
const SupplierModel = require('../models/supplier');

let TestBillBody;
let TestClientBody;
let TestExpenseBody;
let TestItemBody;
let TestSupplierBody;

describe('Bill Model in the database', () => {
  before((done) => {
    TestBillBody = new BillModel({
      description: 'the-777777-model-description',
      client_name: 'a-client-name',
      total_cost: '999',
      issuer_id: '7777',
      issuing_time: '28-04-2015',
    });
    done();
  });

  it('Saving a bill to the database', (done) => {
    TestBillBody.save().then(() => {
      assert(TestBillBody.isNew === false);
      done();
    });
  });

  it('Finding the saved bill by _id', (done) => {
    BillModel.findOne({ _id: TestBillBody._id }).then((result) => {
      assert(TestBillBody._id === result._id);
      done();
    });
  });

  it('Removing the saved bill from the database by _id', (done) => {
    BillModel.findOneAndRemove({ _id: TestBillBody._id }).then((result) => {
      assert(TestBillBody._id === result._id);
      done();
    });
  });
});
