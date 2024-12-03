import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Afterlogin/HomeScreen';
import ProfileScreen from '../screens/Afterlogin/ProfileScreen';
import SettingsScreen from '../screens/Afterlogin/NiftyStocksScreen';
import CustomHeader from './CustomHeader';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import MarketNewsScreen from '../screens/Afterlogin/NewsScreen';
import NewsWebViewScreen from '../screens/Afterlogin/NewsWebView';
import Setting from '../screens/Afterlogin/Setting';
import History from '../screens/Afterlogin/History';
import BetDetailScreen from '../screens/ComponnetScreen/BetDetailScreen';
import FavoriteStocksScreen from '../screens/ComponnetScreen/FavoriteStocksScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ 
      flexDirection: 'row', 
      height: 60, 
      backgroundColor: '#f8f8f8', 
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0'
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <>
          <TouchableOpacity 
            key={route.key} 
            onPress={onPress}
            style={{ 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              paddingVertical: 10
            }}
          >
            {options.tabBarIcon && options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? '#3b99ff' : 'gray',
              size: 24
            })}
            <Text style={{ 
              color: isFocused ? '#3b99ff' : 'gray',
              fontSize: 10,
              marginTop: 5
            }}>
              {label}
            </Text>
          </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
}

function MainTabNavigator() {
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } 
          else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
            return <MaterialIcons name={iconName} size={size} color={color} />
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'favorite' : 'favorite-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />
          } else if (route.name === 'Account') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            return <MaterialCommunityIcons  name={iconName} size={size} color={color} />
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavoriteStocksScreen} />
      <Tab.Screen name="News" component={MarketNewsScreen} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Account" component={Setting} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const navigation = useNavigation()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} 
       options={({route}) => ({
        headerShown: getFocusedRouteNameFromRoute(route) !== undefined,
        header: () => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
          return (
            <CustomHeader
              userName={"user"}
              onNotificationPress={() => {
              }}
              onProfilePress={() => {
                navigation.openDrawer();

              }}
              onAddPress={() => {
              }}
            />
          );
        },
      })}
       />
      <Stack.Screen name="NewsWebView" component={NewsWebViewScreen} />
      <Stack.Screen name="BetDetailScreen" component={BetDetailScreen} />


    </Stack.Navigator>
  );
}