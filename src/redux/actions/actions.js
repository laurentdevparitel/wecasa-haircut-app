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
  INIT_ADDRESS  } from "../constants/action-types.js";

export const addPrestation = prestation => ({ type: ADD_PRESTATION, payload: prestation });

export const removePrestation = prestationReference => ({ type: REMOVE_PRESTATION, payload: prestationReference });

export const storeCatalog = catalog => ({ type: STORE_CATALOG, payload: catalog });
export const storeCurrentPrestation = prestation => ({ type: STORE_CURRENT_PRESTATION, payload: prestation });
export const storeCurrentNavigationIndex = navigationIndex => ({ type: STORE_CURRENT_NAVIGATION_INDEX, payload: navigationIndex });

export const storeAddress = address => ({ type: STORE_ADDRESS, payload: address });
export const storeAppointment = appointment => ({ type: STORE_APPOINTMENT, payload: appointment });
export const storeBooking = booking => ({ type: STORE_BOOKING, payload: booking });

export const initPrestations = () => ({ type: INIT_PRESTATIONS });
export const initAddress = () => ({ type: INIT_ADDRESS });
export const initAppointment = () => ({ type: INIT_APPOINTMENT });
