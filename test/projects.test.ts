// tslint:disable:import-name max-line-length no-unused-expression
import * as chai from 'chai';
import * as Knex from 'knex';
import axios from 'axios';
import { DB } from '../src/core';
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const api = axios.create({
  baseURL: 'http://localhost:3000/graphql',
  headers: {
    Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY',
    'content-type': 'application/json',
  } 
});

describe('projects', () => {
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

  describe('allProjects Query', () => {
    let res;
    let projects;
    const query = `
      {
        allProjects{
          projects{
            id,
            name
          }
        }
      }
    `;
    beforeEach(async () => {
      res = await api.post('/', { query });
      projects = res.data.data.allProjects.projects;
    });

    it('should return a status of 200', async () => {
      expect(res.status).toEqual(200);
      expect(projects).toBeDefined();
    });

    it('should be an array and 10 items long', async () => {
      projects.should.be.an('array');
      projects.should.have.lengthOf(10);
    });

    it('should be an array of valid project items', async () => {
      projects.forEach((project) => {
        project.should.be.an('object');
        project.should.have.keys('id', 'name');
        project.id.should.be.a('string');
        project.name.should.be.a('string');
      });
    });
  });

  describe('oneProject Query', () => {
    let uuid;
    let res;
    let query;
    let project;

    beforeEach(async() => {
      try {
        const projects = await DB.select().from('projects');
        uuid = projects[0].id;
        query = `
          {
            oneProject(input:{
              id:"${uuid}"
            }) {
              project{
                id,
                name
              }
            }
          }
        `;
        res = await api.post('/', { query });
        project = res.data.data.oneProject.project;
      } catch (err) {
        throw err;
      }
    });

    it('should return a status code of 200', async () => {
      expect(res.status).toEqual(200);
      expect(project).toBeDefined();
    });

    it('should return a single object', async () => {
      project.should.be.an('object');
    });

    it('should return a valid project', async () => {
      project.should.have.keys('id', 'name');
      project.name.should.be.a('string');
      project.id.should.be.a('string');
    });
  });

  describe('createProject Mutation', () => {
    let query;
    let res;
    let newProject;
    beforeEach(async () => {
      try {
        query = `
          mutation{
            createProject(input:{
              project:{
                name:"newProject.project"
              }
            }) {
              project{
                id,
                name
              }
            }
          }
        `;
        res = await api.post('/', { query });
        newProject = res.data.data.createProject.project;
      } catch (err) {
        throw err;
      }
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(newProject).should.exist;
    });

    it('should create a valid project', async () => {
      newProject.should.be.an('object');
      newProject.should.have.keys('id', 'name');
      newProject.id.should.be.a('string');
      newProject.name.should.be.a('string');
    });
  });

});