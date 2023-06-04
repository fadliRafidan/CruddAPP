import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/actions';

function WellcomeScreen() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handlePress = () => {
    const user = {name: text};
    if (text.length === 0) {
      setError(true);
    } else {
      setError(false);
      dispatch(loginAction(user));
    }
  };

  return (
    <ImageBackground
      source={require('../../images/contact-logo.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Hello!</Text>
            <Text style={styles.text}>expand your relationship</Text>
            <View
              style={[
                styles.cardTextInput,
                {borderColor: error === true ? '#ed0909' : '#fff'},
              ]}>
              <TextInput
                style={styles.textInput}
                placeholder={
                  error === true
                    ? 'Please insert youre name!'
                    : 'Whats your name?'
                }
                placeholderTextColor={'#FFF'}
                onChangeText={setText}
              />
            </View>
            <Text style={styles.textReady}>
              Hi,{`${text} `}ready to explore?
            </Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.text}>Ready</Text>
              <Icon name="send-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default WellcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(25, 149, 174, 0.41)',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textReady: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 160,
    marginTop: 10,
  },
  cardTextInput: {
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 5,
    paddingLeft: 5,
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  textInput: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#66A5AD',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    width: 120,
    marginTop: 10,
    flexDirection: 'row',
  },
});
