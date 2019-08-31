const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const newState = {...state};

  if (action.type === 'SUMBIT_INSPECTION') {
    return newState;
  } else {
    return newState;
  }
};
