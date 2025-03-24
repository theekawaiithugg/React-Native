import { ScrollView,Text, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 100, backgroundColor: 'black' }}>
      {/* This will be the safe area view header section at the top */}
      <SafeAreaView style={{ flex: 12, backgroundColor: '#FFC30B' }}>
        <Text style = {{fontSize:40, alignSelf:'center',justifyContent:'center' }}> Grad School Affermations </Text>
      </SafeAreaView>

      {/* This will be the safe area view header section at the middle */}
      <ScrollView style={{ paddingHorizontal: 30,
    paddingBottom: 600, flex: 10, backgroundColor: '#F7E7CE' }}>
      <Text style = {{fontSize:20}}>The Best Way to Start Your Day </Text>
        <Text>You are capable of handling any challenge that comes your way.
        {'\n'}
              Your work matters and you are making progress.
        {'\n'}
              You have the strength to keep going, even when it's hard.
        {'\n'}
              Mistakes are just stepping stones toward success.
        {'\n'}
              Trust the process — growth takes time.
                </Text>

      <Text style = {{fontSize:20}}>Motivation and Persistence </Text>
        <Text>Every bit of effort counts — I am moving closer to success.
        {'\n'}
        My hard work will pay off — I trust the process.
        {'\n'}
        I have the strength to keep going, even when it’s tough.
        {'\n'}
        This effort will lead to knowledge and growth.
        {'\n'}
        I am building a strong foundation for my future.
        {'\n'}
        I’ve come this far — I can keep going.
        {'\n'}
        Success is built one step at a time — I’m making progress.
        {'\n'}
        I have the discipline to stay focused and finish strong.
        {'\n'}
        I am capable of figuring this out.
        {'\n'}
        I am dedicated, and my effort is not wasted.
        {'\n'}
        </Text>

      <Text style = {{fontSize:20}}>Mental Clarity and Focus</Text>
        <Text>I am calm and focused — my mind is clear.
        {'\n'}
        I have the ability to understand complex ideas.
        {'\n'}
        I release all distractions and center my mind.
        {'\n'}
        I trust my mind to retain what I need to know.
        {'\n'}
        I am fully present and engaged with my work.
        {'\n'}
        My mind absorbs knowledge easily and quickly.{'\n'}

        I am sharp and focused — my concentration is strong.
        {'\n'}
        My thoughts are organized and clear.
        {'\n'}
        I can break down complex problems into manageable pieces.
        {'\n'}
        My mind is focused and ready to learn. </Text>

      <Text style = {{fontSize:20}}>Overcoming Fatigue and Stress</Text>
        <Text>I release any stress — I am calm and relaxed.
        {'\n'}
        I am stronger than the tiredness — I can do this.
        {'\n'}
        Fatigue is temporary — my success will last.
        {'\n'}
        I honor my limits and know when to take a break.
        {'\n'}
        I can push through discomfort — I’ve got this.
        {'\n'}
        I am mentally strong and capable.
        {'\n'}
        This moment of struggle will lead to strength.
        {'\n'}
        My mind is resilient and capable of learning.
        {'\n'}
        I am in control of my energy and focus.
        {'\n'}
        I give myself permission to rest when needed. </Text>
      <Text style = {{fontSize:20}}>Self-Belief and Confidence</Text>
        <Text>I am capable of understanding this material.
        {'\n'}
        I have prepared for this — I trust myself.
        {'\n'}
        I am smart and capable.
        {'\n'}
        I have the strength and intelligence to succeed.
        {'\n'}
        I am worthy of success.
        {'\n'}
        I believe in my ability to solve problems.
        {'\n'}
        I trust in my knowledge and preparation.
        {'\n'}
        I am enough — I have all the tools I need.
        {'\n'}
        I am confident in my abilities.
        {'\n'}
        I am capable of achieving greatness.</Text>

      <Text style = {{fontSize:20}}>Growth and Resilience</Text>
        <Text>Mistakes are part of learning — I embrace them.
        {'\n'}
        I am growing stronger with each challenge.
        {'\n'}
        I learn from setbacks and come back stronger.{'\n'}

        This is not failure — it’s part of my growth.
        {'\n'}
        I am becoming better every day.
        {'\n'}
        I trust the process of learning.
        {'\n'}
        Challenges help me grow — I welcome them.
        {'\n'}
        I am capable of handling whatever comes my way.
        {'\n'}
        I am proud of how far I’ve come.
        {'\n'}
        Every step forward counts — I am on the right path.</Text>


      </ScrollView>

      {/* This will be the safe area view header section at the Bottom */}
      <SafeAreaView style={{ flex: 10, backgroundColor: '#D4AF37',justifyContent:'center' }}>     
      <Text style ={{fontSize:10,paddingHorizontal: 110,}}>Alexis say's hello! From UAT, 2025 </Text>
      </SafeAreaView>

    </SafeAreaView>
  );
}
