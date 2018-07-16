export default function (state='All', action) {
    switch (action.type) {
      case 'CHANGE_SHELF':
        return action.payload;
        break;
    }
    return state;
  }
  