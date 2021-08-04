import { makeType, makeActionCreator, makeReducer } from '../creators';

export default (resource) => {
  const { POST_SUCCESS, POST_ERROR, POST_START } = makeType(resource);

  const LOGOUT = 'LOGOUT';

  const initialState = {
    data: {},
    isAuthenticated: true,
    fetched: false,
    fetching: false,
  };

  const logout = makeActionCreator(LOGOUT);
  const postStart = makeActionCreator(POST_START);
  const postSuccess = makeActionCreator(POST_SUCCESS);
  const postError = makeActionCreator(POST_ERROR);

  const postStartReduce = (state) => ({
    ...state, fetching: true,
  });
  const postSuccessReduce = (state, action) => ({
    ...state,
    data: action.payload,
    isAuthenticated: true,
    fetching: false,
    fetched: true,
  });
  const postErrorReduce = (state, action) => ({
    ...state,
    fetching: false,
    error: action.error,
  });

  const logoutReduce = (state) => ({ ...state, isAuthenticated: false });

  const reducer = makeReducer(initialState, {
    [POST_START]: postStartReduce,
    [POST_SUCCESS]: postSuccessReduce,
    [POST_ERROR]: postErrorReduce,
    [LOGOUT]: logoutReduce,
  });
  return {
    reducer,
    login: () => async (dispatch) => {
      dispatch(postStart());
      try {
        dispatch(postSuccess({ id: '123', email: 'leo@girasolo.com' }));
      } catch (error) {
        dispatch(postError(error));
      }
    },
    logout: () => async (dispatch) => {
      dispatch(logout());
    },
  };
};
