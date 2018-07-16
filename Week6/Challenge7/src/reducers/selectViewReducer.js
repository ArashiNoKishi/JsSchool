export default function (state='itemView', action) {
    switch (action.type) {
      case 'CHANGE_VIEW':
        return action.payload;
        break;
    }
    return state;
  }