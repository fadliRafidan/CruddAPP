import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function CardList({index, age, firstName, lastName, photo}) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddContact', {isEdit: true, id: index})
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              height: 30,
              width: 5,
              backgroundColor: '#66A5AD',
            }}
          />
          <View style={{marginLeft: 10, width: '96%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 0.7,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  {firstName + ' ' + lastName}
                </Text>
                <Text
                  style={{
                    color: '#AAA',
                    width: '90%',
                  }}>
                  Age {age}
                </Text>
              </View>
              {photo !== 'N/A' ? (
                <Image
                  source={{uri: photo}}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 15,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#66A5AD',
                    height: 60,
                    width: 60,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="user" size={50} color={'#66A5AD'} />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: 85,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 40,
    shadowColor: 'rgba(0,0,0,0.3)',
    elevation: 5,
    shadowRadius: 15,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
  },
});
