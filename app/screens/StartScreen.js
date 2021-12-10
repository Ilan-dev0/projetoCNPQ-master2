import React from "react";
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity} from "react-native";
export default class StartScreen extends React.Component {

    render(){
        return(
            <View style={styles.background}>
                    <View style={{justifyContent: 'center', alignItems: "center", backgroundColor: '#8082d6', width: '100%', height: '100%'}}>
                    <ImageBackground style={[style.containerLogo]} source={require('../assets/images/LogoBranca.png')} />
                    <Text style={[style.text]}>Game</Text>
                    <Text style={[style.title]}>CCTI Quiz</Text>

                    <TouchableOpacity 
                        style={styles.startButton}
                        onPress={() => {this.props.navigation.navigate('QuizSelection')}
                    }>
                        <Text style={{fontSize: 20, color: 'white'}}>Jogar</Text>

                    </TouchableOpacity>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    startButton: {
        backgroundColor: '#595a94',
        width: '50%',
        height: 50,
        borderRadius: 50, 
        justifyContent: 'center',
        alignItems: "center",

        
    },
    container2:{
        alignItems: 'center',
        marginBottom: 0
    },
    background:{
        position:"absolute",
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems: "center",
        justifyContent: "center"
    },
    modalText:{
        textAlign:"center",
        fontSize: 24
    },
    modalButton:{
        backgroundColor:"transparent",
        borderRadius:100,
        borderColor:"#ffffff",
        marginTop:64,
        borderWidth:1,
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:25,
        paddingRight:25,
        marginHorizontal:5,
        flex:1,

    },
    moreText: {
        textAlign:"center",
        marginTop:64,

    },
    helloText:{
        fontSize:51.2,
        textAlign:"center",
        marginTop:20,

    },
    wrap:{
        padding:20,
        margin:20,
        borderRadius:8,
        backgroundColor:"#2D3953",
        shadowColor:"#4048BF",
        shadowOffset:{
            width: 8.4,
            height: 8.4
        },
        shadowOpacity:0.74,
        shadowRadius:30,
        elevation:10,

    },
    text:{
        fontSize:28.8,
        color:"#ECE0E9",
        fontWeight:"600",

    },
    center:{
        justifyContent:"center",
        alignItems:"center",

    },
    shadowButton:{
        borderColor:"blue",
        borderWidth:1,
        borderRadius:105,
        width:210,
        height:80,

        shadowColor:"#4048BF",
        shadowOffset:{
            width:8.4,
            height:8.4
        },
        shadowOpacity:0.5,
        shadowRadius:30,
        elevation:10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        margin: 20
    },
    mainButton:{
        zIndex:10,
        width:200,
        height:70,
        borderRadius:100,
        shadowColor:"#4048BF",
        shadowOffset:{
            width:6.4,
            height:6.4,
        },
        shadowOpacity:0.5,
        shadowRadius:20,
        backgroundColor:"#2D3953"
    },
    container2:{
        flex:1,
        backgroundColor:'white',
    },
    tip:{
        position:"relative",
        left:0,
        right:0,
        top:-445,
        bottom:0,
        alignItems: "center",
        justifyContent: "center" 
    }
  });

  const style= StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: "center",
        backgroundColor: '#252c4a',
        width: '100%',
        height: '100%'
    },
    containerLogo: {
        justifyContent: 'center', 
        alignItems: "center",
        width: 200,
        height: 260,
        marginLeft: 20,
        marginBottom: 30
    },
    button: {
        backgroundColor: '#19F29E',
        width: '65%',
        height: 65,
        borderRadius: 50, 
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 25
    },
    buttonText: {
        fontSize: 25,
        color: 'white'  
    },
    title:{
        fontFamily: 'Poppins_700Bold',
        fontSize: 40, 
        color: 'white', 
        marginBottom: 20
    },
    text:{
        fontFamily: 'Poppins_400Regular',
        fontSize: 20, 
        color: 'white', 
        marginBottom: 10
    }
})

