import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/Afterlogin/HomeScreen';
import MarketNewsScreen from '../screens/Afterlogin/NewsScreen';
import { fp, hp, wp } from '../utility/dimensions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{
      flexDirection: 'row',
      height: 60,
      backgroundColor: '#1d1d1d',
      borderTopWidth: 1,
      borderTopColor: '#333333',
      justifyContent: 'center',
      alignItems: 'center',
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
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              marginHorizontal: wp(10),
              alignItems: 'center',
            }}
          >
            {options.tabBarIcon && options.tabBarIcon({
              focused: isFocused,
              color: 'white',
              size: 24,
            })}
            <Text style={{
              color:'white',
              fontSize: isFocused ? fp(1.4):fp(1.2),
              marginTop: 5,
            }}>
              {label}
            </Text>
          </TouchableOpacity>
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
        tabBarStyle: {
          display: ['NewsWebView', 'BetDetailScreen', 'WalletScreen'].includes(
            getFocusedRouteNameFromRoute(route) || 'Home'
          )
            ? 'none'
            : 'flex', // Hide bottom tab on specific screens
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Trends') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
            color = focused ? "black":"white"
            return   <View
            style={{
              width: wp(6.5), 
              height: hp(2.8),
              justifyContent: 'center',
              borderWidth:1
,              alignItems: 'center',
borderColor:"white",
backgroundColor: focused ? "white":"black"
            }}
          >
            <Ionicons name={iconName} size={size} color={color} />
          </View>;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trends" component={MarketNewsScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const navigation = useNavigation()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={({ route }) => ({
          headerShown: false,
       
        })}
      />
    </Stack.Navigator>
  );
}