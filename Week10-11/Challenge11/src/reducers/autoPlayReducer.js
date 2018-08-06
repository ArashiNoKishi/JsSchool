export default function (state=false, action) {
  switch (action.type) {
    case 'TOGGLE_AUTOPLAY':
      return action.payload.autoPlay;
  }
  return state;
}