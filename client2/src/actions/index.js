import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, GET_CARDS, ADD_CARD, CARD_DELETED, CARD_UPDATE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password}) {
  return function(dispatch) {

    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      // if reguest is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER,
                  payload: email,
                  userId: response.data.userId
                 });
      // - Save the JWT token
      localStorage.setItem('token', response.data.token);
      // - Redirect to the route '/feature'
      browserHistory.push('/feature');
    })
    .catch(() => {
      // if request is bad...
      // - Show error to the user
      dispatch(authError('Bad login info'));
    });
  }
}

export function signupUser({ email, password }){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER,
                  payload: email,
                  userId: response.data.userId
                 });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(res => {
      dispatch(authError(res.response.data.error));
    });
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response =>{
      console.log(response.data.message);
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}


export function getCards() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/getcards`, {})
    .then(response => {

      dispatch(setCards(response.data));

      })
    .catch(res => {
      console.log(res);
    });
  }
}

export function getUserCards(userId) {
  return function(dispatch) {
    console.log(userId);
    axios.get(`${ROOT_URL}/getcards/${userId} `, {})
    .then(response => {
      console.log("to jest odpowiedz");

      console.log(response.data);
      dispatch(setCards(response.data));

      })
    .catch(res => {
      console.log("to jest bład");

      console.log(res);
    });
  }
}

export function setCards(card){
  return {
    type: GET_CARDS,
    payload: card
  }
}

export function deletedCard(id){
  return {
    type: CARD_DELETED,
    payload: id
  }
}

export function updateCard(id){
  return {
    type: CARD_UPDATE,
    payload: id
  }
}



export function addCard({ title, description, imageURL, owner}) {
  return function(dispatch) {
    // Submit email/password to server
    console.log(owner);
    let favourite = 0;
    axios.post(`${ROOT_URL}/addcard`, { title, description, imageURL, owner, favourite })
    .then(response => {
      // if reguest is good...
      // - Update state to indicate user is authenticated
      console.log("dziala" + response);
      // dispatch({ type: AUTH_USER });
      // - Save the JWT token
      // localStorage.setItem('token', response.data.token);
      // - Redirect to the route '/feature'
      browserHistory.push('/feature');
    })
    .catch(() => {
      // if request is bad...
      // - Show error to the user
      //dispatch(authError('Bad login info'));
    });
  }
}

export function deleteCard(id){
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/deletecard/${id}`,  {
      // method: 'delete',
      // headers: {
      //   "Content-Type": "application/json"
      // }
    })
    .then(response =>{
      console.log("test id: ", id);
      dispatch(deletedCard(id));

      //dispatch(setCards(response.data));
    });
  }
}

export function likeCard(id, favourite){
  ++favourite;
  return function(dispatch) {
    axios.patch(`${ROOT_URL}/update/${id}`, {favourite})
    .then(response =>{
      console.log("response");
      dispatch({
        type: CARD_UPDATE,
        cardId: id,
        favourite: favourite
      })

      //dispatch(setCards(response.data));
    });
  }
}

export function dislikeCard(id, favourite){
  --favourite;

  return function(dispatch) {
    axios.patch(`${ROOT_URL}/update/${id}`, {favourite})
    .then(response =>{
      console.log("response");

      dispatch({
        type: CARD_UPDATE,
        cardId: id,
        favourite: favourite
      })

      //dispatch(setCards(response.data));
    });
  }
}


// export function deleteGame(id){
//   return dispatch => {
//     return fetch(`/api/games/${id}`, {
//       method: 'delete',
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).then(handleResponse)
//       .then(data => dispatch(gameDeleted(id)));
//   }
// }
