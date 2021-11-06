import { GET_TODOS, ADD_TODOS, EDIT_TODOS, DELETE_TODOS, SET_LOADING_TODOS, SET_ERROR_TODOS } from "../keys"

const initialState = {
  todos: [],
  isLoading: false,
  error: null
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_TODOS:
      return { ...state, todos: payload }
    case ADD_TODOS:
      let newTodos = state.todos.map(el => el)
      newTodos.push(payload)
      return { ...state, todos: newTodos }
    case EDIT_TODOS:
      let editTodos = state.todos.filter(el => el.id !== payload.id)
      editTodos.push(payload)
      return { ...state, todos: editTodos }
    case DELETE_TODOS:
      let deleteTodos = state.todos.filter(el => el.id !== payload)
      return { ...state, todos: deleteTodos }
    case SET_ERROR_TODOS:
      return { ...state, error: payload }
    case SET_LOADING_TODOS:
      return { ...state, isLoading: payload }
  
    default:
      return state
  }
}

export default reducer