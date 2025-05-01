import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../actions';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDeleteTask = (taskToDelete) => {
    dispatch(deleteTask(taskToDelete)); 
  };

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
