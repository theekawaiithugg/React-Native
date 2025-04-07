// Assignment 3.2: Pomodoro Timer with Tasks by Alexis Martinez 2025

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Vibration, TextInput, Pressable, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Default durations
const DEFAULT_POMODORO_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
const DEFAULT_LONG_BREAK_TIME = 15 * 60;

// Sound Files
const SOUND_FILES = {
  Backgroundm: require('./assets/Treasure_Hunt.mp3'),
  Ring: require('./assets/Phone_Ringing.mp3'),
  Discord: require('./assets/discord-notification.mp3')
};

const Stack = createStackNavigator();

// ---------------- Home Screen ----------------
function HomeScreen({ navigation }) {
  const [time, setTime] = useState(DEFAULT_POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('POMODORO');
  const [customPomodoro, setCustomPomodoro] = useState(25);
  const [customShortBreak, setCustomShortBreak] = useState(5);
  const [customLongBreak, setCustomLongBreak] = useState(15);
  const [backgroundSound, setBackgroundSound] = useState(null);
  const [backgroundPlaying, setBackgroundPlaying] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const timerRef = useRef(null);

  // Save to AsyncStorage
  const saveState = useCallback(async () => {
    try {
      await AsyncStorage.setItem('timerState', JSON.stringify({
        time, isRunning, mode, customPomodoro, customShortBreak, customLongBreak
      }));
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [time, isRunning, mode, customPomodoro, customShortBreak, customLongBreak, tasks]);

  // Load from AsyncStorage
  const loadState = async () => {
    try {
      const state = await AsyncStorage.getItem('timerState');
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (state) {
        const parsed = JSON.parse(state);
        setTime(parsed.time);
        setIsRunning(parsed.isRunning);
        setMode(parsed.mode);
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

  useEffect(() => { loadState(); }, []);
  useEffect(() => { saveState(); }, [time, isRunning, mode, customPomodoro, customShortBreak, customLongBreak, tasks]);

  useEffect(() => {
    if (isRunning && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearTimer();
            Vibration.vibrate();
            playSoundEffect('Ring');
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [isRunning]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const playSoundEffect = async (soundName) => {
    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_FILES[soundName]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound effect:', error);
    }
  };

  const playBackgroundMusic = async () => {
    if (backgroundSound) {
      await backgroundSound.playAsync();
      setBackgroundPlaying(true);
    } else {
      const { sound } = await Audio.Sound.createAsync(SOUND_FILES.Backgroundm);
      setBackgroundSound(sound);
      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.3);
      await sound.playAsync();
      setBackgroundPlaying(true);
    }
  };

  const stopBackgroundMusic = async () => {
    if (backgroundSound) {
      await backgroundSound.stopAsync();
      setBackgroundPlaying(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

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
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.mode}>{mode.replace('_', ' ')}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => {
          setIsRunning(!isRunning);
          playSoundEffect('Discord');
        }}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable style={[
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

      {/* Add Task Section */}
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
              <Text>{item.text}</Text>
              <Pressable style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                <Text style={{ fontSize: 10, color: 'black' }}>Done</Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Pressable style={styles.taskPageButton} onPress={() => navigation.navigate('Task List')}>
          <Text style={styles.buttonText}>View All Tasks</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Pressable style={styles.studyPageButton} onPress={() => navigation.navigate('Study Info')}>
         <Text style={styles.buttonText}>Study Info</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ---------------- Task Screen ----------------
function TaskScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Saved Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
//----------------------Studyinforscreenn----------
function StudyInfoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Study Tips & Info</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.infoText}>🧠 Tip 1: Study in 25-minute blocks (Pomodoro Method)!</Text>
        <Text style={styles.infoText}>📚 Tip 2: Take 5-minute breaks to rest your mind.</Text>
        <Text style={styles.infoText}>💧 Tip 3: Drink water and stay hydrated.</Text>
        <Text style={styles.infoText}>📝 Tip 4: Write short notes during breaks.</Text>
        <Text style={styles.infoText}>🎯 Tip 5: Set small, achievable goals each study session.</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}


// ---------------- Main App ----------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pomodoro Timer" component={HomeScreen} />
        <Stack.Screen name="Task List" component={TaskScreen} />
        <Stack.Screen name="Study Info" component={StudyInfoScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#f0f0f0' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  mode: { fontSize: 18, textAlign: 'center', marginBottom: 5 },
  timer: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 },
  button: { backgroundColor: '#2e86de', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  modeButton: { backgroundColor: '#6c5ce7', padding: 10, borderRadius: 5 },
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
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskPageButton: { backgroundColor: '#8e44ad', padding: 10, borderRadius: 5 },
  studyPageButton: {
  backgroundColor: '#f39c12', // nice orange-yellow
  padding: 10,
  borderRadius: 5
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
