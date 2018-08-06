export default function (state={id: 0, list: []}, action) {
  switch (action.type) {
    case 'UPDATE_CLIPLIST':
      let clipList = Object.assign({},action.payload.clipList);
      return clipList;
    }

  return state;
}