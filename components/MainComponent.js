import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
  return(
      <HomeNavigator.Navigator
          initialRouteName='Home'
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <HomeNavigator.Screen
              name="Home"
              component={Home}
          />         
      </HomeNavigator.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return(

        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle ={{backgroundColor: '#D1C4E9'}}>
          <Drawer.Screen name="Home" component={HomeNavigatorScreen} />
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} />
        </Drawer.Navigator>

    );
}
  
class Main extends Component {

  render() {
 
    return (
      <NavigationContainer>   
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

export default Main;