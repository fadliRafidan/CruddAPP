const initialState = {
  user: null,
  tambahContact: {
    fistName: '',
    lastName: '',
    age: '',
    photo: null,
  },
  responseStatus: '',
  responseStatusEdit: '',
  id: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        tambahContact: {
          ...state.tambahContact,
          fistName: action.payload.fistName,
          lastName: action.payload.lastName,
          age: action.payload.age,
          photo: action.payload.photo,
        },
        responseStatus: action.payload.responseStatus,
      };
    case 'EDIT_CONTACT':
      return {
        ...state,
        tambahContact: {
          ...state.tambahContact,
          fistName: action.payload.fistName,
          lastName: action.payload.lastName,
          age: action.payload.age,
          photo: action.payload.photo,
        },
        responseStatusEdit: action.payload.responseStatusEdit,
        id: action.payload.id,
      };
    default:
      return state;
  }
};
