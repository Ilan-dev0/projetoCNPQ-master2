import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import 'react-native-gesture-handler';
//import SliderEntry from './SliderEntry';

const carouselItems = [
    {
        title: 'Brasil',
        language: 'PT',
        image: 'https://mediaim.expedia.com/localexpert/442936/c026f8aa-e933-4d8f-8ee9-c3a7555f335c.jpg',
        descPT: 'Responda perguntas sobre o país tropical mais famoso do mundo!',
        descES: '¡Responde preguntas sobre el país tropical más famoso del mundo!'
    },
    {
        title: 'Equador',
        language: 'PT',
        image: 'https://www.kevinandamanda.com/wp-content/uploads/2018/07/best-things-to-do-quito-ecuador-best-day-trips-19.jpg',
        descPT: 'Explore vulcões, montanhas e uma cultura rica!',
        descES: '¡Explora volcanes, montañas y una rica cultura!'
    }
];


export default class QuizSelection extends React.Component {
    


    render(){
        let language = 'PT'
        if(this.props.route.params != null){
            language = this.props.route.params; 
            carouselItems[0].language = language.language;
            carouselItems[1].language = language.language;
            //console.log(carouselItems[0].language)
        }
        function renderItem({item}) {
            const language = item.language
            return(
                <View>
                      <TouchableOpacity onPress={()=>{

                        if(item.title == 'Brasil'){
                            this.props.navigation.navigate('RenderQuiz', {QuizCounty: 'BR', language})
                        }else{
                            //console.log(language);
                            this.props.navigation.navigate('RenderQuiz', {QuizCounty: 'EQ', language})
                        }
                      }}>
                        <Image style={[style.carouselItemImage]} source={{uri: `${item.image}`}} />
                        <View style={[style.carouselItemContainer]}>
                        <Text style={[style.title2]}>{item.title}</Text>
                        <Text  style={[style.text]}>{language == 'PT' ? item.descPT : item.descES }</Text>
                    </View>
                    </TouchableOpacity>   
                    
                </View>
                
            );

        }

        if (language == 'PT') {
            return(
                    <View style={style.container}>
                        <View style={style.ConfigButtonContainer}>
                            < TouchableOpacity onPress={()=>{this.props.navigation.navigate('ConfigScreen')}}>
                                <Image style={style.ConfigButtonImage} source={require('../assets/images/ConfigIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={style.container3}>
                            <Text style={[style.labelStyle, style.title]}>Selecíone o País: </Text>
                            <Carousel  
                                data={carouselItems}
                                renderItem={renderItem.bind(this)}
                                sliderWidth={300}
                                itemWidth={300}
                                useScrollView={true}  
                                layout={'tinder'} 
                                layoutCardOffset={20}     
                            />
                            { this.pagination }
                        </View>
                    </View>
            );
        } else {
            return(
                <View style={[style.container]}>
                <View style={style.ConfigButtonContainer}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ConfigScreen')}}>
                        <Image style={style.ConfigButtonImage} source={require('../assets/images/ConfigIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={style.container3}>
                    <Text style={[style.labelStyle, style.title]}>Seleccionar país: </Text>
                    <Carousel  
                        data={carouselItems}
                        renderItem={renderItem.bind(this)}
                        sliderWidth={300}
                        itemWidth={300}
                        useScrollView={true}    
                        layout={'tinder'} 
                        layoutCardOffset={20}         
                    />
                    { this.pagination }
                </View>
            </View>
            );
        }
    }
}

const style= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: "center",
        backgroundColor: '#8082d6',
        width: '100%',
        height: '100%',
 
    }, 
    buttonImage1: {
        width: 300, 
        margin: 0,
        height: 200,
        borderColor:'black',
        borderWidth:2,
    },
    buttonImage2: {
        width: 300, 
        margin: 0,
    },
    labelStyle: {
        color: 'white',
        fontSize: 35
    },
    title:{
        fontFamily: 'Poppins_700Bold',
        fontSize: 30, 
        color: 'white', 
        marginBottom: 10,
        marginTop: '40%'
    },
    title2:{
        fontFamily: 'Poppins_400Regular',
        fontSize: 20, 
        color: 'black', 
        padding: 0,
        marginTop: -15
    },
    text:{
        fontFamily: 'Poppins_300Light_Italic',
        fontSize: 13, 
        color: 'black', 
        padding: 0,
        marginBottom: 0,
        opacity: 0.6
    },
    carouselItemContainer:{
        zIndex: 9,
        alignContent: 'center',
        backgroundColor: 'white',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        height: 90,
        padding: 20,
        position: 'relative',
        top: -80,
    },
    carouselItemImage: {
        width: '100%',
        height: '65%',
        borderRadius: 10,
        marginBottom: 40
    },
    carouselItemTitle: {
        fontSize: 25,
        fontFamily: 'Poppins_700Bold',
        color: 'black',
        
    },
    container2:{
        alignContent: 'center',
        backgroundColor: '#333',
        borderRadius: 4,
    },
    container3: {
        justifyContent: 'center', 
        alignItems: "center"
    },
    ConfigButtonImage: {
        width: 65, 
        height: 90, 
        marginTop: 70,
        marginLeft: 250,
        display: 'flex',
        alignItems: 'flex-end'

    },
    ConfigButtonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        height: 70
    }
});

