{/*Assignment 3.2 : Pressable and User Input by ALexis Martinez 2025 */}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  TextInput,
  Switch,
  Pressable,
  FlatList,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';


// Default durations for each mode in seconds
const DEFAULT_POMODORO_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
const DEFAULT_LONG_BREAK_TIME = 15 * 60;

// Map of sound files
const SOUND_FILES = {
  Backgroundm: require('./assets/Treasure_Hunt.mp3'),
  Ring: require('./assets/Phone_Ringing.mp3'),
  Discord: require('./assets/discord-notification.mp3')  };

export default function App() {
    // App state variables

  const [time, setTime] = useState(DEFAULT_POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('POMODORO');
  const [darkMode, setDarkMode] = useState(false);
  const [customPomodoro, setCustomPomodoro] = useState(25);
  const [customShortBreak, setCustomShortBreak] = useState(5);
  const [customLongBreak, setCustomLongBreak] = useState(15);
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const timerRef = useRef(null); // Reference for timer interval
// music 
const [backgroundSound, setBackgroundSound] = useState(null);
const [backgroundPlaying, setBackgroundPlaying] = useState(false);


  // Save all settings and timer info
    // Save current state to AsyncStorage
  const saveState = useCallback(async () => {
    try {
      await AsyncStorage.setItem(
        'timerState',
        JSON.stringify({
          time,
          isRunning,
          mode,
          darkMode,
          customPomodoro,
          customShortBreak,
          customLongBreak
        })
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [time, isRunning, mode, darkMode, customPomodoro, customShortBreak, customLongBreak, tasks]);
 
  // Load saved state on app launch

  const loadState = async () => {
    try {
      const state = await AsyncStorage.getItem('timerState');
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (state) {
        const parsed = JSON.parse(state);
        setTime(parsed.time);
        setIsRunning(parsed.isRunning);
        setMode(parsed.mode);
        setDarkMode(parsed.darkMode);
        setCustomPomodoro(parsed.customPomodoro);
        setCustomShortBreak(parsed.customShortBreak);
        setCustomLongBreak(parsed.customLongBreak);
      }
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  };

  useEffect(() => {
    loadState();
  }, []);
  
  // Save state on any changes
  useEffect(() => {
    saveState();
  }, [time, isRunning, mode, darkMode, customPomodoro, customShortBreak, customLongBreak, tasks]);

  useEffect(() => {
    if (isRunning && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearTimer(); // Stop timer
            Vibration.vibrate();  // Vibrate on complete
            playSoundEffect('Ring'); // 🔔 Play the Phone_Ringing sound
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1; // Decrease timer
        });
      }, 1000);
    } else {
      clearTimer(); // If not running, clear interval
    }
    return () => clearTimer(); // Cleanup on unmount or re-render
  }, [isRunning]);
  
 // Play background music
const playBackgroundMusic = async () => {
  if (backgroundSound) {
    await backgroundSound.playAsync();
    setBackgroundPlaying(true);
  } else {
    const { sound } = await Audio.Sound.createAsync(SOUND_FILES.Backgroundm);
    setBackgroundSound(sound);
    await sound.setIsLoopingAsync(true); // Loop music
    await sound.setVolumeAsync(0.3); // Set lower volume for background
    await sound.playAsync();
    setBackgroundPlaying(true);
  }
};

// Stop background music
const stopBackgroundMusic = async () => {
  if (backgroundSound) {
    await backgroundSound.stopAsync();
    setBackgroundPlaying(false);
  }
};
const playSoundEffect = async (soundName) => {
  try {
    const { sound } = await Audio.Sound.createAsync(SOUND_FILES[soundName]);
    await sound.playAsync();
    // Unload sound from memory after it finishes playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error('Error playing sound effect:', error);
  }
};
 
  // Clear the timer interval

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
  
  
  // Reset the timer based on the current mode

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'POMODORO') setTime(customPomodoro * 60);
    if (mode === 'SHORT_BREAK') setTime(customShortBreak * 60);
    if (mode === 'LONG_BREAK') setTime(customLongBreak * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    const timeMap = {
      POMODORO: customPomodoro * 60,
      SHORT_BREAK: customShortBreak * 60,
      LONG_BREAK: customLongBreak * 60
    };
    setTime(timeMap[newMode]);
  };

  const addTask = () => {
    if (currentTask.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now().toString(), text: currentTask }];
      setTasks(newTasks);
      setCurrentTask('');
    }
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.mode}>{mode.replace('_', ' ')}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
       {/* Start/Pause Button */}
        <Pressable style={styles.button}
        onPress={() => {
        setIsRunning(!isRunning);
        playSoundEffect('Discord');  // 🔔 Play a sound when Start/Pause is pressed
        }}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </Pressable>


         {/* Reset Button */}
        <Pressable style={styles.button}onPress={() => {
           handleReset();
           
        playSoundEffect('Discord');  // 🔔 Play a sound when Start/Pause is pressed
        }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
        
        
        
         {/* Play/Stop Music Button */}
          <Pressable
            style={[
              styles.button,
              { backgroundColor: backgroundPlaying ? '#e74c3c' : '#2ecc71' }
            ]}
            onPress={() => backgroundPlaying ? stopBackgroundMusic() : playBackgroundMusic()}
          >
            <Text style={styles.buttonText}>
              {backgroundPlaying ? 'Stop Music' : 'Play Music'}
            </Text>
          </Pressable>
      </View>

      <View style={styles.modeContainer}>
        {['POMODORO', 'SHORT_BREAK', 'LONG_BREAK'].map((m) => (
          <Pressable key={m} style={styles.modeButton} onPress={() => switchMode(m)}>
            <Text style={styles.buttonText}>{m.replace('_', ' ')}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.customSettingsContainer}>
        <Text style={styles.customSettingsTitle}>Custom Settings (Minutes):</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(customPomodoro)}
            onChangeText={(text) => setCustomPomodoro(Number(text) || 0)}
            placeholder="Pomodoro"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(customShortBreak)}
            onChangeText={(text) => setCustomShortBreak(Number(text) || 0)}
            placeholder="Short Break"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(customLongBreak)}
            onChangeText={(text) => setCustomLongBreak(Number(text) || 0)}
            placeholder="Long Break"
          />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <View style={styles.taskSection}>
        <Text style={styles.customSettingsTitle}>Tasks</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            value={currentTask}
            onChangeText={setCurrentTask}
            placeholder="Enter a new task"
          />
          <Pressable style={styles.addTaskButton} onPress={addTask}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={{ color: darkMode ? '#fff' : '#000' }}>{item.text}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={{ fontSize:10,color: 'Black' }}>All Done!</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Stylesheet definitions for light/dark UI and components
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  darkContainer: { backgroundColor: '#222' },
  lightContainer: { backgroundColor: '#f0f0f0' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  mode: { fontSize: 18, textAlign: 'center', marginBottom: 5 },
  timer: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 },
  button: { backgroundColor: '#2e86de', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  modeButton: { backgroundColor: '#6c5ce7', padding: 10, borderRadius: 5 },
  customSettingsContainer: { marginBottom: 20 },
  customSettingsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputContainer: { gap: 10, alignItems: 'center' },
  input: {
    width: 100,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  switchContainer: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  taskSection: { flex: 1 },
  addTaskButton: { backgroundColor: '#27ae60', padding: 10, borderRadius: 5 },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  deleteButton: {
    backgroundColor: 'White',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
