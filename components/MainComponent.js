import React, { Component } from 'react';
import { View, Platform,Image,StyleSheet, ScrollView , Text, ToastAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView  } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contactus from './ContactusComponent';
import Aboutus from './AboutusComponent';
import Dishdetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import NetInfo from "@react-native-community/netinfo";
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MainDrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const AboutusStack = createStackNavigator();
const ContactusStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const LoginStack = createStackNavigator();

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
        headerLeft: ({navigation}) => (
          <Icon name='menu' size={24} color='white' 
          onPress={() => navigation.toggleDrawer()}></Icon>
  )
      }}
    >
      <HomeStack.Screen name='Home' component={Home} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
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
        headerLeft: ({navigation}) => (
          <Icon name='menu' size={24} color='white' 
          onPress={() => navigation.toggleDrawer()}></Icon>
  )
      }}
    >
      <AboutusStack.Screen name='About Us' component={Aboutus} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
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
      <ContactusStack.Screen name='Contact Us' component={Contactus} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </ContactusStack.Navigator>
  );
};

const ReservationNavigator = () => {
  return (
    <ReservationStack.Navigator
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
      <ReservationStack.Screen name='Reserve Table' component={Reservation} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </ReservationStack.Navigator>
  );
};

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator
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
      <FavoritesStack.Screen name='Favorites' component={Favorites} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </FavoritesStack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
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
      <LoginStack.Screen name='Login' component={Login} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </LoginStack.Navigator>
  );
};

const MenuNavigator = () => {
  return (
    <MenuStack.Navigator
        initialRouteName= 'Menu'
        screenOptions= {{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        }      
      }}
      
    >
      <MenuStack.Screen name='Menu' component={Menu}  options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
      <MenuStack.Screen name='Dishdetail' component={Dishdetail} />
    </MenuStack.Navigator>
  );
};

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
      <SafeAreaView style={styles.container}
            forceInset={{top:'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
               <View style={{flex:1}}>
                  <Image source={require('./images/logo.png')}
                          style={styles.drawerImage} />
                </View> 
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
      </SafeAreaView>
  </ScrollView>
);

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
      screenOptions={{ 
            drawerBackgroundColor: '#D1C4E9', 
              }}
      drawerContent= {props => <CustomDrawerContentComponent {...props} />}
        >
          <MainDrawerStack.Screen
          name='Login'
          options={{ drawerLabel: 'Login' , 
          drawerIcon: ({tintColor, focused})=>(
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>)}}
          component={LoginNavigator}/> 
         <MainDrawerStack.Screen
          name='Home'
          options={{ 
              drawerLabel: 'Home', 
              drawerIcon: ({tintColor})=>(
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}>
                </Icon>) }}
          component={HomeNavigator}/>
        <MainDrawerStack.Screen
          name='About Us'
          options={{ drawerLabel: 'About Us', 
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>) }}
          component={AboutusNavigator}/>

        <MainDrawerStack.Screen
          name='Menu'
          options={{ drawerLabel: 'Menu', 
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>) }}
          component={MenuNavigator}/>
       
        <MainDrawerStack.Screen
          name='Contact Us'
          options={{ drawerLabel: 'Contact Us' , 
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='address-card'
                type='font-awesome'
                size={22}
                color={tintColor}>
            </Icon>)}}
          component={ContactusNavigator}/>
        <MainDrawerStack.Screen
          name='My Favorites'
          options={{ drawerLabel: 'My Favorites' , 
          drawerIcon: ({tintColor, focused})=>(
            <Icon 
                name='heart'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>)}}
          component={FavoritesNavigator}/>
        <MainDrawerStack.Screen
          name='Reserve Table'
          options={{ drawerLabel: 'Reserve Table' , 
          drawerIcon: ({tintColor, focused})=>(
            <Icon 
                name='cutlery'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>)}}
          component={ReservationNavigator}/>        
    </MainDrawerStack.Navigator>
  );
};

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch()
    .then(connectionInfo => {
      ToastAndroid.show("Initial Network Connectivity type " + connectionInfo.type + " Is connected? "+ connectionInfo.isConnected, ToastAndroid.LONG);
      
    });

    NetInfo.addEventListener(connectionInfo => {
      this.handleConnectivityChange(connectionInfo);
    });
    

  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);