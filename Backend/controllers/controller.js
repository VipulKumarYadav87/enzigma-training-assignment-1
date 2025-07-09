import Task from '../models/model.js';

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create task
export const createTask = async (req, res) => {
  try {
    const { assignedTo, status, dueDate, priority, comments } = req.body;
    const task = await Task.create({ assignedTo, status, dueDate, priority, comments });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
