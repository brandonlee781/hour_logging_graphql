// tslint:disable:import-name max-line-length no-unused-expression
import * as chai from 'chai';
import * as Knex from 'knex';
import axios from 'axios';
import { DB } from '../src/core';

const should = chai.should();

const api = axios.create({
  baseURL: 'http://localhost:3000/graphql',
  headers: {
    Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY',
    'content-type': 'application/json',
  } 
});

describe('logs', () => {
  beforeEach((done) => {
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

  afterEach((done) => {
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
  
  describe('allLogs Query', () => {
    let res;
    let logs;
    const query = `
      {
        allLogs{
          logs {
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
    `;
    beforeEach(async () => {
      res = await api.post('/', { query });
      logs = res.data.data.allLogs.logs;
    });
  
    it('should return a status of 200', async () => {
      expect(res.status).toEqual(200);
      expect(logs).toBeDefined();
    });

    it('Should be an array and 100 items long', async () => {
      res.data.data.allLogs.logs.should.be.an('array');
      res.data.data.allLogs.logs.should.have.lengthOf(100);
    });

    it('should be an array of valid log items', async () => {
      logs.forEach((log) => {
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
    });

  });

  describe('oneLog Query', () => {
    let uuid;
    let res;
    let query;
    let log;

    beforeEach(async () => {
      const logs = await DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
        .from('logs')
        .join('projects', { project_id: 'projects.id' });
      uuid = logs[0].id;
      query = `
        {
          oneLog(input: {
            id:"${uuid}"
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
      `;
      res = await api.post('/', { query });
      log = res.data.data.oneLog.log;
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(log).toBeDefined();
    });

    it('should get a single object', async () => {
      log.should.be.an('object');
    });

    it('should be a valid log', async () => {
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

  });

  describe('allLogsByProjectName', () => {
    let project;
    let query;
    let res;
    let logs;
    beforeEach(async () => {
      const projects = await DB.select().from('projects');
      project = projects[0];
      query = `
        {
          allLogsByProjectName(input:{name:"${project.name}"}){
            logs{
              date,
              startTime,
              endTime,
              duration,
              project{
                id,
                name
              },
              note
            }
          }
        }
      `;
      res = await api.post('/', { query });
      logs = res.data.data.allLogsByProjectName.logs;
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(logs).toBeDefined();
    });

    it('should return an array of valid logs', async () => {
      logs.should.be.an('array');
      logs.forEach((log) => {
        log.should.have.keys('date', 'startTime', 'endTime', 'duration', 'project', 'note');
      });
    });

    it('should have an array of logs all associated with orignal project', async () => {
      logs.forEach((log) => {
        log.project.should.have.keys('id', 'name');
        log.project.id.should.be.a('string');
        log.project.name.should.be.a('string');
        expect(log.project.id).toEqual(project.id);
        expect(log.project.name).toEqual(project.name);
      });
    });

  });

  describe('allLogsByProjectId', () => {
    let project;
    let query;
    let res;
    let logs;
    beforeEach(async () => {
      try {
        const projects = await DB.select().from('projects');
        project = projects[0];
        query = `
          {
            allLogsByProjectId(input:{id:"${project.id}"}){
              logs{
                date,
                startTime,
                endTime,
                duration,
                project{
                  id,
                  name
                },
                note
              }
            }
          }
        `;
        res = await api.post('/', { query });
        logs = res.data.data.allLogsByProjectId.logs;
      } catch (err) {
        throw err;
      }
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
    });

    it('should return an array of valid logs', async () => {
      logs.should.be.an('array');
      logs.forEach((log) => {
        log.should.have.keys('date', 'startTime', 'endTime', 'duration', 'project', 'note');
      });
    });

    it('should have an array of logs all associated with orignal project', async () => {
      logs.forEach((log) => {
        log.project.should.have.keys('id', 'name');
        log.project.id.should.be.a('string');
        log.project.name.should.be.a('string');
        expect(log.project.id).toEqual(project.id);
        expect(log.project.name).toEqual(project.name);
      });
    });
  });

  describe('createLog Mutation', () => {
    let projectId;
    let query;
    let res;
    let newLog;
    beforeEach(async () => {
      const projects = await DB.select().from('projects');
      projectId = projects[0].id;
      query = `
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
      `;
      res = await api.post('/', { query });
      newLog = res.data.data.createLog.log;
    });

    it('should get a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(newLog).toBeDefined();
    });

    it('should create a valid log item', async () => {
      newLog.should.be.an('object');
      newLog.should.have.keys('id', 'date', 'project');
    });

    it('should be associated with the correct project', async () => {
      newLog.project.id.should.eql(projectId);
    });
  });

  describe('updateLog Mutation', () => {
    let query;
    let logs;
    let res;
    let originalLog;
    let updatedLog;
    let returnedLog;
    beforeEach(async () => {
      logs = await DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
        .from('logs')
        .join('projects', { project_id: 'projects.id' });
      originalLog = logs[0];
      updatedLog = Object.assign({},originalLog, { note: 'Hello, this is new' });
      query = `
        mutation{
          updateLog(input:{
            id:"${updatedLog.id}"
            patch:{
              note:"${updatedLog.note}"
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
      `;
      res = await api.post('/', { query });
      returnedLog = res.data.data.updateLog.log;
    });

    it ('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(returnedLog).toBeDefined();
    });

    it('should return a single log item', async () => {
      returnedLog.should.be.an('object');
    });

    it('should return an object that is identical to the sent object', () => {
      expect(returnedLog.id).toEqual(updatedLog.id);
      expect(new Date(updatedLog.date).toString()).toEqual(new Date(updatedLog.date).toString());
      expect(returnedLog.startTime).toEqual(updatedLog.start_time);
      expect(returnedLog.endTime).toEqual(updatedLog.end_time);
      expect(returnedLog.duration).toEqual(updatedLog.duration);
      expect(returnedLog.project.id).toEqual(updatedLog.project_id);
      returnedLog.note.should.equal('Hello, this is new');
    });
  });

  describe('deleteLog Mutation', () => {
    let query;
    let logs;
    let res;
    let log;
    beforeEach(async () => {
      try {
        logs = await DB.select('logs.*', 'projects.id as project_id', 'projects.name as project_name')
          .from('logs')
          .join('projects', { project_id: 'projects.id' });
        log = logs[0];
        query = `
          mutation{
            deleteLog(input:{
              id:"${log.id}"
            }) {
              numberOfDeleted
            }
          }
        `;
        res = await api.post('/', { query });
      } catch (err) {
        throw err;
      }
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
    });

    it('should return the number of deleted records', async () => {
      res.data.data.deleteLog.numberOfDeleted.should.be.a('number');
      res.data.data.deleteLog.numberOfDeleted.should.equal(1);
    });
  });
});
