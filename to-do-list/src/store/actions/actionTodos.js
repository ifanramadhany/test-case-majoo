import swaggerHub from "../../apis/swaggerHub";
import {
  GET_TODOS,
  ADD_TODOS,
  EDIT_TODOS,
  DELETE_TODOS,
  SET_LOADING_TODOS,
  SET_ERROR_TODOS,
} from "../keys";

export function setLoading(payload) {
  return {
    type: SET_LOADING_TODOS,
    payload,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR_TODOS,
    payload,
  };
}

export function getTodos(payload) {
  return {
    type: GET_TODOS,
    payload,
  };
}

export function addTodos(payload) {
  return {
    type: ADD_TODOS,
    payload,
  };
}

export function editTodos(payload) {
  return {
    type: EDIT_TODOS,
    payload,
  };
}

export function deleteTodos(payload) {
  return {
    type: DELETE_TODOS,
    payload,
  };
}

export function fetchTodos() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const { data } = await swaggerHub({
        method: "GET",
        url: "/to-do-list",
      });
      const newData = data.map(el => {
        return {createdAt: new Date(el.createdAt), id: el.id, title: el.title, status: el.status, description: el.description }
      })
      dispatch(getTodos(newData));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err.response.data);
      dispatch(setError(err.response.data));
    }
  };
}
