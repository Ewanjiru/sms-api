const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../server');

const expect = chai.expect();
const should = chai.should();
chai.use(chaiHttp);

describe('test contacts controller', async () => {
  before((done) => {
    mongoose.connect(`${process.env.TEST_DBURL}`, { useNewUrlParser: true });
    done();
  });

  it('Should throw an error if name not supplied', (done) => {
    const contact = {
      name: '',
      phoneNumber: '0705925432',
    };

    chai.request(app)
      .post('/api/contacts/')
      .send(contact)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        done();
      });
  });

  it('Should throw an error if phone length less than 10 digits', (done) => {
    const contact = {
      name: 'TestName',
      phoneNumber: '2',
    };

    chai.request(app)
      .post('/api/contacts/')
      .send(contact)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        done();
      });
  });

  it('Should create a new contact', (done) => {
    const contact = {
      name: 'TestName',
      phoneNumber: '0723457802',
    };

    chai.request(app)
      .post('/api/contacts/')
      .send(contact)
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(201);
        res.body.should.have.property('_id');
        done();
      });
  });

  it('Should get all contacts', (done) => {
    chai.request(app)
      .get('/api/contacts/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        done();
      });
  });

  it('Should return error if contact id is invalid', (done) => {
    chai.request(app)
      .get('/api/contacts/tes6778888')
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        done();
      });
  });

  it('get one contact successfully', (done) => {
    const body = chai.request(app)
      .get(`/api/contacts/`)
      .end((err, res) => {
        const contactId = res.body[0]._id;
        chai.request(app)
          .get(`/api/contacts/${contactId}`)
          .end((err, res) => {
            should.exist(res.body);
            res.body.should.have.property('_id').eql(contactId);
            done();
          });
      });
  });

  it('updates contact successfully', (done) => {
    chai.request(app)
      .get(`/api/contacts/`)
      .end((err, res) => {
        const contactId = res.body[0]._id;
        const newBody = {
          name: 'Josephine'
        }
        chai.request(app)
          .put(`/api/contacts/${contactId}`)
          .send(newBody)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Successfully updated');
            done();
          });
      });
  });

  it('returns error if that contact does not exist ', (done) => {
    const contact = {
      name: 'Does Exist',
      phone: '0702543788',
    };
    chai.request(app)
      .put(`/api/contacts/tests`)
      .send(contact)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('delete a contact successfully', (done) => {
    chai.request(app)
      .get(`/api/contacts/`)
      .end((err, res) => {
        const contactId = res.body[0]._id;
        chai.request(app)
          .delete(`/api/contacts/${contactId}`)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Successfully deleted');
            done();
          });
      });
  });

  it('errors on delete of contact that does not exist ', (done) => {
    chai.request(app)
      .delete(`/api/contacts/5d611cf72fd0237fd9aabde9`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
