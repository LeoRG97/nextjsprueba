import { makeActionCreator, makeReducer } from '../creators';

const Alert = () => {
  const SHOW_SUBSCRIBE = 'SHOW_SUBSCRIBE';
  const HIDE_SUBSCRIBE = 'HIDE_SUBSCRIBE';
  const SHOW_TOOLS_MODAL = 'SHOW_TOOLS_MODAL';
  const HIDE_TOOLS_MODAL = 'HIDE_TOOLS_MODAL';
  const SHOW_PREMIUM = 'SHOW_PREMIUM';
  const SHOW_PREMIUM_STATIC = 'SHOW_PREMIUM_STATIC';
  const HIDE_PREMIUM = 'HIDE_PREMIUM';

  const initialState = {
    showSubscribe: false,
    showPremium: false,
    showTools: false,
    backdrop: true,
  };

  // action creators
  const showSubscribe = makeActionCreator(SHOW_SUBSCRIBE);
  const hideSubscribe = makeActionCreator(HIDE_SUBSCRIBE);

  const showPremium = makeActionCreator(SHOW_PREMIUM);
  const showPremiumStatic = makeActionCreator(SHOW_PREMIUM_STATIC);
  const hidenPremium = makeActionCreator(HIDE_PREMIUM);

  const showTools = makeActionCreator(SHOW_TOOLS_MODAL);
  const hideTools = makeActionCreator(HIDE_TOOLS_MODAL);

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
    backdrop: true,
  });

  const showModalStaticReduce = (state = initialState) => ({
    ...state,
    showPremium: true,
    backdrop: 'static',
  });

  const showToolsReduce = (state = initialState) => ({
    ...state,
    showTools: true,
  });

  const hideToolsReduce = (state = initialState) => ({
    ...state,
    showTools: false,
  });

  const reducer = makeReducer(initialState, {
    [SHOW_SUBSCRIBE]: showSubscribeReduce,
    [HIDE_SUBSCRIBE]: hideSubscribeReduce,
    [SHOW_PREMIUM]: showModalReduce,
    [SHOW_PREMIUM_STATIC]: showModalStaticReduce,
    [HIDE_PREMIUM]: hideModalReduce,
    [SHOW_TOOLS_MODAL]: showToolsReduce,
    [HIDE_TOOLS_MODAL]: hideToolsReduce,
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
    showPremiumStaticAlert: () => (dispatch) => {
      dispatch(showPremiumStatic());
    },
    hidePremiumAlert: () => (dispatch) => {
      dispatch(hidenPremium());
    },
    showToolsModal: () => (dispatch) => {
      dispatch(showTools());
    },
    hideToolsModal: () => (dispatch) => {
      dispatch(hideTools());
    },
  };
};

export default Alert;
