import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }
  
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver, roundsCheck}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if(currentGuess === userNumber) {
          onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) { //direction -> 'lower', 'greater'

        if
        ((direction == 'lower' && currentGuess < userNumber) || (direction == 'greater' && currentGuess > userNumber)) {
            Alert.alert('Dont lie!', 'you know this is wrong', [
                {text: 'sorry!', style: 'default'} 
            ])
            return;
        }

        if(direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber);
        setGuessRounds((prev) => [ newRndNumber, ...prev])
        
    }

    console.log('userNumber:', userNumber, 'currentGues:', currentGuess)
    console.log('array:', guessRounds)
    return (
        <View style={styles.screen}>
          <Title>Opponent's Guess</Title>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card>
            <InstructionText style={styles.instructionText}>
              Higher or lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                  <Ionicons name="remove" size={24} color="white" />
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="add" size={24} color="white" />
                </PrimaryButton>
              </View>
            </View>
          </Card>
          {/* <View>{guessRounds.map((data) => <Text key={data}>{data}</Text>)}</View> */}
          <View style={styles.listContainer}>
            <FlatList 
              data={guessRounds}
              renderItem={(data) => {
                return (
                  <GuessLogItem key={data} roundNumber={guessRounds.length - data.index} guess={data.item}>
                    {data.item}
                  </GuessLogItem>
                )
              }}
            />
          </View>
        </View>
      );

}

export default GameScreen;

const styles= StyleSheet.create({
    screen: {
        flex: 1,
        padding: 40,
    },
    buttonsContainer: {
        flexDirection:'row'
    },
    buttonContainer: {
        flex:1, 
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
      flex: 1,
      padding: 16,
    }

})