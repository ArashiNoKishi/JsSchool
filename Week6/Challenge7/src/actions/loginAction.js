export const logIn = (user) => {  
  return {
    type: 'LOG_IN',
    payload: {user}
  };
};