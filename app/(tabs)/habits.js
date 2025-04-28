import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useLocalSearchParams } from 'expo-router';
import { storage } from '../../firebase';
import { getAuth } from 'firebase/auth';


const initialHabits = {
  'Drink More Water': [
    { text: 'Start your day with a glass of water', done: false },
    { text: 'Carry a reusable water bottle', done: false },
    { text: 'Track your daily water intake', done: false },
  ],
  'Eat More Veggies': [
    { text: 'Add veggies to every meal', done: false },
    { text: 'Try a new vegetable each week', done: false },
    { text: 'Snack on baby carrots or cucumber', done: false },
  ],
  'Exercise Daily': [
    { text: 'Do a 15-minute workout in the morning', done: false },
    { text: 'Take a walk after meals', done: false },
    { text: 'Stretch before bedtime', done: false },
  ],
};

export default function HabitScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [newHabit, setNewHabit] = useState('');
  const [newSteps, setNewSteps] = useState('');

  const toggleStepCompletion = (habitName, stepIndex) => {
    const updatedHabit = habits[habitName].map((step, index) =>
      index === stepIndex ? { ...step, done: !step.done } : step
    );
    setHabits({ ...habits, [habitName]: updatedHabit });
  };

  const addHabit = () => {
    if (newHabit && newSteps) {
      const stepsArray = newSteps
        .split(',')
        .map(step => ({ text: step.trim(), done: false }));
      setHabits({ ...habits, [newHabit]: stepsArray });
      setNewHabit('');
      setNewSteps('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.backButton}>← Back to Home</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Select a Habit</Text>
      {Object.keys(habits).map(habit => (
        <TouchableOpacity
          key={habit}
          onPress={() => setSelectedHabit(habit)}
          style={styles.habitButton}
        >
          <Text style={styles.habitText}>{habit}</Text>
        </TouchableOpacity>
      ))}

      {selectedHabit && (
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Steps for "{selectedHabit}":</Text>
          {habits[selectedHabit].map((step, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleStepCompletion(selectedHabit, index)}
              style={[
                styles.stepItem,
                step.done && styles.completedStepItem,
              ]}
            >
              <Text style={[styles.step, step.done && styles.completedStep]}>
                {step.done ? '✅' : '⬜'} {step.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.inputSection}>
        <Text style={styles.title}>Add Your Own Habit</Text>
        <TextInput
          style={styles.input}
          placeholder="Habit name"
          value={newHabit}
          onChangeText={setNewHabit}
        />
        <TextInput
          style={styles.input}
          placeholder="Steps (comma separated)"
          value={newSteps}
          onChangeText={setNewSteps}
        />
        <Button title="Add Habit" onPress={addHabit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', // clean white background
  },

  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333', // neutral dark gray
  },

  habitButton: {
    backgroundColor: '#f2f2f2', // soft gray for habit buttons
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  habitText: {
    fontSize: 20,
    color: '#333', // neutral text
    fontWeight: '600',
  },

  stepsContainer: {
    marginTop: 30,
    backgroundColor: '#fafafa', // subtle light gray background
    padding: 18,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  stepsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },

  stepItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },

  completedStepItem: {
    backgroundColor: '#e6f4ea', // very soft green for completed
  },

  step: {
    fontSize: 18,
    color: '#555',
  },

  completedStep: {
    textDecorationLine: 'line-through',
    color: '#2e7d32', // dark green for completed
  },

  inputSection: {
    marginTop: 40,
    padding: 18,
    backgroundColor: '#fafafa',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  addButton: {
    backgroundColor: '#ffc0cb', // soft pink just for this button
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});