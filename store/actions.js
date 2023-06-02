import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const Init = () => {
  return async dispatch => {
    let user = await AsyncStorage.getItem('user');
    if (user !== null) {
      dispatch({
        type: 'LOGIN',
        payload: {user: JSON.parse(user)},
      });
    } else {
      LogoutAction();
    }
  };
};

export const LoginAction = user => {
  return async dispatch => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: {user: user},
    });
  };
};

export const LogoutAction = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const TambahContact = kontak => {
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

export const EditContact = (kontak, id) => {
  try {
    return async dispatch => {
      console.log(id);
      const res = await axios.put(
        'https://contact.herokuapp.com/contact/' + id,
        kontak,
      );
      console.log(res);
      if (res.status === 201) {
        dispatch({
          type: 'EDIT_CONTACT',
          payload: {responseStatusEdit: true},
        });
      }
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'EDIT_CONTACT',
      payload: {responseStatusEdit: false},
    });
  }
};

