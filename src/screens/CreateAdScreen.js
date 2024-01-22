import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { TextInput,Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';


const CreateAdScreen = () => {
    const [name,setName]=useState('');
    const [desc,setDesc]=useState('');
    const [year,setYear]=useState('');
    const [price,setPrice]=useState('');
    const [phone,setPhone]=useState('');
    const [image,setImage]=useState('');

const sendNoti=()=>{
  firestore().collection('usertoken').get().then(querySnap=>{
    const userDevicetoken=querySnap.docs.map(docSnap=>{
      return docSnap.data().token
    })
    console.log(userDevicetoken)
    fetch('https://7076-103-211-36-30.ngrok-free.app/send-noti',{
                method:'post',
                headers: {
                    'Content-Type': 'application/json'
                     
                  },
                body:JSON.stringify({
                    tokens:userDevicetoken
                })   
            })
  })
}

    

  const postData=async()=>{
    try{
      await firestore().collection('ads')
      .add({
        name,
        desc,
        year,
        price,
        phone,
        image:"https://images.unsplash.com/photo-1705468616275-616b7c01d317?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        uid:auth().currentUser.uid
      })
      Alert.alert("posted")
    }catch(err){
      Alert.alert("wrong")
    }
    

  }

  const openCamera = ()=>{
    launchImageLibrary({quality:0.5},(fileobj)=>{
        //    console.log(fileobj)
        const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.assets[0].uri)
        uploadTask.on('state_changed', 
        (snapshot) => {
           
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             if(progress==100){alert("uploaded")}
        }, 
        (error) => {
          console.log(error)
           alert("something went wrong")
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               
               // setImage(downloadURL)
            });
        }
        );
       })
   }



  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateAdScreen</Text>
      <TextInput
      label=" ad title"
      value={name}
      mode='outlined'
      onChangeText={text => setName(text)}
    />
    <TextInput
      label=" Describe what you are selling!"
      value={desc}
      mode='outlined'
      numberOfLines={3}
      multiline={true}
      onChangeText={text => setDesc(text)}
    />
    <TextInput
      label=" year of purchase"
      value={year}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setYear(text)}
    />
    <TextInput
      label="price in inr"
      value={price}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setPrice(text)}
    />
    <TextInput
      label="ypur contact"
      value={phone}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setPhone(text)}
    />
    <Button icon="camera" mode="contained" onPress={() =>openCamera() }>
    upload image
  </Button>
  <Button   mode="contained" onPress={() =>postData() }>
    post
  </Button>
  <Button   mode="contained" onPress={() =>sendNoti() }>
    test noti
  </Button>
    </View>
  )
}

export default CreateAdScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:30,
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22,
        textAlign:"center"
    }
})