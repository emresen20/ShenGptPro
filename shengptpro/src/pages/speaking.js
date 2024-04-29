import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {MaterialIcons} from "@expo/vector-icons"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Speech from 'expo-speech';

import {API_TOKEN,API_URL} from "@env"

export default function Speak({navigation}) {


  const [inputMessage, setInputMessage] = useState("")
  const [outputMessage, setOutputMessage] = useState("Results Here")
  const [messages,setMessages]= useState([])
  

  const renderAvatar = (props) => {
    // Replace 'localImagePath' with the path to your local image
    return (
      <Image
        source={require("../images/shegpt.png")} // Path to your local image
        style={{ width: 40, height: 40, borderRadius: 20 }} // Customize avatar size and shape
      />
    );
  };

  const handleButtonClick = () => {
    console.log(inputMessage);
    const message= {
      _id:Math.random().toString(36).substring(7),
      text:inputMessage,
      createdAt:new Date(),
      user:{_id:1}
    }
    setMessages((previousMessages)=>
      GiftedChat.append(previousMessages,[message])
    )
    fetch(`${process.env.API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
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
        console.log(data.choices[0].message.content)
        setInputMessage("")
        setOutputMessage(data.choices[0].message.content.trim())
        const message= {
          _id:Math.random().toString(36).substring(7),
          text:data.choices[0].message.content.trim(),
          createdAt:new Date(),
          user:{_id:2, name:"SHENGPTPRO"}
        }
        setMessages((previousMessages)=>
          GiftedChat.append(previousMessages,[message])
        )
        options={};
        Speech.speak(data.choices[0].message.content,options)
      });
  };

  const handleimagesClick = () => {
    console.log(inputMessage);
    fetch(`${process.env.API_URL}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
      body: JSON.stringify({
        "model": "dall-e-3",
        "prompt": inputMessage,
        "n": 1,
        "size": "1024x1024"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data[0].url)
        setOutputMessage(data.data[0].url)
      });
  };


  const handleTextInput = (text) => {
    setInputMessage(text)
    console.log(inputMessage)
  }

  return (
  
    <SafeAreaView style={{flex:1}}>
        <View style={{backgroundColor:"#606c38",height:hp(9),alignItems:"center",justifyContent:"space-around",flexDirection:"row",marginTop:32}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
              <MaterialIcons name="arrow-back" size={30} color={"#fefae0"} /> 
          </TouchableOpacity>
          
          <Image source={require("../images/shegpt.png")} style={{width: wp(15), height: hp(7), borderRadius: 20}}/>
          <Text style={{fontSize:hp(4),color:"#fefae0",marginRight:wp(20)}}>ShenGpt</Text>
        </View>
      <View style={{ flex: 1, justifyContent: "center" }}>

        {/* <Image  source={{uri:outputMessage}} style={{height:100,width:100}}/> */}
        <GiftedChat 
        messages={messages} 
        renderInputToolbar={()=>{}} user={{_id:1}} 
        minInputToolbarHeight={0}
        renderAvatar={renderAvatar}/>
      </View>

      <View style={styles.firstview}>
        <View style={{ flex: 1, marginLeft: 8,marginRight:8,marginBottom:20,backgroundColor:"white",borderColor:"gray",
        borderWidth:1,borderRadius:10,justifyContent:"center",paddingLeft:9,paddingRight:9,height:60, }}>
          <TextInput onChangeText={handleTextInput} placeholder='Enter your question' value={inputMessage} />
        </View>

        <TouchableOpacity
          onPress={handleButtonClick}
          style={{ backgroundColor: "#606c38", padding: 1, borderRadius:9999,height:60,width:60,justifyContent:"center",alignItems:"center",marginRight:3  }}>
          <MaterialIcons name="send" size={30} color={"#fefae0"}/>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstview: {
    flexDirection: "row"
  }
});
