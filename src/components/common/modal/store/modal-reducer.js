import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from "./modal-types";

const initialState = {
  isOpen: false,
  title: '',
  content: '',
}

const modalReducer = (state = initialState, action) => {

  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        content: '',
        title: '',
      }
    default: return state
  }

}

export default modalReducer