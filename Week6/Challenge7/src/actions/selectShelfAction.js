export const selectShelf = (shelf) => {  
    return {
      type: 'CHANGE_SHELF',
      payload: shelf
    };
  };