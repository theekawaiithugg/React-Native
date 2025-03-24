import { ScrollView, Text, SafeAreaView, ImageBackground, View, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 100, backgroundColor: 'black' }}>
      
      {/* ================= HEADER SECTION ================= */}
      <SafeAreaView style={{ 
        flex: 15, 
        backgroundColor: '#2C2C54', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Text style={{
          fontSize: 40,
          color: '#E5E5E5',
          fontWeight: '900',
          textAlign: 'center'
        }}>
          Pomodoro Timer App Overview
        </Text>
      </SafeAreaView>

      {/* ================= CONTENT SECTION ================= */}
      <ScrollView style={{ 
        paddingBottom: 530, 
        flex: 10, 
        backgroundColor: '#1C1C1E'
      }}>
        <ImageBackground 
          source={require('./assets/pomo_back_muted.JPG')} 
          style={{ width: '100%', height: '100%' }}
        >

          {/* ---------- Overview Section ---------- */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#FF6B6B',
              marginBottom: 10
            }}>
              Overview
            </Text>
            <Text style={{
              fontSize: 20,
              color: '#E5E5E5',
              lineHeight: 30,
              fontWeight: '600',
              marginBottom: 10
            }}>
              The Pomodoro Timer App is a productivity tool designed to help users manage their time more effectively. 
              The app follows the Pomodoro Technique, which involves breaking work into focused sessions of 25 minutes 
              followed by short 5-minute breaks. This helps to improve focus, reduce mental fatigue, and increase overall productivity.
            </Text>

            {/* Image of mock up app */}
            <Image 
              source={require('./assets/pomodro_mock_up.JPG')} 
              style={{
                width: 100, 
                height: 100,
                resizeMode: 'contain', // Maintain aspect ratio
                alignSelf: 'center',
                marginTop: 10
              }}
            />
          </View>

          {/* ---------- Key Features Section ---------- */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#7ED6DF',
              marginBottom: 10
            }}>
              Key Features
            </Text>
            {[
              '✅ Start, Pause, and Reset Timer',
              '✅ Adjustable Session and Break Times',
              '✅ Custom Notifications',
              '✅ User Progress Tracking',
              '✅ Clean and Intuitive UI',
            ].map((feature, index) => (
              <Text key={index} style={{
                fontSize: 20,
                color: '#E5E5E5',
                fontWeight: '700',
                marginBottom: 5
              }}>
                {feature}
              </Text>
            ))}
          </View>

          {/* ---------- How It Works Section ---------- */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#7ED6DF',
              marginBottom: 10
            }}>
              How It Works
            </Text>
            {[
              '🕒 Start a 25-minute focus session.',
              '🌟 Take a 5-minute break after each session.',
              '🔁 After 4 sessions, take a longer break (15–20 minutes).',
              '📊 Track your productivity over time!'
            ].map((step, index) => (
              <Text key={index} style={{
                fontSize: 20,
                color: '#E5E5E5',
                fontWeight: '700',
                marginBottom: 5
              }}>
                {step}
              </Text>
            ))}
          </View>

          {/* ---------- Why It Works Section ---------- */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#7ED6DF',
              marginBottom: 10
            }}>
              Why It Works
            </Text>
            <Text style={{
              fontSize: 20,
              color: '#E5E5E5',
              fontWeight: '600',
              lineHeight: 30
            }}>
              The Pomodoro Timer helps users avoid burnout by encouraging regular breaks. 
              It improves time management by breaking down tasks into manageable chunks, 
              making it easier to track progress and stay focused.
            </Text>
          </View>

        </ImageBackground>
      </ScrollView>

      {/* ================= FOOTER SECTION ================= */}
      <SafeAreaView style={{ 
        flex: 5, 
        backgroundColor: '#2C2C54', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>     
        <Text style={{
          fontSize: 16, 
          color: '#E5E5E5', 
          paddingHorizontal: 20, 
          fontWeight: '700'
        }}>
          Created by Alexis | UAT 2025
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
}
