import { makeActionCreator, makeReducer } from '../creators';

const Alert = () => {
  const SHOW_SUBSCRIBE = 'SHOW_SUBSCRIBE';
  const HIDE_SUBSCRIBE = 'HIDE_SUBSCRIBE';

  const initialState = {
    showSubscribe: false,
  };

  // action creators
  const showSubscribe = makeActionCreator(SHOW_SUBSCRIBE);
  const hideSubscribe = makeActionCreator(HIDE_SUBSCRIBE);

  // reducers
  const showSubscribeReduce = (state = initialState) => ({
    ...state,
    showSubscribe: true,
  });

  const hideSubscribeReduce = (state = initialState) => ({
    ...state,
    showSubscribe: false,
  });

  const reducer = makeReducer(initialState, {
    [SHOW_SUBSCRIBE]: showSubscribeReduce,
    [HIDE_SUBSCRIBE]: hideSubscribeReduce,
  });

  return {
    reducer,
    showSubscribeAlert: () => (dispatch) => {
      dispatch(showSubscribe());
    },
    hideSubscribeAlert: () => (dispatch) => {
      dispatch(hideSubscribe());
    },
  };
};

export default Alert;
