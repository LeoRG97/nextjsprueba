const makeType = (modulo) => ({
  FETCH_SUCCESS: `${modulo}/FETCH_SUCCESS`,
  FETCH_ERROR: `${modulo}/FETCH_ERROR`,
  FETCH_START: `${modulo}/FETCH_START`,
  POST_SUCCESS: `${modulo}/POST_SUCCESS`,
  POST_ERROR: `${modulo}/POST_ERROR`,
  POST_START: `${modulo}/POST_START`,
  DELETE_SUCCESS: `${modulo}/POST_SUCCESS`,
  DELETE_ERROR: `${modulo}/POST_ERROR`,
  DELETE_START: `${modulo}/POST_START`,
  UPDATE_SUCCESS: `${modulo}/UPDATE_SUCCESS`,
  UPDATE_ERROR: `${modulo}/UPDATE_ERROR`,
  UPDATE_START: `${modulo}/UPDATE_START`,
  FILTER: `${modulo}/UPDATE_START`,
});

const makeActionCreator = (type, ...argsNames) => (...args) => {
  const action = { type };
  argsNames.forEach((arg, index) => {
    action[argsNames[index]] = args[index];
  });
  return action;
};

const makeReducer = (initialState, handlers = {}) => (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) return state;
  return handlers[action.type](state, action);
};

export {
  makeType,
  makeActionCreator,
  makeReducer,
};
