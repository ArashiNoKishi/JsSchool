export const updateClipList = (clipList) => {
  return {
    type: 'UPDATE_CLIPLIST',
    payload: {clipList}
  };
};