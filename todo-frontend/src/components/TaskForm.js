import React, { useEffect, useState } from 'react';
import { createTask, updateTask } from '../services/taskService';
import './TaskForm.css';

const TaskForm = ({ refreshTasks, editableTask, setEditableTask, closeForm }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    comments: ''
  });

  useEffect(() => {
    if (editableTask) {
      setFormData(editableTask);
    }
  }, [editableTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableTask) {
      await updateTask(editableTask._id, formData);
      setEditableTask(null);
    } else {
      await createTask(formData);
    }
    closeForm();
    refreshTasks();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="task-form">
        <h3>{editableTask ? 'Edit Task' : 'New Task'}</h3>

        <div className="form-row">
          <label>Assigned To *</label>
          <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Status *</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="form-row">
          <label>Due Date *</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Priority *</label>
          <select name="priority" value={formData.priority} onChange={handleChange} required>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={closeForm} className="cancel">Cancel</button>
          <button type="submit" className="save">Save</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
