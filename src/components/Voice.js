import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {
  goToCartSynonyms,
  goToOrderHistorySynonyms,
  isFindUserCorrectText,
} from '../utils/globalFunctions';
import {useNavigation} from '@react-navigation/native';
import SpeechToTextUI from './Assistant/SpeechToTextUI';

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function VoiceTest() {
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (trigger) {
      
      _stopRecognizing(partialResults);
    }
  }, [trigger]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      setTrigger(false)
    };
  }, []);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('true');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('true');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('true');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));

    setTrigger(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  let g = debounce(() => {
    console.log('hi8765458765678');
    setTrigger(true);
  }, 1500);

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    g();
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('en-US');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      setStarted(false)
      if (isFindUserCorrectText(partialResults, goToCartSynonyms)) {
        navigation.navigate('Cart');
      } else if (
        isFindUserCorrectText(partialResults, goToOrderHistorySynonyms)
      ) {
        navigation.navigate('Order');
      }else{
        setTrigger(false)
      }
      setVolume('')
      _destroyRecognizer()
    } catch (e) {
      console.error(e);
    } 
    // finally {
    //   setTrigger(false);
    // }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      setStarted(false)
    } catch (e) {
      console.error(e);
    } 
    // finally {
    //   setTrigger(false);
    // }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      
    } catch (e) {
      console.error(e);
    } 
    // finally {
    //   setTrigger(false);
    // }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setTrigger(false);
  };


  // <View style={styles.container}>
    //   {/* <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
    //   <Text style={styles.instructions}>
    //     Press the button and start speaking.
    //   </Text>
    //   <Text style={styles.stat}>{`Started: ${started}`}</Text>
    //   <Text style={styles.stat}>{`End: ${end}`}</Text>
    //   <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
    //   <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
    //   <Text style={styles.stat}>{`Error: ${error}`}</Text>
    //   <Text style={styles.stat}>Results</Text>
    //   {results.map((result, index) => {
    //     return (
    //       <Text key={`result-${index}`} style={styles.stat}>
    //         {result}
    //       </Text>
    //     );
    //   })}
    //   <Text style={styles.stat}>Partial Results</Text>
    //   {partialResults.map((result, index) => {
    //     return (
    //       <Text key={`partial-result-${index}`} style={styles.stat}>
    //         {result}
    //       </Text>
    //     );
    //   })}
    //   <Text style={styles.stat}>{`End: ${end}`}</Text> */}
    //   {/* <TouchableHighlight onPress={_startRecognizing}>
    //     <Text>Start</Text>
    //   </TouchableHighlight>
    //   <TouchableHighlight onPress={_stopRecognizing}>
    //     <Text style={styles.action}>Stop Recognizing</Text>
    //   </TouchableHighlight>
    //   <TouchableHighlight onPress={_cancelRecognizing}>
    //     <Text style={styles.action}>Cancel</Text>
    //   </TouchableHighlight>
    //   <TouchableHighlight onPress={_destroyRecognizer}>
    //     <Text style={styles.action}>Destroy</Text>
    //   </TouchableHighlight> */}
      
    // </View>

  return (
    <>
     {/* <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Started: ${started}`}</Text>
      <Text style={styles.stat}>{`End: ${end}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>Partial Results</Text>
      {partialResults.map((result, index) => {
        return (
          <Text key={`partial-result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>{`End: ${end}`}</Text>  */}
    <SpeechToTextUI start={_startRecognizing} stop={_stopRecognizing} cancel={_cancelRecognizing} destroy={_destroyRecognizer} started={started} end={end} volume={volume}/>
    
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest;
