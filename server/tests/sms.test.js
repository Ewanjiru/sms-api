const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../server');

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

describe('test sms controller', async () => {
  before((done) => {
    mongoose.connect(process.env.TEST_DBURL, { useNewUrlParser: true });
    done();
  });

  it('Should throw an error if recipient is not supplied', (done) => {
    const sms = {
      recipient: '',
      message: 'Random message',
      sender: 'idtest',
    };

    chai.request(app)
      .post('/api/sms/')
      .send(sms)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        expect(res.text).equal(`"recipientId" is required`);
        done();
      });
  });

  it('Should throw an error if sender is not supplied', (done) => {
    chai.request(app)
      .get('/api/contacts/')
      .end((err, res) => {
        const recipientId = res.body[0]._id
        const sms = {
          recipientId,
          message: 'Random message',
          senderId: '',
        };

        chai.request(app)
          .post('/api/sms/')
          .send(sms)
          .end((err, res) => {
            should.exist(res);
            res.should.have.status(400);
            expect(res.text).equal(`"senderId" is not allowed to be empty`);
            done();
          });
      });
  });


  it('Should throw an error if message is not supplied', (done) => {
    chai.request(app)
      .get('/api/contacts/')
      .end((err, res) => {
        const recipientId = res.body[0]._id
        const senderId = res.body[1]._id
        const sms = {
          recipientId,
          message: '',
          senderId,
        };

        chai.request(app)
          .post('/api/sms/')
          .send(sms)
          .end((err, res) => {
            should.exist(res);
            res.should.have.status(400);
            expect(res.text).equal(`"message" is not allowed to be empty`);
            done();
          });
      });
  });

  it('Should succeffully add message', (done) => {
    chai.request(app)
      .get('/api/contacts/')
      .end((err, res) => {
        const recipientId = res.body[0]._id
        const senderId = res.body[1]._id
        const sms = {
          recipientId,
          message: 'Test message',
          senderId,
        };

        chai.request(app)
          .post('/api/sms/')
          .send(sms)
          .end((err, res) => {
            should.exist(res);
            res.should.have.status(201);
            done();
          });
      });
  });

  it('Should get all sms', (done) => {
    chai.request(app)
      .get('/api/sms/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        done();
      });
  });

  it('receive an error if contact does not exist or have messages', (done) => {
    chai.request(app)
      .get('/api/sms/')
      .end((err, res) => {
        const recipientId = res.body[0]._id
        chai.request(app)
          .get(`/api/sms?id=${recipientId}`)
          .end((err, res) => {
            res.should.have.status(404);
            expect(res.text).equal('{"Message":"That contact no longer exist or has not received or sent any messages"}');
            done();
          });
      });
  });

  it('Should return error if sms id is invalid', (done) => {
    chai.request(app)
      .get('/api/sms/tes6778888')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });


  it('Should return sms by Id', (done) => {
    chai.request(app)
      .get('/api/sms/')
      .end((err, res) => {
        const smsId = res.body[0]._id
        chai.request(app)
          .get(`/api/sms/${smsId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].should.have.property('_id').eql(smsId);
            done();
          });
      });
  });

  it('delete a contact successfully', (done) => {
    chai.request(app)
      .get(`/api/sms/`)
      .end((err, res) => {
        const smsId = res.body[0]._id;
        chai.request(app)
          .delete(`/api/sms/${smsId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('Message').eql('Successfully deleted');
            done();
          });
      });
  });

  it('cant delete a contact with an invalid id ', (done) => {
    chai.request(app)
      .delete('/api/sms/6363test')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('errors on delete of contact that does not exist ', (done) => {
    chai.request(app)
      .delete(`/api/sms/5d611cf72fd0237fd9aabde9`)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.text).equal('{"Message":"That sms does not exist"}');
        done();
      });
  });
});
