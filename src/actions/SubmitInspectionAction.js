import {SUMBIT_INSPECTION} from './types';
export const submitInspection = value => {
  return {
    type: SUMBIT_INSPECTION,
    payload: value,
  };
};
