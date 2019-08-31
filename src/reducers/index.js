import {combineReducers} from 'redux';
import InspectionReducer from './InspectionReducer';

export default combineReducers({
  inspectionSubmitted: InspectionReducer,
});
