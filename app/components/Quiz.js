import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import { COLORS, SIZES } from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { isNamespaceExport } from 'typescript';



const Quiz = (props) => {
    const {QuizCounty, Questions, BackToHome, Language} = props;
    const allQuestions = Questions;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    
    //Metódo para randomizar as perguntas 

    // const shuffleArray = array => {
    //     for(let i = array.length - 1; i > 0; i--){
    //         const j = Math.floor(Math.random() * (i + 1));
    //         const temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    // }
    // let shuffledQuestions = React.useMemo(() => {
          
    //     return shuffleArray(allQuestions);
    //   }, []);
    
        
    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Mostrar botão Próximo
        setShowNextButton(true)
    }
    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-36){
            // Ultima questão
            // Mostrar Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {

        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 25
            }}>
                {/* Contador de perguntas */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length-35}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 20
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View style={[styles.wrap2]}>

<View style={[styles.container]}>
                   <TouchableOpacity onPress={onOpen} style={{height:70, width: 70}}>
                <Image style={{height:70, width: 70, position: 'relative', bottom: 4}} source={require('../assets/images/Icone-Dica.png')} />
                    </TouchableOpacity>


               </View>

            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? COLORS.success
                            : option==currentOptionSelected 
                            ? COLORS.error 
                            : QuizCounty=='EQ' 
                            ?'#595a94'
                            :'#595a94',
                            backgroundColor: option==correctOption 
                            ? COLORS.success +'20'
                            : option==currentOptionSelected 
                            ? COLORS.error +'20'
                            : QuizCounty=='EQ'
                            ?'#595a94'
                            :'#595a94',
                            height: 54, borderRadius: 40,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 5
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                   alignSelf: 'center', marginTop: 20, width: '100%', backgroundColor: '#FFD200', padding: 10, borderRadius: 30
                }}>
                    <Text style={{fontSize: 20, color: COLORS.black, textAlign: 'center'}}>Próximo</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }
    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length-36],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: '#FFD200'
                },{
                    width: progressAnim
                }]}>

                </Animated.View>


            </View>
        )
        

        
    }

    const modalizeRef = useRef(null);

    function onOpen(){
        modalizeRef.current?.open();

    }
    
    

    return (
    
       <GestureHandlerRootView style={{
           flex: 1
       }}>


            
            <Modalize
                ref={modalizeRef}
                snapPoint={1200}
                modalHeight={350}
            >
                <View
                 style={{
                    backgroundColor: '#2D3953' ,
                    flex:1,
                    height: 500,
                    flexDirection: 'row',
                    justifyContent: 'center'
                 }}
                >
                    <View style={styles.wrap2}>
                        <Text style={[styles.text1, styles.helloText]}>Dica:</Text>
                        <Text style={[styles.text1, styles.moreText]}>{allQuestions[currentQuestionIndex]?.Hint}</Text>
                    </View>
                </View>
               
            </Modalize>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: COLORS.background,
               position:'relative'
           }}>

               {/* ProgressBar */}
               { renderProgressBar() }
            
               {/* Question */}
               {renderQuestion()}

               {/* Tip Button */} 
               
               
               
               
               {/* Options */}
               {renderOptions()}


               {/* Next Button */}
               {renderNextButton()}

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           {Language=='PT'
                            ?<Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length-43) ? 'Parabéns, você concluiu o Quiz!' : 'Oops, você falhou!' }</Text>
                            : <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length-43) ? 'Felicidades!' : 'Oops!' }</Text>
                           }

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length-43) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ { allQuestions.length-35 }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>
                                   {Language=='PT'
                                   ?'Tentar novamente'
                                   :'Intentar nuevamente'}
                               </Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                           onPress={BackToHome}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20, marginTop: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>
                                   {Language=='PT'
                                   ?'Voltar'
                                   :'Vuelve'}
                               </Text>
                           </TouchableOpacity>

                       </View>

                   </View>
               </Modal>

               {/* Background Image*/} 
                
                 <View style={{
                    backgroundColor: '#8082d6' ,
                    width: SIZES.width,
                    height: SIZES.height,
                    position: 'absolute',
                    zIndex: -1,
                    bottom: 0,
                    left: 0,
                    right: 0
                }}>

                 </View>
           </View>
       </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
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
        marginTop:20,
        fontSize: 25

    },
    helloText:{
        fontSize:40,
        textAlign:"center",
        marginTop:0,

    },
    wrap:{
        height: 60,
        marginBottom: 10,
        marginTop: 10,
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
    wrap2:{
        padding:20,
        borderRadius:8,
        backgroundColor:"#2D3953",     
    },
    text1:{
        fontSize:28.8,
        color:"#ECE0E9",
        fontWeight:"600"
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
    },
    bruh:{
        paddingBottom: 80
    }
})

export default Quiz