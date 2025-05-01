import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from '../actions';

const TaskForm = () => {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();

    const handleAddTask = (e) => {
        e.preventDefault();

        if (task.trim()) {
            dispatch(addTask(task))
            setTask('');
        }
    };
    return (
        <div>
            <h2>Add a new task!</h2>
            <form onSubmit={handleAddTask}>
                <input type='text' value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task here"/>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;