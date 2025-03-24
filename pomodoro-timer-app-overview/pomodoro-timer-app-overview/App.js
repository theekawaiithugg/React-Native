import { ScrollView, Text, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 100, backgroundColor: 'black' }}>
      
      {/* Header Section for assignment 1.2 React Native Output by Alexis Martinez */}
      <SafeAreaView style={{ flex: 8, backgroundColor: '#FFC30B', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
          Pomodoro Timer App Overview
        </Text>
      </SafeAreaView>

      {/* Content Section holding the overview of the project */}
      <ScrollView style={{ paddingHorizontal: 30, paddingBottom: 530, flex: 10, backgroundColor: '#F7E7CE' }}>
        
        {/* Description that gives a better idea of the project.*/}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ff5733', marginBottom: 10 }}>
          Overview
        </Text>
        <Text style={{ fontSize: 18, color: '#555', lineHeight: 28, marginBottom: 20 }}>
          The Pomodoro Timer App is a productivity tool designed to help users manage their time more effectively. 
          The app follows the Pomodoro Technique, which involves breaking work into focused sessions of 25 minutes 
          followed by short 5-minute breaks. This helps to improve focus, reduce mental fatigue, and increase overall productivity.
        </Text>

        {/* Key Features list for reference*/}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 10 }}>
          Key Features
        </Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>✅ Start, Pause, and Reset Timer</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>✅ Adjustable Session and Break Times</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>✅ Custom Notifications</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>✅ User Progress Tracking</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 20 }}>✅ Clean and Intuitive UI</Text>

        {/* How It Works */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 10 }}>
          How It Works
        </Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>🕒 Start a 25-minute focus session.</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>🌟 Take a 5-minute break after each session.</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 5 }}>🔁 After 4 sessions, take a longer break (15–20 minutes).</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 20 }}>📊 Track your productivity over time!</Text>

        {/* Benefits of using the pomodoro timer/method */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 10 }}>
          Why It Works
        </Text>
        <Text style={{ fontSize: 18, color: '#555', lineHeight: 28, marginBottom: 20 }}>
          The Pomodoro Timer helps users avoid burnout by encouraging regular breaks. 
          It improves time management by breaking down tasks into manageable chunks, 
          making it easier to track progress and stay focused.
        </Text>

        {/* Conclusion */}
        <Text style={{ fontSize: 18, color: '#555', fontStyle: 'italic', lineHeight: 28, marginBottom: 20 }}>
          The Pomodoro Timer App helps you work smarter, not harder. 
          By using focused intervals, you can improve your time management and avoid burnout.
        </Text>
      </ScrollView>

      {/* Footer Section */}
      <SafeAreaView style={{ flex: 5, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center' }}>     
        <Text style={{ fontSize: 14, color: '#000', paddingHorizontal: 20 }}>
          Created by Alexis | UAT 2025
        </Text>
      </SafeAreaView>

    </SafeAreaView>
  );
}
