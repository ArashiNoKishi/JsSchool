export const selectView = (view) => {  
    return {
      type: 'CHANGE_VIEW',
      payload: view
    };
  };