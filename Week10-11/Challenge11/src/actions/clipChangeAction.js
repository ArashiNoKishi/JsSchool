export const changeClip = (clip={id: 0, start: 0, end: 52}) => {
  return {
    type: 'CHANGE_CLIP',
    payload: {clip}
  };
};