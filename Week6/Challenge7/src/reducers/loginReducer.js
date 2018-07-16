export default function (state={user:{},logIn: false}, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload;
      break;
  }
  return state;
}
