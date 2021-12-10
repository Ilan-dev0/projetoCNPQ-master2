import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import QuizBrDataEs from '../assets/data/QuizBrDataEs';
import QuizBrDataPt from '../assets/data/QuizBrDataPt';
import QuizEqDataEs from '../assets/data/QuizEqDataEs';
import QuizEqDataPt from '../assets/data/QuizEqDataPt';
import Quiz from '../components/Quiz';
export default class RenderQuiz extends React.Component {
    render(){
        const {language, QuizCounty} = this.props.route.params;
        let Questions = null;
        if(language == 'PT' && QuizCounty == 'BR'){
            Questions = QuizBrDataPt;
        }
        if(language == 'ES' && QuizCounty == 'BR'){
            Questions = QuizBrDataEs;
        }
        if(language == 'PT' && QuizCounty == 'EQ'){
            Questions = QuizEqDataPt;
        }
        if(language == 'ES' && QuizCounty == 'EQ'){
            Questions = QuizEqDataEs;
        }
        return(
            <Quiz  QuizCounty={QuizCounty} Questions={Questions} Language={language}
                BackToHome={() => {
                    this.props.navigation.navigate('QuizSelection', {language});
                }}
            />
        );
    }
}