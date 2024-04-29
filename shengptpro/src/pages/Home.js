import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MaterialIcons} from "@expo/vector-icons"

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.firstview}>
                <Image style={styles.firstpicture} source={require("../images/shegpt.png")} />
                <Text style={styles.firstext}>ShenGpt</Text>

            </View>
            <View style={styles.secondview}>
                <TouchableOpacity onPress={() => navigation.navigate("Chatgpt")}>
                    <View style={styles.chatview}>
                        <Text style={styles.textss}>
                            Ask me whatever you want
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Speak")}>
                    <View style={styles.speakview}>
                        <MaterialIcons name="record-voice-over" size={30} color={"#fefae0"} /> 
                        <Text style={{color:"#fefae0",marginRight:wp(3)}}>Read for me</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Dalle")}>
                    <View style={styles.dalleview}>
                        <Text style={styles.textss}>Produce the image you want</Text>
                    </View>
                </TouchableOpacity>
           


            </View>
        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dce1de"
    },
    firstview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    secondview: {
        flex: 1,

        alignItems: "center"
    },
    firstpicture: {
        height: ('50%'),
        width: wp('50%')
    },
    firstext: {
        fontSize: hp(5),
        color: "#1f2421",
        marginTop: hp(2)
    },
    secondtext: {
        color: "#1f2421",
        marginTop: hp(1),

    },
    chatview: {
        height: hp(10),
        width: wp(60),
        backgroundColor: "#386641",
        marginTop: hp(5),
        borderTopStartRadius: hp(5),
        justifyContent: "center",
        alignItems: "center"
    },
    dalleview: {
        height: hp(10),
        width: wp(60),
        backgroundColor: "#a7c957",
        marginTop: hp(5),
        borderBottomRightRadius: hp(5),
        justifyContent: "center",
        alignItems: "center"
    },
    textss: {
        color: "#fefae0",
    },
    speakview:{
        height: hp(10),
        width: wp(60),
        backgroundColor: "#6a994e",
        marginTop: hp(5),
        justifyContent:"space-around",
        alignItems: "center",
        flexDirection:"row"
    }
});