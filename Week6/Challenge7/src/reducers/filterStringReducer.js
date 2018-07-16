export default function (state='', action) {
    switch (action.type) {
      case 'CHANGE_STRING':      
        return action.payload.filterString;
        break;
    }
    return state;
  }
  