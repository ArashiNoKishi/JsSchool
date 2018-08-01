export default function (state='', action) {
  switch (action.type) {
    case 'CHANGE_STRING':      
      return action.payload.filterString;
  }
  return state;
}