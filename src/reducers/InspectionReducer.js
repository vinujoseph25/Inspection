const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState = [...state];
  if (action.type === 'SUMBIT_INSPECTION') {
    newState = action.payload;
  }
  return newState;
};
