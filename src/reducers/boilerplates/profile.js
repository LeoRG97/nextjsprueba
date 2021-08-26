import { getSession } from 'next-auth/client';
import { makeType, makeActionCreator, makeReducer } from '../creators';
import { getProfile } from '@/services/profile';

const Profile = (resource) => {
  const {
    FETCH_SUCCESS,
    FETCH_ERROR,
    FETCH_START,
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

  const fetchStartReduce = (state) => ({ ...state, fetching: true });
  const fetchErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error });
  const fetchSuccessReduce = (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    data: action.payload,
  });

  // Reducer
  const reducer = makeReducer(initialState, {
    [FETCH_START]: fetchStartReduce,
    [FETCH_SUCCESS]: fetchSuccessReduce,
    [FETCH_ERROR]: fetchErrorReduce,
  });

  return {
    reducer,
    fetch: () => async (dispatch) => {
      dispatch(fetchStart());
      const { user: { id } } = await getSession();
      try {
        const data = await getProfile(id);
        return dispatch(fetchSuccess(data));
      } catch (err) {
        return dispatch(fetchError(err));
      }
    },
  };
};

export default Profile;
