import { makeActionCreator, makeReducer } from '../creators';

const Alert = () => {
  const SHOW_SUBSCRIBE = 'SHOW_SUBSCRIBE';
  const HIDE_SUBSCRIBE = 'HIDE_SUBSCRIBE';

  const SHOW_PREMIUM = 'SHOW_PREMIUM';
  const HIDE_PREMIUM = 'HIDE_PREMIUM';

  const initialState = {
    showSubscribe: false,
    showPremium: false,
  };

  // action creators
  const showSubscribe = makeActionCreator(SHOW_SUBSCRIBE);
  const hideSubscribe = makeActionCreator(HIDE_SUBSCRIBE);

  const showPremium = makeActionCreator(SHOW_PREMIUM);
  const hidenPremium = makeActionCreator(HIDE_PREMIUM);

  // reducers
  const showSubscribeReduce = (state = initialState) => ({
    ...state,
    showSubscribe: true,
  });

  const hideSubscribeReduce = (state = initialState) => ({
    ...state,
    showSubscribe: false,
  });

  const showModalReduce = (state = initialState) => ({
    ...state,
    showPremium: true,
  });

  const hideModalReduce = (state = initialState) => ({
    ...state,
    showPremium: false,
  });

  const reducer = makeReducer(initialState, {
    [SHOW_SUBSCRIBE]: showSubscribeReduce,
    [HIDE_SUBSCRIBE]: hideSubscribeReduce,

    [SHOW_PREMIUM]: showModalReduce,
    [HIDE_PREMIUM]: hideModalReduce,
  });

  return {
    reducer,
    showSubscribeAlert: () => (dispatch) => {
      dispatch(showSubscribe());
    },
    hideSubscribeAlert: () => (dispatch) => {
      dispatch(hideSubscribe());
    },
    showPremiumAlert: () => (dispatch) => {
      dispatch(showPremium());
    },
    hidePremiumAlert: () => (dispatch) => {
      dispatch(hidenPremium());
    },
  };
};

export default Alert;
