import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [inputMessage,setInputMessage]=useState("")

  const handleButtonClick = () => {
    console.log(inputMessage);
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": inputMessage,
          }
        ]
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleTextInput=(text)=>{
    setInputMessage(text)
    console.log(text)
}


  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:"center"}}>
      <Text>resulsts</Text>
      </View>
      
      <View style={styles.firstview}>
        <View style={{flex:1,marginLeft:10}}>
          <TextInput onChangeText={handleTextInput} placeholder='Enter your question' /> 
        </View>
        
        <TouchableOpacity 
            onPress={handleButtonClick}
            style={{backgroundColor:"red",padding:5,marginRight:10}}>
          <Text>Send</Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstview:{
    flexDirection:"row"
  }
});
