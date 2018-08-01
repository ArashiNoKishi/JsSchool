export default function (state={id: 0, start: 0, end: 52}, action) {
  switch (action.type) {
    case 'CHANGE_CLIP':
      return action.payload.clip;
  }
  return state;
}