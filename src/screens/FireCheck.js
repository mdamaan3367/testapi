import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { Alert, StyleSheet, Text, View } from 'react-native'

const FireCheck = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = messageArray => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messageArray),
    )
  }

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    renderBubble={props=>{
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:"orange"
            }
          }}
        />
      )
    }}
  />
  </View>
  )
}

export default FireCheck

const styles = StyleSheet.create({})