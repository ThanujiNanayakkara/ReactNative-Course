import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contactus from './ContactusComponent';
import Aboutus from './AboutusComponent';
import Dishdetail from './DishDetailComponent';

const MainDrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const AboutusStack = createStackNavigator();
const ContactusStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      headerMode='screen'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      <HomeStack.Screen name='Home' component={Home} />
    </HomeStack.Navigator>
  );
};
const AboutusNavigator = () => {
  return (
    <AboutusStack.Navigator
      headerMode='screen'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      <AboutusStack.Screen name='About Us' component={Aboutus} />
    </AboutusStack.Navigator>
  );
};
const ContactusNavigator = () => {
  return (
    <ContactusStack.Navigator
      headerMode='screen'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      <ContactusStack.Screen name='Contact Us' component={Contactus} />
    </ContactusStack.Navigator>
  );
};
const MenuNavigator = () => {
  return (
    <MenuStack.Navigator
        initialRouteName= 'Menu'
        screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}>
      <MenuStack.Screen name='Menu' component={Menu} />
      <MenuStack.Screen name='Dishdetail' component={Dishdetail} />
    </MenuStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainDrawerStack.Navigator
      headerMode='screen'
      initialRouteName='Home'
      options={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
      screenOptions={{ drawerBackgroundColor: '#D1C4E9' }}>
        <MainDrawerStack.Screen
          name='Menu'
          options={{ drawerLabel: 'Menu' }}
          component={MenuNavigator}/>
        <MainDrawerStack.Screen
          name='Home'
          options={{ drawerLabel: 'Home' }}
          component={HomeNavigator}/>
        <MainDrawerStack.Screen
          name='Contact Us'
          options={{ drawerLabel: 'Contact Us' }}
          component={ContactusNavigator}/>
        <MainDrawerStack.Screen
          name='About Us'
          options={{ drawerLabel: 'About Us' }}
          component={AboutusNavigator}/>
    </MainDrawerStack.Navigator>
  );
};

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
      </View>
    );
  }
}

export default Main;