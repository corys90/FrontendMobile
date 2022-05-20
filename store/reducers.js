const initialState = {
  userName: "",
  userEmail: "",
  place:[{}]
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD": {
      // Proceso de añadir un elemento objeto al array 
      return { ...state, place: place.push(state)};
    }
    case "LESS": {
      return { ...state, cont: state.cont - 1};
    }
    case "USERDATA": {
      return { ...state, 
              userName: state.userName,
            userEmail: state.userEmail 
            };
    }
    case "PLACESTATE": {
      return { ...state, 
              userName: state.userName,
            userEmail: state.userEmail 
            };
    }
    default:
      return state;
  }
}

export default Reducer;
