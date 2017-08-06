import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, GET_CARDS, CARD_DELETED, CARD_UPDATE } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, email: action.payload, userId: action.userId};
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false, email: "", userId: ""};
    case AUTH_ERROR:
      return { ...state, error: action.payload};
    case FETCH_MESSAGE:
      return { ...state, message: action.payload};
    case CARD_DELETED:
      return { ...state, cards: state.cards.filter(item => item._id !== action.payload)};
    case CARD_UPDATE:
      return { ...state, cards: state.cards.filter(item => item._id !== action.payload)};
    case GET_CARDS:
      return { ...state, cards: action.payload};
  }

  return state;
}
