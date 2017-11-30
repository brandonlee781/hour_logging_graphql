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

describe('invoices', () => {
  beforeAll(async () => {
    await DB.migrate.rollback({ directory: './src/database/migrations', tableName: 'version' });
    await DB.migrate.latest({ directory: './src/database/migrations', tableName: 'version' });
    await DB.seed.run({ directory: './src/database/seeds' });
  });

  afterEach(async () => {
    await DB.migrate.rollback({ directory: './src/database/migrations', tableName: 'version' });
    await DB.migrate.latest({ directory: './src/database/migrations', tableName: 'version' });
    await DB.seed.run({ directory: './src/database/seeds' });
  });

  describe('allInvoices Query', () => {
    let res;
    let invoices;
    const query = `
      {
        allInvoices{
          invoices{
            id,
            number,
            date,
            hours,
            rate,
            logs{
              id,
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
      }
    `;

    beforeAll(async () => {
      res = await api.post('/', { query });
      invoices = res.data.data.allInvoices.invoices;
    });

    it('should return a status of 200', async () => {
      expect(res.status).toEqual(200);
      expect(invoices).toBeDefined();
    });

    it('should return an array with 10 times', async () => {
      invoices.should.be.an('array');
      invoices.should.have.lengthOf(10);
    });

    it('should be an array of valid invoice items', async () => {
      invoices.forEach((invoice) => {
        invoice.should.be.an('object');
        invoice.should.have.keys('id', 'number', 'date', 'hours', 'rate', 'logs');
        invoice.id.should.be.a('string');
        invoice.number.should.be.a('number');
        invoice.date.should.be.a('string');
        invoice.hours.should.be.a('number');
        invoice.rate.should.be.a('number');
        invoice.logs.should.be.an('array');
      });
    });

    it('should have an array of valid logs', async () => {
      invoices.forEach((invoice) => {
        invoice.logs.forEach((log) => {
          log.should.be.an('object');
          log.should.have.keys('id', 'date', 'startTime', 'endTime', 'duration', 'project', 'note');
          log.id.should.be.a('string');
          log.date.should.be.a('string');
          log.startTime.should.be.a('string');
          log.endTime.should.be.a('string');
          log.duration.should.be.a('number');
          log.project.should.be.a('object');
          log.project.should.have.keys('id', 'name');
          log.project.id.should.be.a('string');
          log.project.name.should.be.a('string');
          log.note.should.be.a('string');
        });
      });
    });

    it('should have an hours value that matches the sum of all the log durations', async () => {
      invoices.forEach((invoice) => {
        const durationArr = invoice.logs.map(log => log.duration);
        const total = durationArr.reduce((a, b) => a + b);
        invoice.hours.should.equal(total);
      });
    });
  });

  describe('oneInvoice Query', () => {
    let res;
    let invoice;
    let query;
    beforeAll(async () => {
      const invoices = await DB.select().from('invoices');
      query = `
        {
          oneInvoice(input:{
            id:"${invoices[0].id}"
          }) {
            invoice{
              id,
              number,
              date,
              hours,
              rate,
              logs{
                id,
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
        }
      `;
      res = await api.post('/', { query });
      invoice = res.data.data.oneInvoice.invoice;
    });

    it('should return a status of 200', async () => {
      expect(res.status).toEqual(200);
      expect(invoice).toBeDefined();
    });

    it('should return a single object', async () => {
      invoice.should.be.an('object');
    });

    it('should be a valid invoice item', async () => {
      invoice.should.be.an('object');
      invoice.should.have.keys('id', 'number', 'date', 'hours', 'rate', 'logs');
      invoice.id.should.be.a('string');
      invoice.number.should.be.a('number');
      invoice.date.should.be.a('string');
      invoice.hours.should.be.a('number');
      invoice.rate.should.be.a('number');
      invoice.logs.should.be.an('array');
    });

    it('should have an array of valid logs', async () => {
      invoice.logs.forEach((log) => {
        log.should.be.an('object');
        log.should.have.keys('id', 'date', 'startTime', 'endTime', 'duration', 'project', 'note');
        log.id.should.be.a('string');
        log.date.should.be.a('string');
        log.startTime.should.be.a('string');
        log.endTime.should.be.a('string');
        log.duration.should.be.a('number');
        log.project.should.be.a('object');
        log.project.should.have.keys('id', 'name');
        log.project.id.should.be.a('string');
        log.project.name.should.be.a('string');
        log.note.should.be.a('string');
      });
    });

    it('should have an hours value that matches the sum of all the log durations', async () => {
      const durationArr = invoice.logs.map(log => log.duration);
      const total = durationArr.reduce((a, b) => a + b);
      invoice.hours.should.equal(total);
    }); 
  });

  describe('createInvoice Mutation', () => {
    let query;
    let res;
    let logs;
    let newInvoice;
    beforeAll(async () => {
      try {
        logs = await DB.select().from('logs').limit(10);
        const durations = logs.map(log => log.duration);
        const total = durations.reduce((a, b) => a + b);
        const logIds = logs.map(log => log.id);
        query = `
          mutation{
            createInvoice(input:{
              invoice:{
                number: 11,
                date:"2017-11-30",
                hours: ${total},
                rate: 25,
                logs:${JSON.stringify(logIds)}
              }
            }) {
              invoice{
                id,
                number,
                date,
                hours,
                rate,
                logs{
                  id,
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
          }
        `;
        res = await api.post('/', { query });
        newInvoice = res.data.data.createInvoice.invoice;
      } catch (err) {
        throw err;
      }
    });

    it('should return a status code 200', async () => {
      expect(res.status).toEqual(200);
      expect(newInvoice).toBeDefined();
    });

    it('should return a valid invoice', async () => {
      newInvoice.should.be.an('object');
      newInvoice.should.have.keys('id', 'number', 'date', 'hours', 'rate', 'logs');
      newInvoice.id.should.be.a('string');
      newInvoice.number.should.be.a('number');
      newInvoice.date.should.be.a('string');
      newInvoice.hours.should.be.a('number');
      newInvoice.rate.should.be.a('number');
      newInvoice.logs.should.be.a('array');
    });

    it('should have an array of valid logs', async () => {
      newInvoice.logs.forEach((log) => {
        log.should.be.an('object');
        log.should.have.keys('id', 'date', 'startTime', 'endTime', 'duration', 'project', 'note');
        log.id.should.be.a('string');
        log.date.should.be.a('string');
        log.startTime.should.be.a('string');
        log.endTime.should.be.a('string');
        log.duration.should.be.a('number');
        log.project.should.be.a('object');
        log.project.should.have.keys('id', 'name');
        log.project.id.should.be.a('string');
        log.project.name.should.be.a('string');
        log.note.should.be.a('string');
      });
    });

    it('should have an hours value that matches the sum of all the log durations', async () => {
      const durationArr = newInvoice.logs.map(log => log.duration);
      const total = durationArr.reduce((a, b) => a + b);
      newInvoice.hours.should.equal(total);
    });
  });
});