import {useDispatch, useSelector} from 'react-redux';
import HomeScreen from '../screen/HomeScreen';
import WellcomeScreen from '../screen/WellcomeScreen';
import {init, logoutAction} from '../store/actions';
import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddContact from '../screen/AddContact';
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOption}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={addContactOption}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Wellcome">
      <Stack.Screen
        name="Wellcome"
        component={WellcomeScreen}
        options={wellcomeScreenOption}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation = () => {
  let user = useSelector(state => state.AuthReducers.user);
  const dispatch = useDispatch();
  const renderInit = async () => {
    await dispatch(init());
  };
  useEffect(() => {
    renderInit();
  }, []);

  return user === null ? <AuthStack /> : <MyStack />;
};

const wellcomeScreenOption = {
  title: 'Wellcome',
  headerShown: false,
  headerTitleAlign: 'center',
  headerTintColor: '#66A5AD',
  headerTitleStyle: {color: '#66A5AD', fontWeight: '600'},
  headerShadowVisible: false,
  contentStyle: {alignItems: 'center', justifyContent: 'center'},
};
const addContactOption = {
  title: 'Add Contact',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: '#66A5AD',
  headerTitleStyle: {color: '#66A5AD', fontWeight: '600'},
  headerShadowVisible: false,
};
const homeScreenOption = {
  title: 'Contact App',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: '#66A5AD',
  headerTitleStyle: {color: '#66A5AD', fontWeight: '600'},
  headerShadowVisible: false,
  headerRight: function useHeaderRight() {
    const dispatch = useDispatch();
    return (
      <View>
        <TouchableOpacity
          style={{marginRight: 3}}
          onPress={() => dispatch(logoutAction())}>
          <Icon name="power-off" size={30} color={'#1f4151'} />
        </TouchableOpacity>
      </View>
    );
  },
};
