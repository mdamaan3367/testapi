import { Image, KeyboardAvoidingView, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const SignupScreen = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')


const userSignup=async()=>{
  if(!email||!password)
  { Alert.alert("please fill all details")
  return
}
  try{
    await auth().createUserWithEmailAndPassword(email,password)
   messaging().getToken().then(token=>{
     firestore().collection('usertoken').add({
      token:token
     })
    })
    
  
}catch(err){
  Alert.alert("something went wrong")
}
 

}




  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={styles.box1}>
      <Image style={{height:200,width:200}} source={require('../assets/cnqlogo.png')}/>
        <Text style={styles.text}>please do signup </Text>
      </View>
      <View style={styles.box2}>
      <TextInput
      label="Email"
      value={email}
      mode='outlined'
      onChangeText={text => setEmail(text)}
    />

<TextInput
      label="Password"
      value={password}
      mode='outlined'
      secureTextEntry={true}
      onChangeText={text => setPassword(text)}
    />

<Button icon="camera" mode="contained" onPress={() => userSignup()}>
    signup
  </Button>
  <TouchableOpacity onPress={()=>navigation.goBack()}>
  <Text style={{textAlign:"center"}}>login?</Text>
  </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    box1:{
        alignItems:"center"
    },
    text:{
        fontSize:22
    },
    box2:{
        paddingHorizontal:40,
        height:"50%",
        justifyContent:"space-evenly"
    }
    
})