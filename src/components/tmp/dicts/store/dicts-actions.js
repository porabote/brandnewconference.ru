import {
  REQUEST_DICTS,
  REQUEST_DICTS_SUCCEEDED,
  REQUEST_DICTS_ERROR
} from './dicts-types';

const requestDicts = (dictsRequired, componentAlias) => {
  return { type: REQUEST_DICTS, payload: { dictsRequired, componentAlias } }
};

const requestDictsSuccess = (data, componentAlias) => {
  return { type: REQUEST_DICTS_SUCCEEDED, payload: { data, componentAlias} }
};

const requestDictsError = (error) => {
  return { type: REQUEST_DICTS_ERROR, payload: error }
};

export { requestDicts, requestDictsSuccess, requestDictsError }