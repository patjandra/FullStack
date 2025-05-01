export const addTask = (task) => {
    return {
      type: 'add_task',
      payload: task,
    };
  };
  
  export const deleteTask = (task) => {
    return {
      type: 'delete_task',
      payload: task,
    };
  };