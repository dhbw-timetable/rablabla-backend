var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('event_controller', function() {

    describe('GET /events', function() {

      it('should return something without an error', function(done) {

        request(server)
          .get('/events')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            shoudl.exist(res.body);

            done();
          });
      });

    });

  });

});
