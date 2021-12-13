import React, {useState, useRef, useEffect} from 'react';
import {View,Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { Ionicons} from '@expo/vector-icons'
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude); //Calling func within func is called recursion
    }else{
        return rndNum;
    }
};

const renderListItem =  (value,numOfRound) =>(
    <View key={value} style={styles.listItem}>
        <Text>#{numOfRound}</Text>
    <Text>{value}</Text>
</View>
)
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses,setPastGuesses] = useState([]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if(currentGuess == userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess,userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Don\'t lie!', 'You know its wrong',[{text: 'Sorry', style: 'cancel'}])
            return;
        }

        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }else{
            currentLow.current = currentGuess +1 ;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber); //allows component to be re-rendered
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber,...curPastGuesses]);
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton title="LOWER" onPress={nextGuessHandler.bind(this,'lower')} >
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton title="GREATER" onPress={nextGuessHandler.bind(this,'greater')} >
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>
                {/* <FlatList keyExtractor={(item)=> item} data={pastGuesses} renderItem={renderItem.bind(this,pastGuesses.length)}/> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    listContainer:{
        flex: 1,
        width: '80%'
    },
    list:{
        flexGrow: 1,
        alignItems:'center',
        justifyContent: 'flex-end'
    },

    listItem:{
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
       justifyContent: 'space-around',
       width: '60%'
    },
   
});

export default GameScreen;