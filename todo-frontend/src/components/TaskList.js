import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm';
import './TaskList.css';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteTaskName, setDeleteTaskName] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const itemsPerPage = 10;

  // Load all tasks from the API and update local state
  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
    setFilteredTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tasks.filter(task =>
      task.assignedTo?.toLowerCase().includes(term) ||
      task.status?.toLowerCase().includes(term) ||
      task.priority?.toLowerCase().includes(term) ||
      task.comments?.toLowerCase().includes(term)
    );
    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (task) => {
    setEditableTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const toggleDropdown = (taskId) => {
    setOpenDropdownId(prevId => (prevId === taskId ? null : taskId));
  };

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="task-container">
      <div className="task-header">
        <div className="task-heading">
          {/* <div className="icon">📋</div> */}
          <div className="icon"><FaBars /></div>
          <div>
            <h2>Tasks</h2>
            <p>All Tasks</p>
          </div>
        </div>
        <div className="task-actions">
          <button onClick={() => { setEditableTask(null); setShowForm(true); }}>New Task</button>
          <button onClick={loadTasks}>Refresh</button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <tr key={task._id}>
                <td><input type="checkbox" /></td>
                <td className="link">{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
                <td className="actions-column">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      onClick={() => toggleDropdown(task._id)}
                    >
                      ⋮
                    </button>
                    {openDropdownId === task._id && (
                      <div className="dropdown-menu">
                        <div onClick={() => handleEdit(task)}>Edit</div>
                        <div
                          onClick={() => {
                            setDeleteTaskId(task._id);
                            setDeleteTaskName(task.assignedTo);
                            setShowDeletePopup(true);
                            setOpenDropdownId(null);
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                <FaSearch style={{ marginRight: '5px' }} />
                No tasks found for <strong>"{searchTerm}"</strong>
              </td>
            </tr>

          )}
        </tbody>

      </table>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-controls">
          <button onClick={goToFirst} disabled={currentPage === 1}>❮ First</button>
          <button onClick={goToPrev} disabled={currentPage === 1}>‹ Prev</button>
          <span>{currentPage}</span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>Next ›</button>
          <button onClick={goToLast} disabled={currentPage === totalPages}>Last ❯</button>
        </div>
      </div>


      {/* Show form modal */}
      {showForm && (
        <TaskForm
          refreshTasks={loadTasks}
          editableTask={editableTask}
          setEditableTask={setEditableTask}
          closeForm={() => setShowForm(false)}
        />
      )}

      {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-header">Delete</div>
          <div className="popup-body">
            <p>Do you want to delete task <strong>{deleteTaskName}</strong>?</p>
            <div className="popup-buttons">
              <button className="no" onClick={() => setShowDeletePopup(false)}>No</button>
              <button
                className="yes"
                onClick={async () => {
                  await handleDelete(deleteTaskId);
                  setShowDeletePopup(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TaskList;
