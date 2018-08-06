export const autoPlay = (autoPlay) => {
  return {
    type: 'TOGGLE_AUTOPLAY',
    payload: {autoPlay}
  };
};