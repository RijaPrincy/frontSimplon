const initialState = {
  connecter: "",
  idAtelier: "",
  modification: "",
  panier: []

}

function product(state = initialState, action) {


  switch (action.type) {
    case 'CONNECTER':
      state = { ...state, connecter: action.value }
      console.log("connecter", state.connecter);
      return state


    

    case 'DECONNECTE':
      state = { ...state, connecter: "" }
      console.log("connecter", state.connecter);
      return state

    case 'idAt':
      state = { ...state, idAtelier: action.value }
      console.log("connecter reduce", action.value);

      return state

    case 'mod':
      state = { ...state, modification: action.value }
      console.log("connecter reduce", action.value);

      return state


    default:
      return state
  }
}

export default product