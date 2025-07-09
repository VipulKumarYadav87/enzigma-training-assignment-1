import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/controller.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

//Export the router as default
export default router;
