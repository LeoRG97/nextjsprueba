/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
import { getSession } from 'next-auth/client';
// eslint-disable-next-line import/extensions
import axios from '@/services/axios';
import { makeType, makeActionCreator, makeReducer } from '../creators';

const CRUD = (resource) => {
  const {
    FETCH_SUCCESS,
    FETCH_ERROR,
    FETCH_START,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    UPDATE_START,
    POST_SUCCESS,
    POST_ERROR,
    POST_START,
    DELETE_SUCCESS,
    DELETE_ERROR,
    DELETE_START,
    FILTER,
  } = makeType(resource);

  const initialState = {
    data: [],
    filteredData: [],
    fetched: false,
    fetching: false,
    error: '',
  };

  // Filter
  const filter = makeActionCreator(FILTER, 'payload');

  const filterReduce = (state, action) => {
    const keys = Object.keys(state.data[0]);
    const generalDefaultFilter = (element, query = '') => (keys.some((key) => (
      element[key] ? element[key].toString().toLowerCase().includes(query.toLowerCase()) : false))
    );
    return {
      ...state,
      fetching: false,
      fetched: true,
      filteredData: state.data.filter((element) => generalDefaultFilter(element, action.payload)),
    };
  };
  //
  // Get Data

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
    filteredData: action.payload,
  });

  //

  // POST Data
  const postStart = makeActionCreator(POST_START);
  const postSuccess = makeActionCreator(POST_SUCCESS, 'payload');
  const postError = makeActionCreator(POST_ERROR, 'error');

  const postStartReduce = (state) => ({ ...state, fetching: true });
  const postErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error });
  const postSuccessReduce = (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    data: [...state.data, action.payload],
    filteredData: [...state.data, action.payload],
  });
  //

  // Update Data
  const updateStart = makeActionCreator(UPDATE_START);
  const updateSuccess = makeActionCreator(UPDATE_SUCCESS, 'payload');
  const updateError = makeActionCreator(UPDATE_ERROR, 'error');

  const updateStartReduce = (state) => ({ ...state, fetching: true });
  const updateErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error });
  const updateSuccessReduce = (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    data: state.data.map((x) => (x._id === action.payload._id ? (action.payload) : x)),
    filteredData: state.data.map((x) => (x._id === action.payload._id ? (action.payload) : x)),
  });
  //

  // Delete Data
  const deleteStart = makeActionCreator(DELETE_START);
  const deleteSuccess = makeActionCreator(DELETE_SUCCESS, 'payload');
  const deleteError = makeActionCreator(DELETE_ERROR, 'error');

  const deleteStartReduce = (state) => ({ ...state, fetching: true });
  const deleteErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error });
  const deleteSuccessReduce = (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    data: state.data.filter((x) => x._id !== action.payload._id),
    filteredData: state.data.filter((x) => x._id !== action.payload._id),
  });
  //

  // Reducer
  const reducer = makeReducer(initialState, {
    [FETCH_START]: fetchStartReduce,
    [FETCH_SUCCESS]: fetchSuccessReduce,
    [FETCH_ERROR]: fetchErrorReduce,
    [UPDATE_START]: updateStartReduce,
    [UPDATE_SUCCESS]: updateSuccessReduce,
    [UPDATE_ERROR]: updateErrorReduce,
    [POST_START]: postStartReduce,
    [POST_SUCCESS]: postSuccessReduce,
    [POST_ERROR]: postErrorReduce,
    [DELETE_START]: deleteStartReduce,
    [DELETE_SUCCESS]: deleteErrorReduce,
    [DELETE_ERROR]: deleteSuccessReduce,
    [FILTER]: filterReduce,
  });
  //

  return {
    reducer,
    fetch: () => async (dispatch) => {
      const { user: { id } } = await getSession();
      dispatch(fetchStart());
      try {
        const response = await axios().get(`${resource}/${id}`);
        dispatch(fetchSuccess(response.data));
      } catch (error) {
        dispatch(fetchError(error));
      }
    },
    update: (data) => (dispatch) => {
      dispatch(updateStart());
      try {
        axios().put(`${resource}/${data._id}/`, data)
          .then((response) => {
            if (!response) return dispatch(updateError(`Error al actualizar ${resource}`));

            return dispatch(updateSuccess(data));
          })
          .catch((error) => {
            dispatch(updateError(error));
          });
      } catch (error) {
        dispatch(updateError(error));
      }
    },
    post: (data) => async (dispatch) => {
      const { user: { id } } = await getSession();
      dispatch(postStart());
      try {
        axios().post(`${resource}/`, { ...data, usuario_id: id })
          .then((response) => {
            if (response === false) return dispatch(postError(`Error al crear ${resource}`));
            return dispatch(postSuccess({
              ...data, usuario_id: id,
            }));
          })
          .catch((error) => {
            dispatch(postError(error));
          });
      } catch (error) {
        dispatch(postError(error));
      }
    },
    remove: (id) => (dispatch) => {
      dispatch(deleteStart());
      try {
        axios().delete(`${resource}/${id}/`)
          .then((response) => {
            if (!response) return dispatch(deleteError(`Error al eliminar ${resource}`));
            return dispatch(deleteSuccess({ _id: id }));
          })
          .catch((error) => {
            dispatch(deleteError(error));
          });
      } catch (error) {
        dispatch(deleteError(error));
      }
    },
    filter: (query) => (dispatch) => {
      dispatch(filter(query));
    },
  };
};

export default CRUD;
