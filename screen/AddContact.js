import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {EditContact, TambahContact} from '../store/actions';
export default function AddContact({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = route.params;
  let responseStatus = useSelector(state => state.AuthReducers.responseStatus);
  let responseStatusEdit = useSelector(
    state => state.AuthReducers.responseStatusEdit,
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dataDetailImage, setDataImage] = useState('');
  const [singleFile, setSingleFile] = useState(null);
  const [error, setError] = useState(false);

  const getDetail = async () => {
    try {
      const res = await axios.get(
        `https://contact.herokuapp.com/contact/${data?.id}`,
      );
      if (res.status === 200) {
        console.log(res);
        let json = res.data.data;
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setAge(String(json.age));
        setSingleFile(json.photo);
        setDataImage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.isEdit === true) {
      navigation.setOptions({
        title: 'Edit Contact',
      });
    }
    getDetail();
  }, [data]);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const handlePressCreate = async () => {
    if (firstName.length === 0 || lastName.length === 0 || age.length === 0) {
      setError(true);
    } else {
      const data = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: 'N/A',
        // photo: singleFile === null ? 'N/A' : singleFile[0].uri,
      };
      try {
        dispatch(TambahContact(data));
        if (responseStatus && responseStatus === true) {
          navigation.navigate('Home');
        }
        if (responseStatus && responseStatus === false) {
          Alert.alert('Oppps something wrong...');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Oppps something wrong...');
      }
    }
  };
  const handlePressUpdate = async () => {
    if (firstName.length === 0 || lastName.length === 0 || age.length === 0) {
      setError(true);
    } else {
      const dataUpdate = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: dataDetailImage === true ? singleFile : singleFile[0].uri,
      };
      try {
        dispatch(EditContact(dataUpdate, data?.id));
        if (responseStatusEdit && responseStatusEdit === true) {
          navigation.navigate('Home');
        }
        if (responseStatusEdit && responseStatusEdit === false) {
          Alert.alert('Oppps something wrong...');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Oppps something wrong...');
      }
    }
  };

  const handlePress = () => {
    if (data?.isEdit === true) {
      handlePressUpdate();
    } else {
      handlePressCreate();
    }
  };
  const onDelete = async () => {
    try {
      const res = await axios.delete(
        'https://contact.herokuapp.com/contact/' + data?.id,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      Alert.alert('Ooppss something when wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {data?.isEdit === true && (
          <TouchableOpacity
            onPress={() => onDelete()}
            style={{position: 'absolute', top: -115, right: 20}}>
            <Icon
              name="trash"
              size={40}
              color={'#e33648'}
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => selectFile()}>
          {singleFile !== null ? (
            <Image
              source={{
                uri:
                  dataDetailImage === true
                    ? 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550'
                    : singleFile[0].uri,
              }}
              style={styles.photoContainer}
            />
          ) : (
            <View style={styles.photoContainer}>
              <Icon name="user-plus" size={50} color={'#66A5AD'} />
            </View>
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.cardTextInput,
            {borderColor: error === true ? '#ff031c' : '#0f7c8a'},
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder={'first name'}
            placeholderTextColor={'#0f7c8a'}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>
        <View
          style={[
            styles.cardTextInput,
            {borderColor: error === true ? '#ff031c' : '#0f7c8a'},
          ]}>
          <TextInput
            value={lastName}
            style={styles.textInput}
            placeholder={'last name'}
            placeholderTextColor={'#0f7c8a'}
            onChangeText={setLastName}
          />
        </View>
        <View
          style={[
            styles.cardTextInput,
            {borderColor: error === true ? '#ff031c' : '#0f7c8a'},
          ]}>
          <TextInput
            value={age}
            style={styles.textInput}
            placeholder={'age'}
            placeholderTextColor={'#0f7c8a'}
            onChangeText={setAge}
            keyboardType="number-pad"
            dataDetectorTypes={'phoneNumber'}
            textContentType="telephoneNumber"
            returnKeyType="emergency-call"
            textBreakStrategy="highQuality"
            maxLength={2}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}>
          <Text style={styles.textCancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => handlePress()}>
          <Text style={styles.textSave}>
            {data?.isEdit === true ? 'Update' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-around',
    position: 'relative',
  },
  cardContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextInput: {
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    paddingLeft: 5,
    color: '#0f7c8a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    backgroundColor: '#FFF',
    width: '85%',
  },
  textInput: {
    color: '#0f7c8a',
    width: '100%',
  },
  ageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: '#66A5AD',
    height: 140,
    width: 140,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  buttonCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#66A5AD',
    backgroundColor: '#fff',
    padding: 10,
    width: 140,
    borderRadius: 10,
  },
  buttonSave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66A5AD',
    padding: 10,
    width: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#66A5AD',
  },
  textCancel: {
    fontWeight: '500',
    color: '#66A5AD',
    fontSize: 15,
  },
  textSave: {
    fontWeight: '500',
    color: '#FFF',
    fontSize: 15,
  },
});
