import {
  ADD_PRESTATION,
  REMOVE_PRESTATION,
  STORE_CATALOG,
  STORE_CURRENT_PRESTATION,
  STORE_CURRENT_NAVIGATION_INDEX,
  STORE_ADDRESS,
  STORE_APPOINTMENT,
  STORE_BOOKING,
  INIT_PRESTATIONS,
  INIT_APPOINTMENT,
  INIT_ADDRESS } from "../constants/action-types.js";

const initialState = {
  catalog: null,
  prestations: [],
  address: '',
  appointment: null,  // ISO 8601 datetime
  currentPrestation: null,
  currentNavigationIndex: 0,
  booking: null
};

/*Avoiding mutations in Redux :
Using concat(), slice(), and …spread for arrays
Using Object.assign() and …spread for objects
*/

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case ADD_PRESTATION:
        return { ...state, prestations: state.prestations.concat(action.payload) };

    case REMOVE_PRESTATION: // once only !

      let removed = false;
      let filteredPrestations = [];
      state.prestations.forEach((prestation, index) => {
        if (!removed && (action.payload === prestation.reference)){
          //console.log(`Prestation found at ${index}`, prestation)
          filteredPrestations = removeItem(state.prestations, index)
          removed = true;
        }
      });
      //console.log('filteredPrestations :', filteredPrestations)
      return { ...state, prestations:  filteredPrestations};

    case STORE_CATALOG:
        return { ...state, catalog: action.payload};

    case STORE_ADDRESS:
        return { ...state, address: action.payload};
    case STORE_APPOINTMENT:
        return { ...state, appointment: action.payload};
    case STORE_BOOKING:
        return { ...state, booking: action.payload};

    case STORE_CURRENT_PRESTATION:
        return { ...state, currentPrestation: action.payload};
    case STORE_CURRENT_NAVIGATION_INDEX:
        return { ...state, currentNavigationIndex: action.payload};

    case INIT_PRESTATIONS:
        return { ...state, prestations: []};
    case INIT_APPOINTMENT:
        return { ...state, appointment: null};
    case INIT_ADDRESS:
        return { ...state, address: ''};

    default:
      return state;
  }
};

// Remove an item inside items Array
const removeItem = (items, index) =>
  //items.slice(0, index-1).concat(items.slice(index, items.length))  // KO
  items.filter(function(value, i){
     return i !== index;
  });

export default rootReducer;
