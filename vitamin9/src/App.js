import './App.css';
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 justify-content='center'>To-Do List</h1>
      </header>
      
      <TaskForm></TaskForm>

      <TaskList></TaskList>

    </div>
  );
}

export default App;
