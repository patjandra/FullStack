const initialState = {
    tasks: [],
  };
  
  function taskReducer(state = initialState, action) {
    switch (action.type) {
      case 'add_task':
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case 'delete_task':
        return {
          ...state,
          tasks: state.tasks.filter((task) => task !== action.payload),
        };
      default:
        return state; 
    }
  }
  
  export default taskReducer; 