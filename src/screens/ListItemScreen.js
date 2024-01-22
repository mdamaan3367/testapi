import { FlatList, StyleSheet,  View,Linking,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Paragraph, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemScreen = () => {
  const [items,setItems]=useState([])
    

    const getDetails=async()=>{
      const querySnap=await firestore().collection('ads').get()
     const result= querySnap.docs.map(docSnap=>docSnap.data())
     console.log(result)
     setItems(result)
    }


    const openDial=(phone)=>{
      if(Platform.OS==='android'){
        Linking.openURL(`tel:${phone}`)
      }else{
        Linking.openURL(`telprompt:${phone}`)
      }

    }

    useEffect(()=>{
 getDetails()
 return()=>{
  console.log("cleanup")
 }
    },[])
    const renderItem=(item)=>{
      return(  <Card style={styles.card}>
    <Card.Title title={item.name}  />
    <Card.Content>
      
      <Text variant="bodyMedium">{item.desc}</Text>
      <Paragraph>{item.year}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri:item.image }} />
    <Card.Actions>
      <Button>{item.price}</Button>
      <Button onPress={()=>openDial()}>call seller</Button>
    </Card.Actions>
  </Card>)
    }
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item)=>item.phone}
        renderItem={({item})=>renderItem(item)}
      />
    </View>
  )
}

export default ListItemScreen

const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
})