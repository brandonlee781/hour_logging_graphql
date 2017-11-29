// tslint:disable:import-name max-line-length
import * as chai from 'chai';
import * as Knex from 'knex';
import { DB } from '../src/core';
import { allLogsQuery } from './logQueries';
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('logs', () => {
  before((done) => {
    DB.migrate.rollback({ directory: './src/database/migrations', tableName: 'version' })
    .then(() => {
      DB.migrate.latest({ directory: './src/database/migrations', tableName: 'version' })
      .then(() => {
        return DB.seed.run({ directory: './src/database/seeds' })
          .then(() => {
            done();
          });
      });
    });
    
  });

  // after((done) => {
  //   DB.migrate.rollback({ directory: './src/database/migrations', tableName: 'version' })
  //     .then(() => {
  //       done();
  //     });
  // });
  
  describe('allLogs Query', () => {
  
    it ('should get all logs', (done) => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set('content-type', 'application/json')
        .set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY')
        .send({
          query: allLogsQuery
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.allLogs.should.be.a('array');
          res.body.data.allLogs.length.should.be.eql(100);
          res.body.data.allLogs.forEach((log) => {
            log.should.be.a('object');
            log.should.have.keys('id', 'date', 'startTime', 'endTime', 'duration', 'project', 'note');
            log.id.should.be.a('string');
            log.date.should.be.a('string');
            log.startTime.should.be.a('string');
            log.endTime.should.be.a('string');
            log.duration.should.be.a('number');
            log.duration.should.be.above(0);
            log.note.should.be.a('string');
            log.project.should.be.a('object');
            log.project.should.have.keys('name', 'id');
            log.project.id.should.be.a('string');
            log.project.name.should.be.a('string');
          });
          done();
        });
    });

  });

  describe('oneLog Query', () => {
    let uuid;
    let api;
    let query;

    before((done) => {
      DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
        .from('logs')
        .join('projects', { project_id: 'projects.id' })
        .then((logs) => {
          uuid = logs[0].id;
          done();
        })
        .catch(err => console.error(err));
    });
    beforeEach((done) => {
      api = chai.request('http://localhost:3000')
        .post('/graphql')
        .set('content-type', 'application/json')
        .set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY');
      query = `
        {
          oneLog(id:"${uuid}") {
            id,
            date,
            startTime,
            endTime,
            duration,
            project {
              id,
              name
            },
            note
          }
        }
      `;
      done();
    });

    it('should get a single log', (done) => {
      api.send({
        query
      })
      .end((err, res) => {
        const log = res.body.data.oneLog;
        res.should.have.status(200);
        log.should.be.an('object');
        done();
      });
    });

    it('should be a valid log', (done) => {
      api.send({
        query
      })
      .end((err, res) => {
        const log = res.body.data.oneLog;
        log.should.have.keys('id', 'date', 'startTime', 'endTime', 'duration', 'project', 'note');
        log.id.should.be.a('string');
        log.date.should.be.a('string');
        log.startTime.should.be.a('string');
        log.endTime.should.be.a('string');
        log.duration.should.be.a('number');
        log.duration.should.be.above(0);
        log.note.should.be.a('string');
        log.project.should.be.a('object');
        log.project.should.have.keys('name', 'id');
        log.project.id.should.be.a('string');
        log.project.name.should.be.a('string');
        done(); 
      });
    });

  });

  describe('createLog Mutation', () => {
    let api;
    let projectId;
    before((done) => {
      DB.select().from('projects')
        .then((projects) => {
          projectId = projects[0].id;
          done();
        });
    });
    beforeEach((done) => {
      api = chai.request('http://localhost:3000')
        .post('/graphql')
        .set('content-type', 'application/json')
        .set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY');
      done();
    });

    it('gets a success response and returns valid data', (done) => {
      api.send({
        query: `
          mutation {
            createLog(input: {
              log:{
                date:"2016-08-13",
                startTime:"08:00",
                endTime:"12:00",
                duration:4,
                note:"This is a test",
                projectId:"${projectId}"
              }
            }) {
              log{
                id,
                date,
                project {
                  id,
                  name
                }
              }
            }
          }
        `
      })
      .end((err, res) => {
        const newLog = res.body.data.createLog.log;
        res.should.have.status(200);
        newLog.should.be.an('object');
        newLog.should.have.keys('id', 'date', 'project');
        newLog.project.id.should.eql(projectId);
        done();
      });
    });
  });

  describe('updateLog Mutation', () => {
    let api;
    let log;
    before((done) => {
      DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from('logs')
      .join('projects', { project_id: 'projects.id' })
      .then((logs) => {
        log = logs[0];
        done();
      });
    });
    beforeEach((done) => {
      api = chai.request('http://localhost:3000')
        .post('/graphql')
        .set('content-type', 'application/json')
        .set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY');
      done();
    });
    it('should modify and return the modified object', (done) => {
      const newLog = Object.assign({}, log, { note: 'Hello, this is new' });
      api.send({
        query: `
          mutation{
            updateLog(input:{
              id:"${newLog.id}"
              patch:{
                note:"${newLog.note}"
              }
            }) {
              log{
                id,
                date,
                startTime,
                endTime,
                duration,
                project {
                  id,
                  name
                },
                note
              }
            }
          }
        `
      })
      .end((err, res) => {
        const updatedLog = res.body.data.updateLog.log;
        res.should.have.status(200);
        expect(updatedLog.id).to.equal(newLog.id);
        expect(new Date(updatedLog.date).toString()).to.equal(new Date(newLog.date).toString());
        expect(updatedLog.startTime).to.equal(newLog.start_time);
        expect(updatedLog.endTime).to.equal(newLog.end_time);
        expect(updatedLog.duration).to.equal(newLog.duration);
        expect(updatedLog.project.id).to.equal(newLog.project_id);
        updatedLog.note.should.equal('Hello, this is new');
        done();
      });
    });
  });

  describe('deleteLog Mutation', () => {
    let api;
    let log;
    before((done) => {
      DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
      .from('logs')
      .join('projects', { project_id: 'projects.id' })
      .then((logs) => {
        log = logs[0];
        done();
      });
    });
    beforeEach((done) => {
      api = chai.request('http://localhost:3000')
        .post('/graphql')
        .set('content-type', 'application/json')
        .set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY');
      done();
    });
    it('should delete a record', (done) => {
      api.send({
        query: `
          mutation{
            deleteLog(input:{
              id:"${log.id}"
            }) {
              numberOfDeleted
            }
          }
        `
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.deleteLog.numberOfDeleted.should.eql(1);
        done();
      });
    });
  });
});
