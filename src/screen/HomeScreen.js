import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import CardList from './component/CardList';

function HomeScreen() {
  const navigation = useNavigation();
  let user = useSelector(state => state.AuthReducers.user);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const getDataContact = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://contact.herokuapp.com/contact');
      setData(res.data?.data);
      if (res.status) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataContact();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDataContact();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    getDataContact();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CardList
            key={index}
            index={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            age={item.age}
            photo={item.photo}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#66A5AD']}
          />
        }
        ListHeaderComponent={() => (
          <View>
            <ImageBackground
              source={require('../../images/contact-logo.jpg')}
              style={styles.backgroundImage}>
              <View>
                <Text style={styles.textReady}>
                  Hi {`${user.name}`}, good day!
                </Text>
              </View>
              <View>
                <Text style={styles.textReady}>Lets Create!</Text>
              </View>
            </ImageBackground>
            {loading && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>Loading...</Text>
              </View>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{position: 'absolute', right: 20, bottom: 80}}>
            <TouchableOpacity onPress={() => navigation.navigate('AddContact')}>
              <View style={styles.addButton}>
                <Icon name="plus" size={30} color={'#FFF'} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    position: 'relative',
    marginHorizontal: 10,
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: '#66A5AD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textReady: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    width: 160,
  },
  cardText: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  backgroundImage: {
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
