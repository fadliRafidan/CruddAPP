import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const init = () => {
  return async dispatch => {
    let user = await AsyncStorage.getItem('user');
    if (user !== null) {
      dispatch({
        type: 'LOGIN',
        payload: {user: JSON.parse(user)},
      });
    } else {
      logoutAction();
    }
  };
};

const loginAction = user => {
  return async dispatch => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: {user: user},
    });
  };
};

const logoutAction = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
    });
  };
};

const tambahContact = kontak => {
  try {
    return async dispatch => {
      const res = await axios.post(
        'https://contact.herokuapp.com/contact',
        kontak,
      );
      if (res.status === 201) {
        dispatch({
          type: 'ADD_CONTACT',
          payload: {responseStatus: true},
        });
      }
    };
  } catch (error) {
    dispatch({
      type: 'ADD_CONTACT',
      payload: {responseStatus: false},
    });
  }
};

const editContact = (kontak, id) => {
  try {
    return async dispatch => {
      const res = await axios.put(
        'https://contact.herokuapp.com/contact/' + id,
        kontak,
      );
      if (res.status === 201) {
        dispatch({
          type: 'EDIT_CONTACT',
          payload: {responseStatusEdit: true},
        });
      }
    };
  } catch (error) {
    dispatch({
      type: 'EDIT_CONTACT',
      payload: {responseStatusEdit: false},
    });
  }
};

export {init, loginAction, logoutAction, tambahContact, editContact};
