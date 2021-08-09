import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import * as reducers from '@/reducers/index';

const rootReducer = combineReducers({ ...reducers });

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

const initStore = () => createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(initStore);
