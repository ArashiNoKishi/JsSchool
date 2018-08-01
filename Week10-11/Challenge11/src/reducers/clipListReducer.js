export default function (state=null, action) {
  switch (action.type) {
    case 'UPDATE_CLIPLIST':
      localStorage.setItem('clipList', JSON.stringify(action.payload.clipList));
      return action.payload.clipList;
    }

  return state;
}