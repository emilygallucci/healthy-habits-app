import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const habitDetails = {
    'Drink More Water': [
      'Start your day with a glass of water',
      'Carry a reusable water bottle',
      'Track your daily water intake',
    ],
    'Eat More Veggies': [
      'Add veggies to every meal',
      'Try a new vegetable each week',
      'Snack on baby carrots or cucumber',
    ],
    'Exercise Daily': [
      'Do a 15-minute workout in the morning',
      'Take a walk after meals',
      'Stretch before bed',
    ],
    'Sleep Earlier': [
      'Set a consistent bedtime',
      'Avoid screens 1 hour before sleep',
      'Create a calming nighttime routine',
    ],
  };

export default function HabitScreen() {
  const { title } = useLocalSearchParams();
  const steps = habitDetails[title] || ['No steps found for this habit'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Steps to get started:</Text>
      {steps.map((step, index) => (
        <Text key={index}>✅ {step}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
});