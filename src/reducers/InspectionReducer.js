const INITIAL_STATE = {
  dataSource: [],
};

export default (state = INITIAL_STATE, action) => {
  const newState = {...state};

  if (action.type === 'SUMBIT_INSPECTION') {
    newState.dataSource = action.payload;
    return newState.dataSource;
  } else {
    return newState;
  }
};
