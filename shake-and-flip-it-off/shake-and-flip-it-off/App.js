import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Speech from 'expo-speech';

// Predefined list of silly jokes
const jokes = [
  "Why did the phone go to therapy? It lost its sense of touch.",
  "I'm not angry, just shaking with enthusiasm!",
  "You flipped me out again!",
  "I need a break... like a Kit-Kat.",
  "Hey! I felt that, calm down Hulk!",
  "Careful! I'm sensitive hardware!",
  "Even therapists don’t get shaken this much.",
];

export default function ShakeAndFlipScreen() {
  const [shakeCount, setShakeCount] = useState(0);
  const [flipCount, setFlipCount] = useState(0);

  // Store previous acceleration for shake detection
  const [prevZ, setPrevZ] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(200); // Adjust based on sensitivity

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const totalForce = Math.sqrt(x * x + y * y + z * z);

      // SHAKE detection (based on strong total movement)
      if (totalForce > 1.75) {
        setShakeCount(prev => {
          speakRandomJoke(); // Tell a joke
          return prev + 1;
        });
      }

      // FLIP detection (based on Z axis flipping up/down)
      if ((prevZ > 0.8 && z < -0.8) || (prevZ < -0.8 && z > 0.8)) {
        setFlipCount(prev => {
          speakRandomJoke(); // Tell a joke
          return prev + 1;
        });
      }

      setPrevZ(z);
    });

    return () => subscription.remove();
  }, [prevZ]);

  // Pick a random joke and speak it
  const speakRandomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    Speech.speak(joke, { rate: 1.0, pitch: 1.0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>😤 Shake & Flip It Off!</Text>
      <Text style={styles.counter}>Shakes: {shakeCount}</Text>
      <Text style={styles.counter}>Flips: {flipCount}</Text>
      <Text style={styles.tip}>Shake or Flip your phone for a silly surprise!</Text>
    </View>
  );
}

// Styles for the UI
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fffaf0',
  },
  title: {
    fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#ff6347',
  },
  counter: {
    fontSize: 22, marginVertical: 10, color: '#555',
  },
  tip: {
    marginTop: 30,
    fontStyle: 'italic',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
