import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import CreateAdScreen from './screens/CreateAdScreen';
import ListItemScreen from './screens/ListItemScreen';
import 'react-native-gesture-handler';
import { NavigationContainer,DefaultTheme as DefaultNav } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import AccountScreen from './screens/AccountScreen';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';







const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: 'deepskyblue',
  },
};

const myTheme={
  ...DefaultNav,
  colors:{
    ...DefaultNav.colors,
    background:'#fff'
  }
}

const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator=()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
      </Stack.Navigator>
  )
};

const TabNavigator=()=>{
    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
          } else if(route.name==='create'){
            iconName='plus-circle'
          } else{
            iconName='user'
          }

          // You can return any component that you like here!
          return <View style={{borderWidth:5,borderColor:"white",borderRadius:30}}><Feather name={iconName} size={size} color={color} /></View>;
        },
        tabBarActiveTintColor: 'deepskyblue',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <Tab.Screen name="Home" component={ListItemScreen} options={{title:"",headerShown:false}} />
      <Tab.Screen name="create" component={CreateAdScreen} options={{title:"",headerShown:false}} />
      <Tab.Screen name="account" component={AccountScreen} options={{title:"",headerShown:false}} />
   
    </Tab.Navigator>
    )
}

const Navigation=()=>{
  const [user,setUser]=useState('')

  useEffect(()=>{
    const unsubscribe=auth().onAuthStateChanged((userExist)=>{
      if(userExist){
        setUser(userExist);
      }else{
        setUser('') 
      }
    })
    return unsubscribe
  },[])
  return(
    <NavigationContainer theme={myTheme}>
      {user?<TabNavigator/>:<AuthNavigator/>}
       
      
    </NavigationContainer>
  )
}

const App = () => {



  return (
    <>
    <PaperProvider theme={theme}>
    <StatusBar barStyle="dark-content" backgroundColor="deepskyblue"/>
    <View style={styles.container}>
{/* <LoginScreen/> */}
{/* <SignupScreen/> */}
{/* <CreateAdScreen/> */}
{/* <ListItemScreen/> */}
<Navigation/>
    </View>
    </PaperProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
   
  }
})