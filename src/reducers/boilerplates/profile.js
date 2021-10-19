import { getSession } from 'next-auth/client';
import { makeType, makeActionCreator, makeReducer } from '../creators';
import { getProfile } from '@/services/profile';

const Profile = (resource) => {
  const {
    FETCH_SUCCESS,
    FETCH_ERROR,
    FETCH_START,
    UPDATE_START,
    UPDATE_ERROR,
    UPDATE_SUCCESS,
  } = makeType(resource);

  const initialState = {
    data: {},
    fetched: false,
    fetching: false,
    error: '',
  };

  const fetchStart = makeActionCreator(FETCH_START);
  const fetchSuccess = makeActionCreator(FETCH_SUCCESS, 'payload');
  const fetchError = makeActionCreator(FETCH_ERROR, 'error');
  const updateStart = makeActionCreator(UPDATE_START);
  const updateSuccess = makeActionCreator(UPDATE_SUCCESS, 'payload');
  const updateError = makeActionCreator(UPDATE_ERROR);

  const fetchStartReduce = (state) => ({ ...state, fetching: true });
  const fetchErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error });
  const fetchSuccessReduce = (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    data: action.payload,
  });

  const updateStartReduce = (state) => ({ ...state, fetching: true });
  const updateErrorReduce = (state, action) => ({
    ...state,
    fetching: false,
    error: action.error,
  });
  const updateSuccessReduce = (state = initialState, action) => ({
    ...state,
    fetching: false,
    data: { ...state.data, ...action.payload },
  });

  // Reducer
  const reducer = makeReducer(initialState, {
    [FETCH_START]: fetchStartReduce,
    [FETCH_SUCCESS]: fetchSuccessReduce,
    [FETCH_ERROR]: fetchErrorReduce,
    [UPDATE_START]: updateStartReduce,
    [UPDATE_SUCCESS]: updateSuccessReduce,
    [UPDATE_ERROR]: updateErrorReduce,
  });

  return {
    reducer,
    fetch: () => async (dispatch) => {
      dispatch(fetchStart());
      try {
        const { user: { id } } = await getSession();
        const data = await getProfile(id);
        return dispatch(fetchSuccess(data));
      } catch (err) {
        return dispatch(fetchError(err));
      }
    },
    update: (data) => async (dispatch) => {
      dispatch(updateStart());
      try {
        return dispatch(updateSuccess(data));
      } catch (err) {
        return dispatch(updateError(err));
      }
    },
  };
};

export default Profile;
