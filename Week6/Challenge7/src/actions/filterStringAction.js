export const searchFilter = (filterString) => {
    return {
      type: 'CHANGE_STRING',
      payload: {filterString}
    };
  };
  