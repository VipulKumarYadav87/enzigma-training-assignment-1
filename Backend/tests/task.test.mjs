
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import Task from '../models/model.js';

const { expect } = chai;

chai.use(chaiHttp);

// describe('Task API', () => {     when we do unit testionf at that time id un comment it it will remove the all existing data and add this hard coded values only
//   before(async () => {
//     await Task.deleteMany({});
//   });

  it('GET /api/tasks should return all tasks', (done) => {
    chai
      .request(app)
      .get('/api/tasks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /api/task should create a task', (done) => {
    const newTask = {
      assignedTo: 'Vipul',
      status: 'Not Started',
      dueDate: '2025-07-15',
      priority: 'High',
      comments: 'From test',
    };

    chai
      .request(app)
      .post('/api/task')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('assignedTo', 'Vipul');
        done();
      });
  });

