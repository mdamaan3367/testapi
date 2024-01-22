import { Image, KeyboardAvoidingView, StyleSheet, Text,Alert, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const userLogin=async()=>{
      if(!email||!password)
      { Alert.alert("please fill all details")
      return
    }
      try{
       const result= await auth().signInWithEmailAndPassword(email,password);
       console.log(result.user)
    }catch(err){
      Alert.alert("something went wrong")
    }
     
    
    }


  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={styles.box1}>
      <Image style={{height:200,width:200}} source={require('../assets/cnqlogo.png')}/>
        <Text style={styles.text}>please do login </Text>
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

<Button icon="camera" mode="contained" onPress={() => userLogin()}>
    login
  </Button>
<TouchableOpacity onPress={()=>navigation.navigate("signup")}>
  <Text style={{textAlign:"center"}}>dont have account?</Text>
  </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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