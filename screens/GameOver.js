import React  from "react";
import {View, Text, StyleSheet, Button,Image} from 'react-native';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Game is over</Text>
            <View style={styles.imageContainer}>
               {/* <Image  fadeDuration={1000} source={{uri:'https://ayoba.com/picture/renderBusinessPicture/IconSowetoPimvilleSquare?pid=3bd2c7a1-53f8-4cd5-a45d-e1bf14bceac2&type=twofifty'}}  */}
                <Image source={require('../assets/icon.png')} 
                style={styles.image}
                resizeMode='cover'/>
            </View>
            <Text>Number of Rounds: <Text style={styles.highlight}> {props.roundsNumber}</Text></Text>
            <Text>Number was:<Text>{props.userNumber}</Text></Text>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth:3,
        borderColor: 'grey',
        overflow: 'hidden' //Cuts off any overflow of children like image
    },
    image:{
        width: '100%',
        height: '100%'
    },
    highlight:
    {
        color: 'red'
    }
});

export default GameOverScreen;